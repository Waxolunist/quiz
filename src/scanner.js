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
        this._qrScanner = new QrScanner(videoElem, result => console.log('decoded qr code:', result));
        this._qrScanner.start();

        this._playsound('correct');
    }

    detached() {
        this._qrScanner.destroy();
        this._qrScanner = null;
    }
}

window.customElements.define('scanner-view', ScannerView);