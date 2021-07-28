import { Lightning } from '@lightningjs/sdk';
import THEOplayerPlugin from './THEOplayer';
import PlayerUI from './PlayerUI';

const PLAYER_EVENTS = [
    'loadstart',
    'loadedmetadata',
    'loadeddata',
    'error',
    'play',
    'playing',
    'pause',
    'encrypted',
    'contentprotectionsuccess',
    'contentprotectionerror'
];

export default class Player extends Lightning.Component {
    static _template() {
        return {
            PlayerUI: { type: PlayerUI, visible: true }
        };
    }

    async _setup() {
        // wait until the THEOplayer library is loaded before showing the UI
        this.player = await THEOplayerPlugin.createPlayer();
        this.setupListeners();
        this._setState('ShowUIState');

        // notify parent
        this.fireAncestors('$onPlayerReady', '');
    }

    setupListeners() {
        for (let eventName of PLAYER_EVENTS) {
            this.player.addEventListener(eventName, function(e) {
                console.log(eventName, e);
            });
        }
    }

    set source(src) {
        if (!this.player) {
            return;
        }
        this.player.source = src;
    }

    _getFocused() {
        return this.tag('PlayerUI');
    }

    $onPlayPause() {
        if (!this.player) {
            return;
        }
        if (this.player.paused) {
            this.player.play();
            this._setState('PlayState');
        } else {
            this.player.pause();
            this._setState('ShowUIState');
        }
    }

    static _states() {
        return [
            class ShowUIState extends this {
                $enter() {
                    this.tag('PlayerUI').show();
                }

                $exit() {
                    this.tag('PlayerUI').hide();
                }
            },
            class PlayState extends this {
                $enter() {
                    this.tag('PlayerUI').hide();
                }
            }
        ];
    }
}
