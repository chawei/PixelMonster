var styleElement;
var canvasElement;
var pixelMonster;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "injectCss") {
		injectCss(request.css);
  } else if (request.action == "removeCss") {
		removeCss();
  } else if (request.action == "drawCanvas") {
    // drawCanvas();
	} else if (request.action == "initWG") {
		initWG();
	} else if (request.action == "createCanvas") {
  	createCanvas();
  }
});

window.addEventListener("resize", function() {
	if(canvasElement!=null) {
		canvasElement.height = Math.floor(window.innerHeight);
		canvasElement.width = Math.floor(window.innerWidth);  // assign width will clear the context
	}
  //	drawCanvas();
}, false);


function injectCss(cssToInject) {
  styleElement = document.createElement("style");
  styleElement.innerText = cssToInject;
  document.documentElement.insertBefore(styleElement, null);
  
}

function removeCss(){
  styleElement.parentNode.removeChild(styleElement);
  history.go(0);
}

function initWG() {
  pixelMonster = new PixelMonster();
  pixelMonster.init();
}

