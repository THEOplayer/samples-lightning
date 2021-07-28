import { Lightning, Utils } from '@lightningjs/sdk';
import Player from './Player';

export default class App extends Lightning.Component {
    static getFonts() {
        return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }];
    }

    static _template() {
        return {
            Player: {
                type: Player
            }
        };
    }

    $onPlayerReady() {
        this.tag('Player').source = {
            sources: [
                {
                    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                }
            ],
            metaData: null
        };
    }

    _getFocused() {
        return this.tag('Player');
    }
}
