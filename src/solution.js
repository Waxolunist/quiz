define(["../node_modules/@polymer/polymer/polymer-element.js","./view-element.js","./shared-styles.js","../node_modules/@polymer/iron-icon/iron-icon.js","./my-icons.js"],function(_polymerElement,_viewElement,_sharedStyles,_ironIcon,_myIcons){"use strict";function _templateObject_f335e020972111e99e121559d6999ace(){var data=babelHelpers.taggedTemplateLiteral(["\n      <style include=\"shared-styles\">\n        :host {\n          display: block;\n        }\n\n        .header {\n          display: flex;\n          justify-content: space-between;\n        }\n\n        .back-link > iron-icon {\n          width: 48px;\n          height: 48px;\n        }\n\n        .input-wrapper {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          flex-direction: column;\n        }\n\n        .input-wrapper fieldset {\n          color: #555;\n          font-family: sans-serif;\n          border: none;\n          position: relative;\n        }\n\n        .input-wrapper fieldset > * {\n          display: block;\n        }\n\n        .input-wrapper fieldset::after {\n          display: block;\n          position: absolute;\n          top: 35px;\n          white-space: pre;\n          font-size: 20pt;\n        }\n\n        .input-wrapper label {\n          font-size: 20pt;\n          margin-bottom: 6px;\n        }\n\n        .input-wrapper input#solutioninput {\n          position: relative;\n          font-size: 33pt;\n          z-index: 2;\n          border: none;\n          background: transparent;\n          text-indent: 9px;\n          letter-spacing: 25.6px;\n          font-family: Courier;\n        }\n        \n        .input-wrapper input#solutioninput:focus {\n          outline: none;\n        }\n\n        .input-wrapper span.hint {\n          margin-top: 8px;\n          font-size: 12px;\n          font-style: italic;\n        }\n\n        .input-wrapper span.hint::before {\n          content: \"\";\n        }\n\n        .result {\n          position: absolute;\n          top: 0; bottom: 0; left: 0; right: 0;\n          display: none;\n\n          --iron-icon-width: 50vw;\n          --iron-icon-height: 50vw;\n        }\n\n        .result.ok, .result.nok {\n          display: flex;\n          align-items: center;\n          justify-content: center;\n        }\n\n        .result > .icon-wrapper {\n          background-color: var(--google-grey-500);\n          border-radius: 50%;\n          opacity: 0;\n          will-change: opacity;\n          transition: opacity 1.1s linear;\n        }\n\n        .result.ok > .icon-wrapper, \n        .result.nok > .icon-wrapper {\n          opacity: 1;\n        }\n\n        .result iron-icon {\n          display: none;\n        }\n\n        .result.ok .ok {\n          display: block;\n          --iron-icon-fill-color: var(--google-green-700);\n        }\n\n        .result.nok .nok {\n          display: block;\n          --iron-icon-fill-color: var(--google-red-700);\n        }\n      </style>\n\n      <div class=\"card\">\n        <div class=\"header\">\n          <a href=\"[[rootPath]]#/question/[[question.id]]\" class=\"back-link\"><iron-icon icon=\"my-icons:arrow-back\"></iron-icon></a>\n          <div class=\"circle\">[[question.id]]</div>\n        </div>\n        <div class=\"input-wrapper\">\n          <label for=\"solutioninput\">Und wei\xDFt du die L\xF6sung?</label>\n          <fieldset>\n            <input type=\"text\" name=\"solution\" id=\"solutioninput\" \n              inputmode=\"text\" minlength=\"6\" maxlength=\"6\" size=\"6\" value=\"\"\n              autofocus=\"autofocus\" on-input=\"_inputchanged\">\n            <span class=\"hint\"></span>\n          </fieldset>\n        </div>\n      </div>\n      <div class=\"result\" id=\"result\">\n        <div class=\"icon-wrapper\">\n          <iron-icon class=\"ok\" icon=\"my-icons:done\"></iron-icon>\n          <iron-icon class=\"nok\" icon=\"my-icons:close\"></iron-icon>\n        </div>\n      </div>\n    "]);_templateObject_f335e020972111e99e121559d6999ace=function _templateObject_f335e020972111e99e121559d6999ace(){return data};return data}var SolutionView=/*#__PURE__*/function(_QuestionViewElement){babelHelpers.inherits(SolutionView,_QuestionViewElement);function SolutionView(){babelHelpers.classCallCheck(this,SolutionView);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(SolutionView).apply(this,arguments))}babelHelpers.createClass(SolutionView,[{key:"connectedCallback",value:function connectedCallback(){babelHelpers.get(babelHelpers.getPrototypeOf(SolutionView.prototype),"connectedCallback",this).call(this);this._prepareDynamicStyleSheet();this._configureInputField()}},{key:"_onQuestionLoaded",value:function _onQuestionLoaded(question){this._prepareDynamicStyleSheet();this._configureInputField()}},{key:"_onViewActivated",value:function _onViewActivated(){this._focusInput()}},{key:"_prepareDynamicStyleSheet",value:function _prepareDynamicStyleSheet(){if(!this._styleSheet){var styleEl=document.createElement("style");this.shadowRoot.appendChild(styleEl);this._styleSheet=styleEl.sheet}}},{key:"_configureInputField",value:function _configureInputField(){if(this.question){var length=this.question.answer.length;this.$.solutioninput.minLength=0;this.$.solutioninput.maxLength=length;this.$.solutioninput.minLength=length;this.$.solutioninput.size=length;if(Number.isInteger(parseInt(this.question.answer))){this.$.solutioninput.inputMode="number"}this._injectStyles(this._createContentRule(length));this._focusInput()}}},{key:"_createContentRule",value:function _createContentRule(length){var contentString=Array(length+1).join("___ ").trim();return".input-wrapper fieldset::after { content: \"".concat(contentString,"\"; }")}},{key:"_injectStyles",value:function _injectStyles(rule){if(this._styleSheet){while(0<this._styleSheet.rules.length){this._styleSheet.removeRule(this._styleSheet.rules[0])}this._styleSheet.insertRule(rule,0)}}},{key:"_inputchanged",value:function _inputchanged(){var value=this.$.solutioninput.value;this.$.result.classList.remove("ok");this.$.result.classList.remove("nok");if(this.question&&value.length===this.question.answer.length){this._validate(this.question.answer,value)}}},{key:"_validate",value:function _validate(expected,actual){var _this=this;this.$.solutioninput.disabled=!0;if(expected.toLowerCase()==actual.toLowerCase()){this.$.result.classList.add("ok");this._playsound("correct",function(e){_this._resetInput(!1);_this._changePath("nexthint/"+_this.questionId)})}else{this.$.result.classList.add("nok");this._playsound("incorrect",function(e){_this._resetInput(!0)})}}},{key:"_focusInput",value:function _focusInput(){var _this2=this;setTimeout(function(e){return _this2.$.solutioninput.focus()},0)}},{key:"_resetInput",value:function _resetInput(focus){this.$.solutioninput.value="";this.$.result.classList.remove("nok");this.$.result.classList.remove("ok");this.$.solutioninput.disabled=!1;if(focus){this._focusInput()}}}],[{key:"template",get:function get(){return(0,_polymerElement.html)(_templateObject_f335e020972111e99e121559d6999ace())}},{key:"properties",get:function get(){return{_styleSheet:Object}}}]);return SolutionView}(_viewElement.QuestionViewElement);window.customElements.define("solution-view",SolutionView)});