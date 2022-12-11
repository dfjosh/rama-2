$(document).ready(function() {

// Initialization

	function heights () {
		var controllerWidth = $('.controller').width();
		var dpadWidth = $('.d-pad').width();
		var screenWidth = $('.screen').width();
		$('.controller').css({
			'height' : controllerWidth * 0.434
		});
		$('.d-pad-container').css({
			'height' : dpadWidth,
		});
		$('.screen').css({
			'height' : screenWidth,
		});
		$('.thomas').animate({'left' : convertPos(4)}, 0);
		return screenWidth;
	}
	
	$(document).ready(function() {
		heights ();
	});
	$(window).resize(function() {
		heights ();
	});
		
// Controller Animations
	
	$('.d-pad-top-center').hover(function() {
		$('.d-pad, .d-pad-shadow').addClass('up');
	}, function() {
		$('.d-pad, .d-pad-shadow').removeClass('up');
	});
	$('.d-pad-bottom-center').hover(function() {
		$('.d-pad, .d-pad-shadow').addClass('down');
	}, function() {
		$('.d-pad, .d-pad-shadow').removeClass('down');
	});
	$('.d-pad-middle-left').hover(function() {
		$('.d-pad, .d-pad-shadow').addClass('left');
	}, function() {
		$('.d-pad, .d-pad-shadow').removeClass('left');
	});
	$('.d-pad-middle-right').hover(function() {
		$('.d-pad, .d-pad-shadow').addClass('right');
	}, function() {
		$('.d-pad, .d-pad-shadow').removeClass('right');
	});
		
// Keyboard to Click Events

	$('html').keydown(function(a) {
		var theKey = a.which;
		if ( theKey == 87 || theKey == 32 || theKey == 38 ) {	// UP = w, up-arrow, or space.
			$('.d-pad-top-center').click();
		} if ( theKey == 83 || theKey == 40 ) {					// DOWN = s or down-arrow.
			$('.d-pad-bottom-center').click();
		} if ( theKey == 65 || theKey == 37 ) {					// LEFT = a or left-arrow.
			$('.d-pad-middle-left').click();
		} if ( theKey == 68 || theKey == 39 ) {					// RIGHT = d or right-arrow.
			$('.d-pad-middle-right').click();
		} if ( theKey == 186 || theKey == 16 ) {					// B = ; (semi-colon) or return.
			$('.b').click();
		} if ( theKey == 222 || theKey == 13 ) {					// A = ' (single quote) or left-shift.
			$('.a').click();
		} 
	});
	
// Character Animations
	
	var posture = 1;		//  0 = crouched,  1 = upright,  2 = mid-air.
	var durSlow = 200;
	var durFast = 75;
	var jumpPunch = false;
	var jumpKick = false;
	var lookDirection = 0;	// 0 = left,  1 = right.
	var startAction = 0;	// 0 = kill,  1 = live.
	
	function convertPos(spriteNum) {
		var percentage = spriteNum / 15;
		var currentScreenWidth = $('.screen').width();
		var calculatePosition = currentScreenWidth * -15 * percentage;
		if ( lookDirection == 0 ) {
			return calculatePosition;
		} else if ( lookDirection == 1 ) {
			calculatePosition = currentScreenWidth * -15 - calculatePosition + currentScreenWidth;
			return calculatePosition;
		}
	}
	
	// Direction	
	$('.d-pad-container div').click(function() {
		if ( $(this).hasClass('d-pad-top-center') ) {
			posture = 2;
			$('.thomas').animate({'left' : convertPos(0)}, 0)
				.delay(durFast)
				.animate({'left' : convertPos(1)}, 0)
				.delay(durFast)
				.animate({ 'left' : convertPos(12)}, 0)
/* 				.animate({'left' : ( jumpPunch ? convertPos(11) : convertPos(2) )}, 0) */
/*
				.animate({'left' : convertPos(2)},{
					duration: 0,
					step: function(now, fx) {
						if ( jumpPunch == true ) {
							$(this).animate({
								'left' : convertPos(11)
							}, 0);
						} else if ( jumpKick == true ){
							$(this).animate({
								'left' : convertPos(12)
							}, 0);
						}
					}
				})
*/
				.delay(durSlow)
				.animate({'left' : convertPos(1)}, 0)
				.delay(durFast)
				.animate({'left' : convertPos(0)}, 0)
				.delay(durFast)
				.animate({'left' : convertPos(4)}, 0,
				function() {posture = 1;}
			);
			
		} else if ( $(this).hasClass('d-pad-bottom-center') ) {
			$('.thomas').animate({'left' : convertPos(7)}, 0);
			posture = 0;
		} else if ( $(this).hasClass('d-pad-middle-left') ) {
			lookDirection = 0;
			if ( posture == 1 ) {
				$('.thomas').animate({'left' : convertPos(4)}, 0);
			} else if ( posture == 0 ) {
				$('.thomas').animate({'left' : convertPos(7)}, 0);
			}
			$('.thomas').removeClass('look-right');
		} else if ( $(this).hasClass('d-pad-middle-right') ) {
			lookDirection = 1;
			if ( posture == 1 ) {
				$('.thomas').animate({'left' : convertPos(4)}, 0);
			} else if ( posture == 0 ) {
				$('.thomas').animate({'left' : convertPos(7)}, 0);
			}
			$('.thomas').addClass('look-right');
		}
	});

	
	// Punch
	$('.a').click(function() {
		if ( posture == 0 ) {
			$('.thomas').animate({'left' : convertPos(8)}, {duration: 0, queue: false})
			.delay(durSlow)
			.animate({'left' : convertPos(7)}, 0);
		} else if ( posture == 1 ) {
			$('.thomas').animate({'left' : convertPos(5)}, {duration: 0, queue: false})
			.delay(durSlow)
			.animate({'left' : convertPos(4)}, 0);
		} else if ( posture == 2 ) {
			jumpPunch = true;
		}
	});

	// Kick
	$('.b').click(function() {
		if ( posture == 0 ) {
			$('.thomas').animate({'left' : convertPos(10)}, {duration: 0, queue: false})
			.delay(durSlow)
			.animate({'left' : convertPos(7)}, 0);
		} else if ( posture == 1 ) {
			$('.thomas').animate({'left' : convertPos(6)}, {duration: 0, queue: false})
			.delay(durSlow)
			.animate({'left' : convertPos(4)}, 0);
		} else if ( posture == 2 ) {
			jumpKick = true;
		}
	});
	
	// Start
	$('.start').click(function() {
		if ( startAction == 0 ) {
			$('.thomas').animate({'left' : convertPos(14)}, 0)
			.delay(durFast)
			.animate({'top' : '100%'}, durSlow * 3);
			startAction = 1;
		} else if ( startAction == 1 ) {
			$('.thomas').animate({
				'left' : convertPos(4),
				'top' : '-100%'
			}, 0)
			.animate({'top' : 0}, durSlow * 3);
			startAction = 0;
		}
	});
	
	// Select
	$('.select').click(function() {
		$('.hints').toggle();
	});
	
	
	
	
	
	
	
	
	
	
	
						
});