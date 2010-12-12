// function WGMonster(img) {
// 	var parent = img.parentNode; 
// 	var x = 0;
// 	var y = 0;
// 	var width;
// 	var height;
// 	
// 	function init() {
//     var canvasElement = document.createElement('canvas');	
//   	canvasElement.height= Math.floor(height)+160;
//   	canvasElement.width= Math.floor(width)+600;
//   	canvasElement.style.position = "absolute";
//   	canvasElement.style.left = "-300px";
//   	canvasElement.style.top = "-80px";
//   	canvasElement.style.zIndex = -3;
//   	htmlTxtfield.appendChild(canvasElement);
//   	var processingInstance = new Processing(canvasElement, sketchProc);
//   }
//   
//   function sketchProc(processing) {
//     processing.setup = function() {
// 			processing.smooth();
//   		processing.frameRate(20);
//   		this.drawFreehandRect( x, y, width, height, false);
//     }
//     processing.draw = function() {
// 	
// 		}
// 	}
// }


Processing.prototype.getImgAvgColor = function() {
	var cellSize = 10;
	var cols = this.width / cellSize;
	var rows = this.height / cellSize;
	var numPix = rows * cols;
	var avgRed = 0;
	var avgGreen = 0;
	var avgBlue = 0;
	this.loadPixels();
  for(var q = 0; q < cols ; q++) {
    for(var j = 0; j < rows ; j++) {
	    var x = q*cellSize;
	    var y = j*cellSize;
	    var loc = x + y*this.width;
	    r = this.red(this.pixels[loc]);
	    g = this.green(this.pixels[loc]);
	    b = this.blue(this.pixels[loc]);
	    avgRed += r;
	    avgGreen += g;
	    avgBlue += b;
  	}
	}
	console.log(avgRed,avgGreen,avgBlue);
	avgRed = avgRed/numPix;
	avgGreen = avgGreen/numPix;
	avgBlue = avgBlue/numPix;
	
// 	color average = color(avgRed,avgGreen,avgBlue,100);
}


function WGImage(divParent) {
	var parent = divParent; 
	var x = 0;
	var y = 0;
	var mx = 0;
	var my = 0;
	var dSize = 20;
	var width = parent.width();
	var height = parent.height();
	var canvasElement;
	var context, contextAnimation;
	var drop;
	var monster;
	var isMouseOpening;
	var drops;
	var frameRate;
	init();
	
	function init() {
		var mSize = Math.round( width/3 + Math.random()*width/3 );
		var mx = Math.random()>0.5 ? Math.random()*30+10: Math.random()*-30-10;
	  var my = Math.random()>0.5 ? Math.random()*30+10: Math.random()*-30-10;
	
		frameRate = Math.round(Math.random()*20)+18;
		
		isMouseOpen = false;
    canvasElement = document.createElement('canvas');
		canvasElement.width=width; 
  	canvasElement.height=height;
  	canvasElement.style.position = "absolute";
  	canvasElement.style.left = 0;
  	canvasElement.style.top = 0;
  	canvasElement.style.zIndex = 1;
  	parent[0].appendChild(canvasElement);
		context = canvasElement.getContext('2d');
		parent.find('img').each(function(){
			context.drawImage(this, $(this).position().left, $(this).position().top);
		});
		// var pixels = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
		
		var processingInstance = new Processing(canvasElement, sketchProc);
		
		canvasAnimation = document.createElement('canvas');
		canvasAnimation.width=width; 
  	canvasAnimation.height=height;
  	canvasAnimation.style.position = "absolute";
  	canvasAnimation.style.left = 0;
  	canvasAnimation.style.top = 0;
  	canvasAnimation.style.zIndex = 2;
  	parent[0].appendChild(canvasAnimation);
		contextAnimation = canvasAnimation.getContext('2d');
		var processingInstanceAnimation = new Processing(canvasAnimation, sketchProcAnimation);
		
		monster = new WGMonster1(mx,my,mSize,mSize);
	}

 	function sketchProc(processing) {
    processing.setup = function() {
			processing.smooth();
  		processing.frameRate(frameRate);

    }
    processing.draw = function() {
			processing.fill(255,120);
			processing.noStroke();
			monster.drawEating(processing);
		}
	}
	
	function sketchProcAnimation(processing) {
    processing.setup = function() {
			processing.smooth();
  		processing.frameRate(frameRate);
    }
    processing.draw = function() {
			processing.clear();
			processing.fill(255);
			processing.strokeWeight(0.5);
			
			monster.drawMonter(processing);

			isMouseOpen = !isMouseOpen;
		}
		
	}
	
}



function WGTextfield(txtField,flag){
  var x = 300;
  var y = 80;
  var width = txtField.offsetWidth;
  var height = txtField.offsetHeight;
  var htmlTxtfield = txtField;
  var scaleInt;
	var isActive = flag;
  init();
  
  function init() {
    var canvasElement = document.createElement('canvas');	
  	canvasElement.height= Math.floor(height)+160;
  	canvasElement.width= Math.floor(width)+600;
  	canvasElement.style.position = "absolute";
  	canvasElement.style.left = "-300px";
  	canvasElement.style.top = "-80px";
  	canvasElement.style.zIndex = -3;
  	htmlTxtfield.appendChild(canvasElement);
  	var processingInstance = new Processing(canvasElement, sketchProc);
  }
  
  function sketchProc(processing) {
    processing.setup = function() {
			processing.smooth();
  		processing.frameRate(20);
			this.stroke(33);
			this.noFill();
  		this.drawFreehandRect( x, y, width, height, false);
			if(isActive) {
	      scaleInt = new Integrator();
			}
			else
				processing.noLoop();
    }
    processing.draw = function() {
      if(scaleInt!=null){
  	    if(scaleInt.stage==3){
  	      processing.clear();
					this.stroke(33);
					this.noFill();
  				processing.drawFreehandRect(x, y, width, height,false);
  	      scaleInt = null;
  				$('body center').removeClass('invisible').hide().fadeIn();
  	    }
  	    else{
  	      processing.clear();
  	      scaleInt.update();
  	      processing.drawFreehandEllipse( processing.width/2, processing.height/2, processing.map(scaleInt.value, 0, 1, 1, 1.5)*width, processing.map(scaleInt.value, 0, 1, 1, 3.5)*height, 0, 2*Math.PI);
  	    }
  	  }
    };
  }
}

function WGCrack(element, cx, cy){
	var parent = element;
	var x = cx;
	var y = cy;
	var width = 100;
	var height = 100;
	
	init();
	function init() {
    var canvasElement = document.createElement('canvas');	
  	canvasElement.height = height;
  	canvasElement.width = width;
  	canvasElement.style.position = "absolute";
  	canvasElement.style.left = x-width/2+"px";
  	canvasElement.style.top = y-height/2+"px";
//  	canvasElement.style.zIndex = -1;
  	parent.appendChild(canvasElement);  
  	var processingInstance = new Processing(canvasElement, sketchProc);
  }
  
  function sketchProc(processing) {
		
    processing.setup = function() {
      processing.smooth();
  		processing.frameRate(10);
			processing.noFill();
			processing.stroke(0);
			
			var circles = Math.round(Math.random()*7+5);
			var r = 20;
			var delta = 2;
			for(var i=1; i<=circles; i++) {
				var arcs = Math.round(Math.random()*4+4);
				var arr = chunks(arcs);
				var start = 0;
				// arcs
				for(var j=0; j<arcs; j++) {
					var end = start + arr[j];
					var radius = r*processing.random(0.6,1.2) + delta*i*(1+Math.random()/3);
					var dx = Math.random()>0.5 ? i*Math.random()/2: -1*i*Math.random()/2;
					var dy = Math.random()>0.5 ? i*Math.random()/2: -1*i*Math.random()/2;
					processing.strokeWeight( processing.random(0.3,0.5) );
					processing.drawFreehandArc(width/2+dx, height/2+dy, radius, radius, start*2*Math.PI, end*2*Math.PI);
					
					if(Math.random()>0.5) {
						var lx1 = width/2+dx+radius*processing.cos(start*2*Math.PI)/2;
						var ly1 = height/2+dy+radius*processing.sin(start*2*Math.PI)/2;
						var lx2 = width/2+dx+radius*processing.cos(start*2*Math.PI)*(1+processing.random(-0.5,0.5));
						var ly2 = height/2+dy+radius*processing.sin(start*2*Math.PI)*(1+processing.random(-0.5,0.5));
						processing.strokeWeight( processing.random(0.1,0.2) );
						processing.drawFreehandLine(lx1, ly1, lx2, ly2);
					}
					
					start += arr[j];
				}

			}
			
			processing.noLoop();
    }
    processing.draw = function() {
	
		}
	}
	
}

function WGButton(btn,left,top,mode){
  var x = 10;
  var y = 10;
  var width = btn.width();
  var height = btn.height();
  var targetX = 0;
  var targetY = 0;
  var isMoving = false;
	var htmlBtn = btn;
  var moveBtn;
	var nativeMovingBtn;
  var counter = 0;
  var reverseCount = 0;
	var isActive = mode;
	
  init();
  
  this.getMovingStatus = function() {
    return isMoving;
  }
  this.getBtnX = function() {
		return moveBtn.position().left;
  }
  this.getBtnY = function() {
		return moveBtn.position().top;
  }
  this.getTargetX = function() {
    if(targetX!=0)
      return targetX/Math.abs(targetX);
    else
      return 0;
  }
  this.getTargetY = function() {
    if(targetY!=0)
      return targetY/Math.abs(targetY);
    else
      return 0;
  }

  this.reverseMoving = function(newTargetX,newTargetY) {
    if(reverseCount<=0){
      targetX = newTargetX;
      targetX = newTargetY;
      isMoving = true;
      reverseCount = 20;
    }
  }

  function init() {
		htmlBtn.wrap('<span class="wg_btn_inner" />');
		htmlBtn.css('position', 'absolute').css('z-index', 5);
		var innerBtn = htmlBtn.parent('.wg_btn_inner');
		innerBtn.css('position', 'relative');
		innerBtn.wrap('<span class="wg_btn_outer" />');
		var outerBtn = innerBtn.parent('.wg_btn_outer');
		outerBtn.css('position', 'absolute').css('left', left+'px').css('top', top+'px');
		moveBtn = outerBtn;
//		htmlBtn.mouseenter(handlerIn).mouseleave(handlerOut);
		
    var canvasElement = document.createElement('canvas');	
  	canvasElement.height= Math.floor(height)*1.3+20;
  	canvasElement.width= Math.floor(width)*1.3+20;
  	canvasElement.style.position = "absolute";
  	canvasElement.style.left = "-13px";
  	canvasElement.style.top = "-13px";
  	canvasElement.style.zIndex = 1;
  	innerBtn.append(canvasElement);
		nativeMovingBtn = moveBtn[0];
  	var processingInstance = new Processing(canvasElement, sketchProc);
  }
  
	// function handlerIn(e){
	// 	//console.log( e );
	// 	flagMouseMoved = true;
	// }
	// function handlerOut(e){
	// 	flagMouseMoved = false;
	// }
	

  function sketchProc(processing) {
    processing.setup = function() {
      processing.smooth();
  		processing.frameRate(10);
			processing.stroke(33);
		  processing.fill(255, 255, 240);
  		processing.drawFreehandRect( x, y, width*1.3, height*1.3, true);
  		counter = 0;
			if(isActive==false)
				processing.noLoop();
    }
    processing.draw = function() {
      if(isMoving){
        updatePosition();
        processing.clear();
			  processing.stroke(33);
			  processing.fill(255, 255, 240);
        processing.drawFreehandRect( x, y, width*1.3, height*1.3, true);
      }
      else if(Math.random()>0.98) {
        setTargetPosition();
      }
    
    }
		
    function setTargetPosition() {
      var gap = 30;
      targetX = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      targetY = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      
			// TODO: WRITE A VALID BOUNDRY CHECK
      // while( processing.abs(findPosX(nativeMovingBtn)+targetX-window.innerWidth/2)>200 ){
      //   targetX = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      // }
      // while( (findPosY(nativeMovingBtn)+targetY)<200 ||  (findPosY(nativeMovingBtn)+targetY)>600){
      //   targetY = Math.random()>0.5 ? Math.round( Math.random()*gap+3 ) : -1*Math.round( Math.random()*gap+3 );
      // }

      isMoving = true;
    }
    function updatePosition() {
      if( targetX!=0 ) {
        var newX = targetX>0 ? parseFloat(nativeMovingBtn.style.left)+1 : parseFloat(nativeMovingBtn.style.left)-1;
        nativeMovingBtn.style.left = newX+"px";
        targetX = targetX>0 ? (targetX-1) : (targetX+1);
      }
      if( targetY!=0 ) {
        var newY = targetY>0 ? parseFloat(nativeMovingBtn.style.top)+1 : parseFloat(nativeMovingBtn.style.top)-1;
        nativeMovingBtn.style.top = newY+"px";
        targetY = targetY>0 ? targetY-1 : targetY+1;
      }
      if( targetX==0 && targetY==0)
        isMoving = false;
    }
  }
}

function WGMonster1(xx,yy,width,height) {
	this.x = xx;
	this.y = yy;
	var w = width;
	var h = height;
	var mouseSize = 0; // 0 1 2 3 
	var isMouseOpening = true;
	var mx = 0; // 1 0 -1
  var my = 1; // 1 0 -1
	var steps = 0;
	var mColor;
	
	this.setMoving = function(processing){
		if(mx==0){
			my = 0;
			mx = (this.x+w/2)<processing.width/2 ? 1: -1;
			steps = (mx==1) ? Math.round( processing.random(0,processing.width-this.x-w+w/2) ) : Math.round( processing.random(0,this.x+w/2) );
		}
		else{
			mx = 0;
			my = (this.y+h/2)<processing.height/2 ? 1: -1;
			steps = (my==1) ? Math.round( processing.random(0,processing.height-this.y-h+h/2) ): Math.round( processing.random(0,this.y+h/2) );
		}
	}
	
	this.drawEating = function(processing){
		processing.pushMatrix();
		processing.translate(this.x,this.y);
		if(mx==0) {
			if(my==1) {
				processing.translate(w/2,h/2);
				processing.rotate(processing.PI/2);
				processing.translate(-w/2,-h/2);
			}
			else{
				processing.translate(w/2,h/2);
				processing.rotate(-processing.PI/2);
				processing.translate(-w/2,-h/2);
			}
		}
		processing.saveContext();
		processing.globalCompositeOperation("destination-out");

		var pSize = w/6;
		var baseX = width/2+processing.random(-pSize,pSize);
		var baseY = height/2+processing.random(-pSize,pSize);
		
		processing.fill(255,100,19);
		processing.stroke(0);
		processing.beginShape();
		if(mx<0) {
			processing.vertex( baseX+processing.random(-pSize,0),baseY+processing.random(-pSize,0));
 			processing.vertex( baseX,baseY);
			processing.vertex( baseX+processing.random(-pSize,0),baseY+processing.random(-pSize,0));
			processing.vertex( baseX+processing.random(-pSize,0),baseY+processing.random(-pSize,0));
		}
		else {
			processing.vertex( baseX+processing.random(0,pSize),baseY+processing.random(0,pSize));
 			processing.vertex( baseX,baseY);
			processing.vertex( baseX+processing.random(0,pSize),baseY+processing.random(0,pSize));
			processing.vertex( baseX+processing.random(0,pSize),baseY+processing.random(0,pSize));
		}
		processing.endShape(processing.CLOSE);
		processing.restoreContext();
		
		processing.popMatrix();
	}

	this.drawMonter = function(processing){
		if(mColor==null) {
			var c1 = processing.random(200,255);
			var c2 = processing.random(0,100);
			var c3 = processing.random(0,100);
			if(Math.random()<0.33)
				mColor = processing.color( c1,c2,c3 );
			else if(Math.random()<0.66)
				mColor = processing.color( c2,c1,c3 );
			else
				mColor = processing.color( c3,c2,c1 );
		}
		
		processing.pushMatrix();
		processing.translate(this.x,this.y);
		if(mx==0) {
			if(my==1) {
				processing.translate(w/2,h/2);
				processing.rotate(processing.PI/2);
				processing.translate(-w/2,-h/2);
			}
			else{
				processing.translate(w/2,h/2);
				processing.rotate(-processing.PI/2);
				processing.translate(-w/2,-h/2);
			}
		}
		processing.saveContext();

		processing.fill( mColor );
		processing.noStroke();
		processing.ellipse(width/2,height/2,w/2,w/2);
		
		// draw flakes
		for(var i=0; i<Math.round(w/2); i++) {
			processing.fill(processing.random(150,255),processing.random(150,255),processing.random(150,255));
			processing.beginShape(processing.TRIANGLES);
			if(mx<0) {
				var xx =  width/2 - w/4 + processing.random(i)*2;
				var yy = height/2 - processing.random(-i,i)/1.5;
				var fs = 5;
				processing.vertex(xx,yy);
		 		processing.vertex( xx+processing.random(-fs,fs), yy+processing.random(-fs,fs) );
				processing.vertex( xx+processing.random(-fs,fs), yy+processing.random(-fs,fs) );
		 	}
			else {
				var xx =  width/2 + w/4 - processing.random(i)*2;
				var yy = height/2 - processing.random(-i,i)/1.5;
				var fs = 5;
				processing.vertex(xx,yy);
		 		processing.vertex( xx+processing.random(-fs,fs), yy+processing.random(-fs,fs) );
				processing.vertex( xx+processing.random(-fs,fs), yy+processing.random(-fs,fs) );
			}
			processing.endShape();
		}
		
		processing.globalCompositeOperation("destination-out");

		processing.fill(255,100,19);
		processing.stroke(0);
		processing.beginShape(processing.TRIANGLES);
		if(mx<0) {
			processing.vertex(0,height/2-mouseSize*8);
	 		processing.vertex(width/2,height/2);
	 		processing.vertex(0,height/2+mouseSize*8);
		}
		else {
			processing.vertex(height,height/2-mouseSize*8);
	 		processing.vertex(width/2,height/2);
	 		processing.vertex(height,height/2+mouseSize*8);
		}
		processing.endShape();

		processing.restoreContext();
		
		processing.popMatrix();

		mouseSize += isMouseOpening? 1: -1;
		if(mouseSize>=4)
			isMouseOpening=false;
		else if(mouseSize<=0)
			isMouseOpening=true;
					
		if(steps>0){
			this.x += mx;
			this.y += my;
			steps--;
		}
		else
			this.setMoving(processing);
	}
	
}

function WGMonster(xx,yy,width,height) {
	this.x = xx;
	this.y = yy;
	var w = width;
	var h = height;
	var l = width/2; // line distant
	var p1,p2,p3,p4,p5,p6,p7,p8;
	var mouseSize = 0; // 0 1 2 3 
	var isMouseOpening = true;
	var mx = 0; // 1 0 -1
  var my = 1; // 1 0 -1
	var steps = 0;
		
	console.log('init monster');
	
	this.setMoving = function(processing){
		if(mx==0){
			my = 0;
			mx = (this.x+w/2)<processing.width/2 ? 1: -1;
			steps = (mx==1) ? Math.round( processing.random(0,processing.width-this.x-w+w/2) ) : Math.round( processing.random(0,this.x+w/2) );
		}
		else{
			mx = 0;
			my = (this.y+h/2)<processing.height/2 ? 1: -1;
			steps = (my==1) ? Math.round( processing.random(0,processing.height-this.y-h+h/2) ): Math.round( processing.random(0,this.y+h/2) );
		}
	}
	
	this.drawEating = function(processing){
		processing.pushMatrix();
		processing.translate(this.x,this.y);
		if(mx==0) {
			if(my==1) {
				processing.translate(w/2,h/2);
				processing.rotate(processing.PI/2);
				processing.translate(-w/2,-h/2);
			}
			else{
				processing.translate(w/2,h/2);
				processing.rotate(-processing.PI/2);
				processing.translate(-w/2,-h/2);
			}
		}
		
		if(mouseSize==3){
			var mh = mouseSize*w/7;
			if(mx==-1) { // left mouse				
				var xx = p4.x;
				var yy = p4.y - mh;
				processing.drawFreehandRect(xx-4,yy,mh+4,mh,false);
			}
			else{ // right mouse
				var xx = p7.x - mh;
				var yy = p7.y - mh;			
				processing.drawFreehandRect(xx,yy,mh+4,mh,false);
			}
		}
		processing.popMatrix();
	}
	
	this.drawMonter = function(processing){
		
		var p1x = w/2 + processing.random(-w/18,w/18);
		var p1y = h/10 + processing.random(-h/18,h/18);
		var p2x = w/2 + processing.random(-w/20,w/20);
		var p2y = p1y + processing.random(h/20,h/8);
		var p4x = w/2 - w/5 - processing.random(w/20,w/8);
		var p4y = h/4*3 + h/5 + processing.random(-h/20,h/20);
		var p7x = w/2 + w/5 + processing.random(w/20,w/8);
		var p7y = h/4*3 + h/5 + processing.random(-h/20,h/20);
	
		var s2 = processing.random(-1,-0.5)*w/20; // slope of line2
		var p3x = p4x - w/15 + processing.random(-1,-0.5)*w/10;
		var p3y = p4y + s2*(p4x-p3x);
		var p5x = p4x + w/15 + processing.random(0.5,1)*w/10;
		var p5y = p4y + s2*(p4x-p5x);
		var s3 = processing.random(0.5,1)*w/20; // slope of line3
		var p6x = p7x - w/15 + processing.random(-0.5,-1)*w/10;
		var p6y = p7y + s3*(p7x-p6x);
		var p8x = p7x + w/15 + processing.random(0.5,1)*w/10;
		var p8y = p7y + s3*(p7x-p8x);
		
		p1 = new Point(p1x,p1y);
		p2 = new Point(p2x,p2y);
		p3 = new Point(p3x,p3y);
		p4 = new Point(p4x,p4y);
		p5 = new Point(p5x,p5y);
		p6 = new Point(p6x,p6y);
		p7 = new Point(p7x,p7y);
		p8 = new Point(p8x,p8y);
		
		processing.fill(255);
		processing.stroke(180);
		processing.strokeWeight(1);
		processing.pushMatrix();
		processing.translate(this.x,this.y);
		if(mx==0) {
			if(my==1) {
				processing.translate(w/2,h/2);
				processing.rotate(processing.PI/2);
				processing.translate(-w/2,-h/2);
			}
			else{
				processing.translate(w/2,h/2);
				processing.rotate(-processing.PI/2);
				processing.translate(-w/2,-h/2);
			}
		}
		processing.beginShape();
		processing.vertex(p1.x, p1.y);
		processing.bezierVertex(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
		processing.bezierVertex(p5.x, p5.y, p6.x, p6.y, p7.x, p7.y);
		processing.bezierVertex(p7.x, p7.y, p8.x, p8.y, p1.x, p1.y);
		processing.endShape();
		
		var mh = mouseSize*w/7;
		if(mouseSize>0) {
			processing.noFill();
			if(mx==-1) { // left mouse				
				var xx = p4.x;
				var yy = p4.y - mh;
				processing.clear(xx-4,yy,mh+4,mh);
				processing.beginShape();
				processing.vertex(xx,yy);
				processing.vertex(xx+mh,yy);
				processing.vertex(xx+mh,yy+mh);
				processing.vertex(xx,yy+mh);
				processing.endShape();
			}
			else{ // right mouse
				var xx = p7.x - mh;
				var yy = p7.y - mh;			
				processing.clear(xx,yy,mh+4,mh);
				processing.beginShape();
				processing.vertex(xx+mh,yy);
				processing.vertex(xx,yy);
				processing.vertex(xx,yy+mh);
				processing.vertex(xx+mh,yy+mh);
				processing.endShape();
			}
		}
	
		processing.popMatrix();
				
		if(isMouseOpening){
			if(mouseSize==3)
				isMouseOpening = false;
			else
				mouseSize++;
		}
		else{
			if(mouseSize==0)
				isMouseOpening = true;
			else
				mouseSize--;
		}
		
		if(steps>0){
			this.x += mx;
			this.y += my;
			steps--;
		}
		else
			this.setMoving(processing);
	}
	
}


Processing.prototype.drawFreehandLine = function(x1, y1, x2, y2) {

	var dist = this.dist(x1, y1, x2, y2);
	var basic = 4;
	var pieces = dist/basic;
	
	var dx = (x2-x1)/pieces;
	var dy = (y2-y1)/pieces;
	
 	this.beginShape();
  this.vertex(x1,y1);
	
	for(var i=0; i<pieces; i++) {
		var tx = x1 + dx*(i + this.random(2,4));
		var ty = y1 + dy*(i + this.random(2,4));	
		this.vertex( tx, ty);
	}
	
	this.endShape();
}

Processing.prototype.drawFreehandEllipse = function(x, y, w, h, start, end) {
  var currentAngle = 0;
  var totalDots = Math.floor( (w+h)/40 );
	if(totalDots<5)
    totalDots = 5;
  var angleGap = 2*Math.PI/totalDots;
	var dots = new this.ArrayList();	

  for(var i=0; i<totalDots; i++) {
		if(currentAngle>=start && currentAngle<=end) {
    	var p = new Point( x+Math.cos(currentAngle)*w/2*(1+Math.random()*0.1), y+Math.sin(currentAngle)*h/2*(1+Math.random()*0.1) );
			dots.add(p);
    }
		currentAngle+=angleGap;
  }
	
	if(dots.size()>=4) {
  	for(var j=0; j<dots.size(); j++){
	    var p1,p2,p3,p4;
	    p1 = dots.get(j);
	    if( j==dots.size()-3){
	      p2 = dots.get(j+1);
	      p3 = dots.get(j+2);
	      p4 = dots.get(0);
	    }
	    else if(j==dots.size()-2){
	      p2 = dots.get(j+1);
	      p3 = dots.get(0);
	      p4 = dots.get(1);
	    }
	    else if(j==dots.size()-1){
	      p2 = dots.get(0);
	      p3 = dots.get(1);
	      p4 = dots.get(2);
	    }
	    else{
	      p2 = dots.get(j+1);
	      p3 = dots.get(j+2);
	      p4 = dots.get(j+3);
	    }
	    this.curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
	  }
	}
	dots = null;
}


Processing.prototype.drawFreehandArc = function(x, y, w, h, start, end) {
  var currentAngle = 0;
  var totalDots = Math.floor( (w+h)/40 );
	if(totalDots<5)
    totalDots = 40;
  var angleGap = 2*Math.PI/totalDots;
	var dots = new this.ArrayList();	

  for(var i=0; i<totalDots; i++) {
		if(currentAngle>=start && currentAngle<=end) {
    	var p = new Point( x+Math.cos(currentAngle)*w/2*(1+Math.random()*0.1), y+Math.sin(currentAngle)*h/2*(1+Math.random()*0.1) );
			dots.add(p);
    }
		currentAngle+=angleGap;
  }
	
	this.beginShape();
 	for(var j=0; j<dots.size(); j++){
    var p = dots.get(j);
		this.vertex(p.x, p.y);
  }
	this.endShape();
	dots = null;
}


Processing.prototype.drawFreehandRect = function(x, y, w, h, hasLeg) {
  var gap = 2;
  var freeFactor = 0.2;

  this.beginShape();
  this.vertex(x,y);  
  var currentX = x;
  var currentY = y;
  var vertex = new Array();

  // MOUTH
	// TOP 
	while( currentX<(x+w) ){
		var randomX = Math.random()*gap;
		var randomY = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX;
		currentY += randomY*freeFactor;
		this.vertex( currentX, currentY);
		vertex[0] = new Point(currentX, currentY);
	}
	// RIGHT
	while( currentY<(y+h) ){
		var randomY = Math.random()*gap;
		var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX*freeFactor;
		currentY += randomY;
		this.vertex( currentX, currentY);
		vertex[1] = new Point(currentX, currentY);
	}
	// BOTTOM
	while( currentX>x ){
		var randomX = -1*Math.random()*gap;
		var randomY = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX;
		currentY += randomY*freeFactor;
		this.vertex( currentX, currentY);
		vertex[2] = new Point(currentX, currentY);
	}
	// LEFT
	while( currentY>y ){
		var randomY = -1*Math.random()*gap;
		var randomX = Math.random()>0.5 ? Math.random() : -1*Math.random();
		currentX += randomX*freeFactor;
		currentY += randomY;
		this.vertex( currentX, currentY);
		vertex[3] = new Point(currentX, currentY);
	}
  this.endShape();

  if(hasLeg){
	  for(var i=0; i<3; i++){
	    this.line(vertex[i].x, vertex[i].y, vertex[i].x+4, vertex[i].y+3);
	  }
	}

}

function Point(x,y){
  this.x = x;
  this.y = y; 
}

function DIntegrator(value, damping, attraction) {      
  this.value = value;
  this.vel = 0;
  this.accel = 0;
  this.force = 0;
  this.mass = 1;
  
  this.damping = damping;
  this.attraction = attraction;
  this.targeting = true;
  this.target;

  this.set = function(v) {
    this.value = v;
  }

  this.update = function() {

    if (this.targeting) {
      this.force += this.attraction * (this.target - this.value);
    }
		
    this.accel = this.force / this.mass;
    this.vel = (this.vel + this.accel) * this.damping;
    this.value += this.vel;

    this.force = 0;
  }

  this.setTarget = function(t) {
    this.targeting = true;
    this.target = t;
  }

  this.noTarget = function() {
    this.targeting = false;
  }
}

function Integrator() {
  this.value = 0;
  this.timer = 0;
  this.stage = 0;
	this.peakTime = 10;
	this.yawnTime = this.peakTime+6;
	
  this.update = function() {
    var tmpValue = 0;

    switch(this.stage){
      case 0:
        this.value = curveValue(this.timer-this.peakTime, this.peakTime);
        this.timer++;
        if(this.value==1)
          this.stage = 1;
        break;
      case 1:
        this.timer++;
        if(this.timer==this.yawnTime)
          this.stage = 2;
        break;
      case 2:
        this.value = curveValue(this.timer-this.yawnTime,this.peakTime+8);
        this.timer++; 
        if(this.value==0)
          this.stage = 3;
        break;
    }
  }

  function curveValue(x, xx){ // x range: -xx to xx, curveValue range: 0 - 1 - 0
    var yValue = -1/Math.pow(xx,2)*Math.pow(x,2) + 1;
    return yValue;
  }

}

function chunks(cuts) { // 0-1
	var avr = 1.0/cuts;
	var array = new Array(cuts);
	array[0] = 's';
	for(var i=0; i<cuts; i++) {
		array[i] = avr;
	}

	for(var j=0; j<cuts; j++) {
		var diff = array[j] * Math.random()/2;
		array[j] -= diff;
		if(j==cuts-1)
			array[0] += diff;
		else
			array[j+1] += diff;
	}

	return array;
}

/* Basic DOM functions 
 *
 * -------------------------- */
 
function removeChildNodes(node)
{
  while (node.childNodes[0])
  {
    node.removeChild(node.childNodes[0]);
  }
}

function getElementsByClass(node,searchClass,tag) {
	
  var classElements = new Array();
  var els = node.getElementsByTagName(tag); // use "*" for all elements	

  var elsLen = els.length;

	var pattern = new RegExp(searchClass);
    for (i = 0, j = 0; i < elsLen; i++) {
	
         if ( pattern.test(els[i].className) ) {
             classElements[j] = els[i];
             j++;
         }
    }
    return classElements;
}

function checkOverlap(x1, w1, x2, w2, buffer){
  var result;
  if(x1 < x2)
    result = x2<(x1+w1-buffer);
  else
    result = x1<(x2+w2-buffer);
  return result;
}

function findPosX(obj) {
  var curleft = 0;
  if(obj.offsetParent)
      while(1) 
      {
        curleft += obj.offsetLeft;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.x)
      curleft += obj.x;
  return curleft;
}

function findPosY(obj) {
  var curtop = 0;
  if(obj.offsetParent)
      while(1)
      {
        curtop += obj.offsetTop;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.y)
      curtop += obj.y;
  return curtop;
}