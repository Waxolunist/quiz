/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-button/paper-button.js';

class QuestionView extends PolymerElement {
    static get template() {
        return html `
      <style include="shared-styles">
        :host {
          display: block;

          --paper-button-ink-color: var(--google-green-500);
          --paper-button: {
            background-color: var(--google-green-100);
            flex-grow: 0 !important;
          };

        }
      </style>

      <div class="card">
        <div class="header">
          <div class="circle">[[question.id]]</div>
          <h1>[[question.title]]</h1>
        </div>
        <div class="question" inner-h-t-m-l="[[questionTemplate]]"></div>
        <paper-button raised="">Lösung</paper-button>
      </div>
    `;
    }

    static get properties() {
        return {
            questionId: {
                type: String,
                observer: '_questionChanged',
            },
            question: Object,
            questionTemplate: String
        };
    }

    _questionChanged(q) {
        let qObj = localStorage.getItem(q);
        if (qObj) {
            this.question = JSON.parse(qObj);
            this.questionTemplate = localStorage.getItem('template-' + this.question.template);
        }
    }
}

window.customElements.define('question-view', QuestionView);