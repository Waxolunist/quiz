define(["./my-app.js","../node_modules/qr-scanner/src/qr-scanner.js"],function(_myApp,_qrScanner){"use strict";_qrScanner=babelHelpers.interopRequireDefault(_qrScanner);class ScannerView extends _myApp.QuestionViewElement{static get template(){return _myApp.html`
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
    `}ready(){super.ready();const videoElem=this.shadowRoot.getElementById("qrscanner");_qrScanner.default.WORKER_PATH=`${this.rootPath}node_modules/qr-scanner/qr-scanner-worker.min.js`;setTimeout(e=>this._playsound("gameshow"),0);setTimeout(e=>{this._qrScanner=new _qrScanner.default(videoElem,result=>this._onScanInput(result));this._qrScanner.start()},100)}detached(){this._qrScanner.destroy();this._qrScanner=null}_onScanInput(result){console.log("decoded qr code:",result);if(result){let split=result.split("-");if(2===split.length&&"q"===split[0]&&Number.isInteger(parseInt(split[1]))){this._playsound("ding",e=>this._changePath("question/"+split[1]))}}}}window.customElements.define("scanner-view",ScannerView)});