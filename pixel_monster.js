function PixelMonster() {
	
	var palletteIdx = Math.floor( Math.random()*5 );
	var adImageLeft;
	var adImageRight;	
	
  this.init = function() {
  	$('img').each(function() {
  	  if ($(this).parent('.wg_monster_container').length == 0 
  	      && $(this).width() >= 50 && $(this).height() >= 50 
  	      && $(this).css('position') != 'absolute') {
  	    $(this).wrap("<span class='wg_monster_container' \
  	                  style='position: relative; display: inline-block; \
  	                         left: 0; top: 0; border: none; outline: none; \
  	                         text-indent: 0;' />");
  	    var wg_container = $(this).parent('.wg_monster_container');
  	    //wg_container.wrap("<div class='wg_monster_outer' \
  	    //                   style='position: absolute;' />");
  	    //wg_outer = wg_container.parent('.wg_monster_outer');
  	    //wg_outer.css('left', $(this).position().left).css('top', $(this).position().top);
  	    wg_container.append("<div class='call_monster_btn' \
  	                        style='position: absolute; top:0; left:0; \
  	                        display: none; cursor: pointer; \
  	                        background: url(http://people.artcenter.edu/~tchien/assets/monster_icon_30.png); \
  	                        width: 30px; height: 30px;\
  	                        padding: 0; margin: 0;\
  	                        float: none;'></div>");
  	    
  	    wg_container.css('width', $(this).width()).css('height', $(this).height());
  	    wg_container.css('float', $(this).css('float'))
  	                .css('margin', $(this).css('margin'))
  	                .css('margin-top', $(this).css('margin-top'))
  	                .css('margin-right', $(this).css('margin-right'))
  	                .css('margin-bottom', $(this).css('margin-bottom'))
  	                .css('margin-left', $(this).css('margin-left'))
  	                .css('padding', $(this).css('padding'))
  	                .css('padding-top', $(this).css('padding-top'))
  	                .css('padding-right', $(this).css('padding-right'))
  	                .css('padding-bottom', $(this).css('padding-bottom'))
  	                .css('padding-left', $(this).css('padding-left'));
      }
  	});
  	
  	$('.wg_monster_container').hover(
  	  function() {
        var btn = $(this).find('.call_monster_btn');
        btn.show(); 
      },
      function() {
        var btn = $(this).find('.call_monster_btn');
        btn.hide();
    	}
  	);
  	
  	$('.call_monster_btn').hover(
  	  function() { 
  	    $(this).css('background-position', '0px 30px'); 
  	  },
  	  function() { 
  	    $(this).css('background-position', '0px 0px'); 
  	  }
  	);
  	
  	$('.call_monster_btn').click(function(e) {
  	  var imgs = $(this).siblings('img');
  	  imgs.css('visibility', 'hidden');
  	  
  	  $.get("http://monster.detourlab.com/bites/upload?image_url="+imgs.attr('src')+"&url="+document.location.href);
  	  createMonster($(this).parent());
  	  
  	  e.stopPropagation();
  	  $(this).remove();
  	  return false;
  	});
  }
  
  function createMonster(elem) {
		var newMonster = new WGImage(elem,palletteIdx);
	}
  
  function sketchProc(processing) {
    var x, y, width, height, label;
    processing.setup = function(){
			processing.noLoop();
    }
    processing.draw = function(){
			
    }
  }
	
}