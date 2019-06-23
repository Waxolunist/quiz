/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
    html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import { QuestionViewElement } from './view-element';
import QrScanner from 'qr-scanner';

class ScannerView extends QuestionViewElement {
    static get template() {
        return html `
      <style include="shared-styles">
        :host {
          display: block;
        }

        #qrscanner {
          width: 100%;
        }
      </style>

      <div class="card">
        <h1>Scan your code</h1>
        <video id="qrscanner"></video>
      </div>
    `;
    }

    ready() {
        super.ready();
        const videoElem = this.shadowRoot.getElementById('qrscanner');
        QrScanner.WORKER_PATH = '../node_modules/qr-scanner/qr-scanner-worker.min.js';
        setTimeout(e => this._playsound('gameshow'), 0);
        setTimeout(e => {
            this._qrScanner = new QrScanner(videoElem, result => this._onScanInput(result));
            this._qrScanner.start();
        }, 100);
    }

    detached() {
        this._qrScanner.destroy();
        this._qrScanner = null;
    }

    _onScanInput(result) {
        console.log('decoded qr code:', result)
        if (result) {
            let split = result.split('-');
            if (split.length === 2 && split[0] === 'q' && Number.isInteger(parseInt(split[1]))) {
                this._playsound('ding', e => this._changePath('question/' + split[1]));
            }
        }
    }
}

window.customElements.define('scanner-view', ScannerView);