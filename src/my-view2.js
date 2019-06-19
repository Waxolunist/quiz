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

class MyView2 extends PolymerElement {
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }

        fieldset {
          color: #555;
          font-family: sans-serif;
          border: none;
          position: relative;
        }

        fieldset > * {
          display: block;
        }

        fieldset::after {
          content: "___  ___  ___  ___  ___  ___";
          display: block;
          position: absolute;
          top: 35px;
          white-space: pre;
        }

        label {
          font-size: 14px;
          margin-bottom: 6px;
        }

        input#password-input {
          position: relative;
          font-size: 16px;
          z-index: 2;
          border: none;
          background: transparent;
          width: 300px;
          text-indent: 9px;
          letter-spacing: 25.6px;
          font-family: Courier;
        }
        
        input#password-input:focus {
          outline: none;
        }

        span.hint {
          margin-top: 8px;
          font-size: 12px;
          font-style: italic;
        }

        span.hint::before {
          content: "* ";
        }

        #qrscanner {

        }
      </style>

      <div class="card">
        <h1>Scan your code</h1>
        <p>Ut labores minimum atomorum pro. Laudem tibique ut has.</p>
        <p>Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Cu mei vide viris gloriatur, at populo eripuit sit.</p>
        <video id="qrscanner"></video>
        <fieldset>
          <label for="password-input">Enter New Pin</label>
          <input type="password" name="password" id="password-input" inputmode="numeric" minlength="6" maxlength="6" size="6" value="">
          <span class="hint">New pin must be 6 digit number only</span>
        </fieldset>
      </div>
    `;
  }

}

window.customElements.define('my-view2', MyView2);
