$(function(){
	//showCover();

});

function showCover(){
	$('.item').hover(function() {
		/* Stuff to do when the mouse enters the element */
		$(this).find('.showCover').animate({'bottom': '0px'}, 232);
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		$(this).find('.showCover').animate({'bottom': '-100px'}, 232);
	});	
}