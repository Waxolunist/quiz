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
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
    static get template() {
        return html `
      <style>
        :host {
          --app-primary-color: var(--google-blue-500);
          --app-secondary-color: black;

          display: block;
          position: absolute;
          top: 0; bottom: 0; left: 0; right: 0;
          overflow-x: hidden;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        iron-pages {
          overflow: hidden;
        }

        iron-pages,
        iron-pages > * {
          height: 100%;
        }

        .qrscanner-link {
          margin: auto;
          width: 64px;
          height: 64px;
        }

        .qrscanner-link > iron-icon {
          width: 96px;
          height: 96px;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>
      <app-route route="{{subroute}}" pattern="/:id" data="{{subrouteData}}">
      </app-route>
 

        <!-- Main content -->
        <app-header-layout has-scrolling-region="" fullbleed="">

          <app-header slot="header" fixed="" condenses=""  effects="waterfall">
            <app-toolbar>
              <div main-title="">Geburtstagsrätsel</div>
              <a href="[[rootPath]]" class="qrscanner-link"><iron-icon icon="my-icons:qrscanner"></iron-icon></a>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <scanner-view name="scanner"></scanner-view>
            <my-view2 name="view2"></my-view2>
            <question-view name="question" question-id="[[subrouteData.id]]"></question-view>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
    `;
    }

    static get properties() {
        return {
            page: {
                type: String,
                reflectToAttribute: true,
                observer: '_pageChanged'
            },
            routeData: Object,
            subroute: Object
        };
    }

    static get observers() {
        return [
            '_routePageChanged(routeData.page)'
        ];
    }

    ready() {
        super.ready();
        fetch('./assets/questions.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                response.questions.forEach(q => {
                    localStorage.setItem(q.id, JSON.stringify(q));
                });
            });
        fetch('./assets/questions-html.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                Object.entries(response).forEach(array => {
                    localStorage.setItem('template-' + array[0], array[1]);
                });
            });
    }

    _routePageChanged(page) {
        // Show the corresponding page according to the route.
        //
        // If no page was found in the route data, page will be an empty string.
        // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
        if (!page) {
            this.page = 'scanner';
        } else if (['scanner', 'view2', 'question'].indexOf(page) !== -1) {
            this.page = page;
        } else {
            this.page = 'view404';
        }
    }

    _pageChanged(page) {
        // Import the page component on demand.
        //
        // Note: `polymer build` doesn't like string concatenation in the import
        // statement, so break it up.
        switch (page) {
            case 'scanner':
                import ('./scanner.js');
                break;
            case 'view2':
                import ('./my-view2.js');
                break;
            case 'question':
                import ('./question.js');
                break;
            case 'view404':
                import ('./my-view404.js');
                break;
        }
    }
}

window.customElements.define('my-app', MyApp);