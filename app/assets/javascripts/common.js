var G = G || {};
var _fbcheck;
var _checkcount = 0;

G.init = function(){


	// Sniff for iPad and Mobile
	G.isIpad = false;

	try {
		G.isIpad = navigator.userAgent.match(/iPad/i) != null;
	}
	catch (e) {}
	
	G.isMobile = jQuery.browser.mobile;
	
	// Init variables
	G.$window = $(window);
	G.$currSelection = $('.dropdown .current a');
	G.$dropdown = G.$currSelection.parents('.dropdown').find('ul');
	G.$checkboxes = $('#secondary_content ul.checkboxes a');
//	G.$header = $('header').height();
//	G.$footerHeight = $('footer').height();
	
	G.initDropboxes();
	G.initCheckboxes();
	
	// Activate rollovers
	$('.rollover').rollOver();
	
	// Hide season select if clicked anywhere on page
	$(document).click(function(){
		G.$dropdown.hide();
		if (G.$currSelection.hasClass('hover')) {
			G.$currSelection.removeClass('hover');
		}
	});
	
	// Social popups for lightbox
	G.socialPopupSettings = "height=" + 300 + ",width=" + 700 + ",resizable=" + 1;
	
	$('.fancybox-wrap .social a').live('click', function(e){
		e.preventDefault();
		window.open(this.href, 'pinterest', G.socialPopupSettings);
	});
	$('.blog-detail .share a').live('click', function(e){
		e.preventDefault();
		window.open(this.href, 'pinterest', G.socialPopupSettings);
	});
	
	// $('.row').on('mouseenter',function(e){
	// 	var rightArrow = $(this).find('ul.controls .right');
	// 	$(rightArrow).stop().animate({right: 0},1000,'easeInOutQuart').animate({right: 50},1000,'easeInOutQuart').animate({right: 38},1000,'easeOutBounce')
	// })
	
	if (G.isMobile){
		$('nav#primary_navigation').clone().prependTo('footer');
		$('footer nav#primary_navigation ul').prepend('<li><a href="/">Home</a></li>');
		
		if (!window.pageYOffset)
        {
            window.scrollTo(0, 1);
        }
	}
};

G.initDropboxes = function(){
	// Current selection
	G.$currSelection.on({
		click: function(e){
			e.stopPropagation();
			e.preventDefault();
			$(this).parents('.dropdown').find('ul').toggle();
			$(this).toggleClass('hover');
		}
	});
	
	// Change season select
	G.$dropdown.find('a').on({
		click: function(e){
			e.preventDefault();
			$(this).parents('.dropdown').find('.current a').text($(this).text());
			G.$currSelection.toggleClass('hover');
		}
	});
}

G.initCheckboxes = function(){
	G.$checkboxes.on({
		click: function(e){
			e.stopPropagation();
			e.preventDefault();
			if ( $(this).attr('href') == '#all' ) {
				if ( !$(this).is('.checked') ) {
					G.$checkboxes.not('.check-all').removeClass('checked');
					$(this).addClass('checked');
					$(this).closest('ul.checkboxes').trigger( 'filter-all.gsom' );
				}
			}
			else {
				G.$checkboxes.filter('[href="#all"]' ).removeClass('checked');
				$(this).toggleClass('checked');
				if ( G.$checkboxes.filter('.checked').size( ) == 0 )
					G.$checkboxes.filter('[href="#all"]' ).trigger( 'click' );
				else {
					var selected = [];
					G.$checkboxes.filter('.checked').each( function( n, item ) {
						selected.push( $(item).attr('href').substr( 1 ) );
					});
					$(this).closest('ul.checkboxes').trigger( 'filter-update.gsom', [ selected ] );
				}
			}
		}
	});
}

/*
Rollovers for the input type="image".
Thanks to Atlanta Jones:
http://www.atlantajones.com/2008/07/02/even-easier-jquery-rollovers/
*/
$.fn.rollOver = function() {
	// Set the original src
	rollsrc = $(this).attr("src");
	if (rollsrc) {
		rollON = rollsrc.replace('off', 'on');
		newImg = new Image(); // create new image obj
		$(newImg).attr("src", rollON); // set new obj's src
	}
	
	this.mouseover(function() {
		imgsrc = $(this).attr("src");
		if (typeof(imgsrc) != 'undefined') {
		imgsrcON = imgsrc.replace('off', 'on');
		$(this).attr("src", imgsrcON);
		}
	});

	// Handle mouseout
	this.mouseout(function(){
		if (typeof(imgsrc) != 'undefined') {
		$(this).attr("src", imgsrc);
		}
	});
};

/*
Initialize
*/
$(function() {
	G.init();
});

