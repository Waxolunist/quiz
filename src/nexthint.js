import { html, QuestionViewElement } from './my-app.js';

class NextHintView extends QuestionViewElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .hint {
          display: flex;
          flex-direction: column;
        }

        .hint > * {
          flex-grow: 0;
        }

        .hint > img {
          flex-grow: 1;
          object-fit: contain;
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
          <img src="/images/hints/[[question.nexthint]]"/>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {};
  }

}

window.customElements.define('nexthint-view', NextHintView);