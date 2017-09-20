import $ from 'jquery';

var portApp = {};
//smooth scroll code blatently stolen from https://css-tricks.com/snippets/jquery/smooth-scrolling/
portApp.smoothScroll = () => {
	// Select all links with hashes
	$('a[href*="#"]')
	  // Remove links that don't actually link to anything
	  .not('[href="#"]')
	  .not('[href="#0"]')
	  .click(function(event) {
	    // On-page links
	    if (
	      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	      && 
	      location.hostname == this.hostname
	    ) {
	      // Figure out element to scroll to
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	      // Does a scroll target exist?
	      if (target.length) {
	        // Only prevent default if animation is actually gonna happen
	        event.preventDefault();
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1000, function() {
	          // Callback after animation
	          // Must change focus!
	          var $target = $(target);
	          $target.focus();
	          if ($target.is(":focus")) { // Checking if the target was focused
	            return false;
	          } else {
	            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
	            $target.focus(); // Set focus again
	          };
	        });
	      }
	    }
	  });
}
portApp.events = () => {
	$('.nav__link').on('click', (event) => {
		$('.nav__link--active').removeClass('nav__link--active');
		$(event.target).addClass('nav__link--active');
	});
	$('.hamburgerNav__icon').click(function(){
		$(this).toggleClass('open');
	});
};

portApp.init = () => {
	portApp.smoothScroll();
	portApp.events();
};
$(function(){
	portApp.init();
});