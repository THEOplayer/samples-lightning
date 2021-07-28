import { Lightning, Utils } from '@lightningjs/sdk';

export default class PlayerControls extends Lightning.Component {
    static _template() {
        return {
            PlayPauseButton: {
                mountX: 0.5,
                mountY: 0.5,
                x: 0.5 * 1920,
                y: 0.5 * 1080,
                w: 200,
                h: 200,
                // eslint-disable-next-line no-undef
                texture: lng.Tools.getSvgTexture(Utils.asset('images/logo.svg'), 300, 300)
            }
        };
    }

    _handleEnter() {
        this.fireAncestors('$onPlayPause', '');
    }

    show() {
        this.tag('PlayPauseButton').patch({ alpha: 1.0 });
    }

    hide() {
        this.tag('PlayPauseButton').patch({ alpha: 0.0 });
    }
}
