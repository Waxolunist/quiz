import { html, QuestionViewElement } from './my-app.js';

class SolutionView extends QuestionViewElement {
  static get template() {
    return html`
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
          font-size: 20pt;
        }

        .input-wrapper label {
          font-size: 20pt;
          margin-bottom: 6px;
        }

        .input-wrapper input#solutioninput {
          position: relative;
          font-size: 33pt;
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
          <a href="[[rootPath]]#/question/[[question.id]]" class="back-link"><iron-icon icon="my-icons:arrow-back"></iron-icon></a>
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
      _styleSheet: Object
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this._prepareDynamicStyleSheet();

    this._configureInputField();
  }

  _onQuestionLoaded(question) {
    this._prepareDynamicStyleSheet();

    this._configureInputField();
  }

  _onViewActivated() {
    this._focusInput();
  }

  _prepareDynamicStyleSheet() {
    if (!this._styleSheet) {
      var styleEl = document.createElement('style');
      this.shadowRoot.appendChild(styleEl);
      this._styleSheet = styleEl.sheet;
    }
  }

  _configureInputField() {
    if (this.question) {
      let length = this.question.answer.length;
      this.$.solutioninput.minLength = 0;
      this.$.solutioninput.maxLength = length;
      this.$.solutioninput.minLength = length;
      this.$.solutioninput.size = length;

      if (Number.isInteger(parseInt(this.question.answer))) {
        this.$.solutioninput.inputMode = "number";
      }

      this._injectStyles(this._createContentRule(length));

      this._focusInput();
    }
  }

  _createContentRule(length) {
    let contentString = Array(length + 1).join('___ ').trim();
    return `.input-wrapper fieldset::after { content: "${contentString}"; }`;
  }

  _injectStyles(rule) {
    if (this._styleSheet) {
      while (this._styleSheet.rules.length > 0) {
        this._styleSheet.removeRule(this._styleSheet.rules[0]);
      }

      this._styleSheet.insertRule(rule, 0);
    }
  }

  _inputchanged() {
    let value = this.$.solutioninput.value;
    this.$.result.classList.remove('ok');
    this.$.result.classList.remove('nok');

    if (this.question && value.length === this.question.answer.length) {
      this._validate(this.question.answer, value);
    }
  }

  _validate(expected, actual) {
    this.$.solutioninput.disabled = true;

    if (expected.toLowerCase() == actual.toLowerCase()) {
      this.$.result.classList.add('ok');

      this._playsound('correct', e => {
        this._resetInput(false);

        this._changePath('nexthint/' + this.questionId);
      });
    } else {
      this.$.result.classList.add('nok');

      this._playsound('incorrect', e => {
        this._resetInput(true);
      });
    }
  }

  _focusInput() {
    setTimeout(e => this.$.solutioninput.focus(), 0);
  }

  _resetInput(focus) {
    this.$.solutioninput.value = '';
    this.$.result.classList.remove('nok');
    this.$.result.classList.remove('ok');
    this.$.solutioninput.disabled = false;

    if (focus) {
      this._focusInput();
    }
  }

}

window.customElements.define('solution-view', SolutionView);