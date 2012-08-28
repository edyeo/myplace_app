var pageCount = null;
var pageType = null;
var nextPage = 2;
var sliders = null;

$(function(){
	pageCount = $('.infinite_more').attr( "data-pages" );
	if ( ! pageCount )
		pageCount = 1;
	pageType = $('.infinite_more').attr( "data-type" );
	
	sliders = new Array();
	
	$('.row').each( setupSliders );
	
	resetSliders = function(){
		for (var i = 0; i < sliders.length; i++){
			sliders[i].toItem($('.slider').eq(i).find('.item:first'));
		}
	}
	
	if (!jQuery.browser.mobile) {
		$('.fancybox').fancybox({
			padding: 0,
			margin: [50,20,10,20],
			prevEffect: 'none',
			nextEffect: 'none',
			loop: false,
			helpers: {
				media: {},
				overlay : {
					opacity: 0.9
				}
			}
		});
	}
	
	$('div.regions ul a').click( function( e ) {
		var target = "." + $(this).attr('href').substring( 1 );
		if ( target == ".all" ) {
			$('ul.videos li').show( );
			$('div.photoset').show( );
			$('div.videos').show( );
		}
		else {
			$('ul.videos li').filter(target).show( );
			$('ul.videos li').not(target).hide( );
			$('div.photoset').filter(target).show( );
			$('div.photoset').not(target).hide( );
			if ( $('ul.videos li').filter(target).size( ) == 0 )
				$('div.videos').hide( );
			else
				$('div.videos').show( );
		}
		resetSliders( );
	});
	
	$('#viewnow').find( 'a.fancybox' ).first( ).click( );
	$('a.viewnow').click( );
	
	$('img.preloaded').imagesLoaded( setLazyLoad );
	$('img.preloaded').removeClass('preloaded');
	
	$('p.infinite_more a').click( function( e ) {
		if ( nextPage > pageCount )
			return false;
		$.get( "/" + pageType + "/page/" + nextPage, function( content ) {
			nextPage++;
			if ( nextPage > pageCount )
				$('p.infinite_more').remove( );
			var newRows = $(content);
//			if ( $('div.photoset').size( ) >= 6 )
//				$('div.photoset').slice( 0, 3 ).remove( );
			newRows.appendTo( $('#primary_content' ) );
			$('.row').each( setupSliders );
			$('img.preloaded').imagesLoaded( setLazyLoad );
		});
		return false;
	});
});

function setupSliders(index) {
	if ( sliders[index] )
		return;

	sliders[index] = new Lectric();
	var sliderOptions = {
		next: $(this).find('.right'),
		previous: $(this).find('.left'),
		animateEasing: 'easeOutExpo',
		tossing: true
	}
	
	sliders[index].init($(this).find('.slider'), sliderOptions);
	sliders[index].lazyImages = $(this).find('img.lazyload');
	
	// $(this).find('.slider').mousewheel(function(e, delta) {
	// 	var dir = delta > 0 ? 1 : -1;
	// 	sliders[index].to(sliders[index].page() + dir);
	// 	return false;
	// })
}

function setLazyLoad( e ) {
	for ( x in sliders ) {
		if ( sliders[x].slide_sub )
			continue;
		sliders[x].slide_sub = sliders[x].subscribe( 'slide', function( s, e ) {
			s.unsubscribe( 'slide', s.slide_sub );
			s.lazyImages.each( function( n, image ) {
				$(image).attr( "src", $(image).attr('data-image') );
			});
		});
	}
//	$('img.lazyload').each( function( n, image ) {
//		$(image).attr( "src", $(image).attr('data-image') );
//	});
}