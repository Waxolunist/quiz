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