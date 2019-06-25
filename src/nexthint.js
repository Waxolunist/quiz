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

class NextHintView extends QuestionViewElement {
    static get template() {
        return html `
      <style include="shared-styles">
        :host {
          display: block;
        }

        .hint {
          display: flex;
          flex-direction: column;
          overflow-y: hidden;
        }

        .hint > * {
          flex-grow: 0;
        }

        .hint > .hint-image-wrapper {
          flex-grow: 1;
        }

        .hint .hint-image {
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }

      </style>

      <div class="card">
        <div class="header">
          <div class="circle">[[question.id]]</div>
          <h1>Dein nächster Hinweis</h1>
        </div>
        <div class="hint">
          <p>Gratulation, du hast die Frage richtig beantwortet.</p>
          <p>Hier ist dein nächster Hinweis.</p>
          
          <div class="hint-image-wrapper">
            <div class="hint-image" style="background-image: url('[[rootPath]]images/hints/[[question.nexthint]]')"></div>
          </div> 
        </div>
      </div>
    `;
    }

    static get properties() {
        return {};
    }
}

window.customElements.define('nexthint-view', NextHintView);