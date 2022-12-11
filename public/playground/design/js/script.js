$(document).ready(function() {
    
    //alert($('div').length + " divs found (jQuery works).");
    
    var n = 0;
    $('.center').on('click', function() {
    	n++;
    	if (n == 5) {
	    	n = 1;
    	}
    	if (n == 1) {
		    $('.top_left').animate({
			    'margin-left' : '+=240px'
		    }, 'slow');
		    $('.top_right').animate({
			    'margin-top' : '+=240px'
		    }, 'slow');
		    $('.bottom_right').animate({
			    'margin-left' : '-=240px'
		    }, 'slow');
		    $('.bottom_left').animate({
			    'margin-top' : '-=240px'
		    }, 'slow');
    	}
    	if (n == 2) {
		    $('.top_left').animate({
			    'margin-top' : '+=240px'
		    }, 'slow');
		    $('.top_right').animate({
			    'margin-left' : '-=240px'
		    }, 'slow');
		    $('.bottom_right').animate({
			    'margin-top' : '-=240px'
		    }, 'slow');
		    $('.bottom_left').animate({
			    'margin-left' : '+=240px'
		    }, 'slow');
    	}
    	if (n == 3) {
		    $('.top_left').animate({
			    'margin-left' : '-=240px'
		    }, 'slow');
		    $('.top_right').animate({
			    'margin-top' : '-=240px'
		    }, 'slow');
		    $('.bottom_right').animate({
			    'margin-left' : '+=240px'
		    }, 'slow');
		    $('.bottom_left').animate({
			    'margin-top' : '+=240px'
		    }, 'slow');
    	}
    	if (n == 4) {
		    $('.top_left').animate({
			    'margin-top' : '-=240px'
		    }, 'slow');
		    $('.top_right').animate({
			    'margin-left' : '+=240px'
		    }, 'slow');
		    $('.bottom_right').animate({
			    'margin-top' : '+=240px'
		    }, 'slow');
		    $('.bottom_left').animate({
			    'margin-left' : '-=240px'
		    }, 'slow');
    	}
    });
    
    $('div.center').after('<p class="arrow">&larr; Click Me!</p>');
    $('p.arrow').hide().delay(4000).fadeIn('slow');
    
	function bouncy() {
		$('p.arrow').animate({
			'margin-left' : '+=10px'
		}, 'easeOut').animate({
			'margin-left' : '-=10px'
		}, 'easeOut', function() {
			bouncy();
		})
	}
	bouncy();
    
    $('div.center').click(function() {
	    $('p.arrow').fadeOut({duration: 400, queue: false});
    });

// Figure out how to utilize a function for the above code
        
});