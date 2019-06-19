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
import '@polymer/iron-icon/iron-icon.js';
import './my-icons.js';

class SolutionView extends PolymerElement {
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
          display: block;
        }

        .header {
          display: flex;
          justify-content: space-between;
        }

        .back-link > iron-icon {
          width: 48px;
          height: 48px;
        }

        .input-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .input-wrapper fieldset {
          color: #555;
          font-family: sans-serif;
          border: none;
          position: relative;
        }

        .input-wrapper fieldset > * {
          display: block;
        }

        .input-wrapper fieldset::after {
          display: block;
          position: absolute;
          top: 35px;
          white-space: pre;
          font-size: 26pt;
        }

        .input-wrapper label {
          font-size: 20pt;
          margin-bottom: 6px;
        }

        .input-wrapper input#solutioninput {
          position: relative;
          font-size: 50pt;
          z-index: 2;
          border: none;
          background: transparent;
          text-indent: 9px;
          letter-spacing: 25.6px;
          font-family: Courier;
        }
        
        .input-wrapper input#solutioninput:focus {
          outline: none;
        }

        .input-wrapper span.hint {
          margin-top: 8px;
          font-size: 12px;
          font-style: italic;
        }

        .input-wrapper span.hint::before {
          content: "";
        }

        .result {
          position: absolute;
          top: 0; bottom: 0; left: 0; right: 0;
          display: none;

          --iron-icon-width: 50vw;
          --iron-icon-height: 50vw;
        }

        .result.ok, .result.nok {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .result > .icon-wrapper {
          background-color: var(--google-grey-500);
          border-radius: 50%;
          opacity: 0;
          will-change: opacity;
          transition: opacity 1.1s linear;
        }

        .result.ok > .icon-wrapper, 
        .result.nok > .icon-wrapper {
          opacity: 1;
        }

        .result iron-icon {
          display: none;
        }

        .result.ok .ok {
          display: block;
          --iron-icon-fill-color: var(--google-green-700);
        }

        .result.nok .nok {
          display: block;
          --iron-icon-fill-color: var(--google-red-700);
        }
      </style>

      <div class="card">
        <div class="header">
          <a href="/question/[[question.id]]" class="back-link"><iron-icon icon="my-icons:arrow-back"></iron-icon></a>
          <div class="circle">[[question.id]]</div>
        </div>
        <div class="input-wrapper">
          <label for="solutioninput">Und weißt du die Lösung?</label>
          <fieldset>
            <input type="text" name="solution" id="solutioninput" 
              inputmode="text" minlength="6" maxlength="6" size="6" value=""
              autofocus="autofocus" on-input="_inputchanged">
            <span class="hint"></span>
          </fieldset>
        </div>
      </div>
      <div class="result" id="result">
        <div class="icon-wrapper">
          <iron-icon class="ok" icon="my-icons:done"></iron-icon>
          <iron-icon class="nok" icon="my-icons:close"></iron-icon>
        </div>
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
        _styleSheet: Object
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._prepareDynamicStyleSheet();
    this._configureInputField();
  }

  _prepareDynamicStyleSheet() {
    if(!this._styleSheet) {
      var styleEl = document.createElement('style');
      this.shadowRoot.appendChild(styleEl);
      this._styleSheet = styleEl.sheet;
    }
  }

  _questionChanged(q) {
    let qObj = localStorage.getItem(q);
    if (qObj) {
        this.question = JSON.parse(qObj);
        this._configureInputField();
    }
    return q;
  }

  _configureInputField() {
    if(this.question) {
      let length = this.question.answer.length;
      this.$.solutioninput.minLength = length;
      this.$.solutioninput.maxLength = length;
      this.$.solutioninput.size = length;

      if(Number.isInteger(parseInt(this.question.answer))) {
        this.$.solutioninput.inputMode = "number";
      }

      this._injectStyles(this._createContentRule(length));
    }
  }

  _createContentRule(length) {
    let contentString = Array(length+1).join('___ ').trim();
    return `.input-wrapper fieldset::after { content: "${contentString}"; }`;
  }

  _injectStyles(rule) {
    if(this._styleSheet) {
      this._styleSheet.insertRule(rule, 0);
    }
  }

  _inputchanged() {
    let value = this.$.solutioninput.value;
    this.$.result.classList.remove('ok');
    this.$.result.classList.remove('nok');
    if(this.question && value.length === this.question.answer.length) {
      this._validate(this.question.answer, value);
    }
  }

  _validate(expected, actual) {
    if(expected == actual) {
      this.$.result.classList.add('ok');
      var audio = new Audio('ok.mp3');
      audio.play();
    } else {
      this.$.result.classList.add('nok');
    }
  }

  _playsound(name) {
    var audio = new Audio('/assets/' + name + '.mp3');
    audio.play();
  }
}

window.customElements.define('solution-view', SolutionView);
