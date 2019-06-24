/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class QuestionViewElement extends PolymerElement {

    static get properties() {
        return {
            questionId: {
                type: String,
                observer: '_questionChanged'
            },
            question: Object,
            active: {
                type: Boolean,
                observer: '_viewActivated'
            }
        };
    }

    _questionChanged(q) {
        let qObj = localStorage.getItem(q);
        if (qObj) {
            this.question = JSON.parse(qObj);
            if (this._onQuestionLoaded) {
                this._onQuestionLoaded(this.question);
            }
        }
        return q;
    }

    _playsound(name, cb) {
        var sound = new Howl({
            src: [`${this.rootPath}assets/sounds/${name}.mp3`]
        });
        if (cb) {
            sound.on('end', event => setTimeout(e => cb(event), 100));
        }
        sound.play();
    }

    _changePath(newpath) {
        this.dispatchEvent(new CustomEvent('viewchange', {
            detail: {
                path: newpath
            },
            bubbles: true,
            composed: true
        }));
    }

    _viewActivated(active) {
        if (this._onViewActivated) {
            this._onViewActivated();
        }
    }
}

export { QuestionViewElement };