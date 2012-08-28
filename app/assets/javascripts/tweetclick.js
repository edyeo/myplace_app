$(function( ) {
	
	$('li.twitter').click( function( e ) {
		document.location.href = "/social";
	});

	$('li.twitter a').click( function( e ) {
		e.stopPropagation( );
	});
	
});