$(document).ready(function() {




/////////////////////////  Functions  /////////////////////////

	// I may be able to delete this one and only use convert. Check it out later.
	function kmsToMmpt(a) {
		var b = a / 1000;
		return b;
	}
	
	function convert(a) {
		var b = a * spaceScaleFactor - $(window).width();
		return b;
	}
	
	function numberWithCommas(x) {
	    var parts = x.toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    return parts.join(".");
	}
	
	function pulsateStop() {
		$('a.stop').animate({
			'opacity' : '0.4',
		}, 500, 'linear')
		.animate({
			'opacity' : '1.0',
		}, 500, 'linear', pulsateStop);
	}
	
	function travelToDestination(x) {
		    $('html, body').stop(true,false).animate({
		        scrollLeft: $($(x).attr('href')).offset().left 
		        				- 1/2 * $(window).width() 
								+ 1/2 * $($(x).attr('href')).width()
		    },
		    {
			    duration: (Math.abs( $($(x).attr('href')).offset().left
			    			- 1/2 * $(window).width()
			    			+ 1/2 * $($(x).attr('href')).width()
			    			- $(document).scrollLeft() )) 
			    			/ spaceScaleFactor 
			    			/ travelRate,
			    easing: 'linear',
			    queue: false,
			    complete: function() {
				    $('.controls h3 a.stop').text('').stop(); // Doesn't always stop when clicking a destination that the user is already on for some reason.
			    }
		    });
			$('div.destination').prev().children().children('.output').text($(x).attr('href').substring(1));
			$('.controls h3 a.stop').text('stop');
			pulsateStop();
		    return false;
	}

	function travelToDestinationPrecise(x) {
		    $('html, body').stop(true,false).animate({
		        scrollLeft: $($(x).attr('href')).offset().left 
								+ 1/2 * $($(x).attr('href')).width()
		    },
		    {
			    duration: (Math.abs( $($(x).attr('href')).offset().left
			    			+ 1/2 * $($(x).attr('href')).width()
			    			- $(document).scrollLeft() )) 
			    			/ spaceScaleFactor 
			    			/ travelRate,
			    easing: 'linear',
			    queue: false,
			    complete: function() {
				    $('.controls h3 a.stop').text('').stop(); // Doesn't always stop when clicking a destination that the user is already on for some reason.
			    }
		    });
			$('div.destination').prev().children().children('.output').text($(x).attr('href').substring(1));
			$('.controls h3 a.stop').text('stop');
			pulsateStop();
		    return false;
	}


	function stopTraveling() {
		$('html, body').stop();
		$('.controls h3 a.stop').text('');
	}
	
	function setBodyScale(a,b) {
		a.animate({
			'width' : b * bodyScaleFactor,
			'height' : b * bodyScaleFactor,
			'margin-top' : b * bodyScaleFactor / -2,
			'margin-left' : b * bodyScaleFactor / -2,
		}, 200, 'swing');
	}
	
	function changeBodyScale() {
		for (var i = 0; i < bodiesId.length; i++) {
			setBodyScale(bodiesId[i],bodiesDia[i]);
		}
	}
	
	function displayBodyScale() {
		if (bodyScaleFactor * 1000 * 1000 < 1000000 && bodyScaleFactor * 1000 * 1000 > 1) {
			$('div.scale').prev().children(':nth-child(1)').children().text(numberWithCommas(Math.round(bodyScaleFactor * 1000 * 1000)));
		} else {
			$('div.scale').prev().children(':nth-child(1)').children().text((bodyScaleFactor * 1000 * 1000).toExponential(0));
		}
	}

	function setSpaceScale(a,b) {
		a.animate({
			'width' : b * spaceScaleFactor,
		}, 200, 'swing');
	}
		
	function changeSpaceScale() {
		for (var i = 0; i < spaceId.length; i++) {
			setSpaceScale(spaceId[i],spaceDist[i]);
		}
		$('.interplanetary_space_n').css({
			'width' : interplanetarySpaceN
		});
		$('.solar_system').animate({
			'width' : solarSystem * spaceScaleFactor + interplanetarySpaceN
		}, 200, 'swing');
		
		// Keep the window stationary. Not working. fix it. Something witht the queue?...
/*
		$('html, body').animate({
			scrollLeft : $('body').offset().left / 1000 * spaceScaleFactor,
		}, 200, 'swing');
*/
	}
	
	function displaySpaceScale() {
		if (spaceScaleFactor * 1000 * 1000 > 10 && spaceScaleFactor * 1000 * 1000 < 10000000) {
			$('div.scale').prev().children(':nth-child(2)').children().text(numberWithCommas(Math.pow(spaceScaleFactor,-1).toFixed(0)));
		} else {
			$('div.scale').prev().children(':nth-child(2)').children().text(Math.pow(spaceScaleFactor,-1).toExponential(0));
		}
	}
	
	function setEccentricity() {
		if (eccentricityNeptune * spaceScaleFactor / 2 <= interplanetarySpaceN) {
			for (i = 1, j = 0; j < eccentricity.length; i++, j++) {
				var itsWidth = eccentricity[j] * spaceScaleFactor;
				bodiesId[i].next().animate({
					'margin-left' : itsWidth / -2,
					'background-color' : 'rgba(0,0,0,0.3)',
					'width' : itsWidth,
					'height' : $(window).height(),
				}, 200);
			}
			$('.interplanetary_space_n').animate({'background-color' : $('body').css('background-color')}, 200);
		} else {
		// This deals with Neptune separately as it is last and the eccentricity could overflow the solar system container
			for (i = 1, j = 0; j < eccentricity.length - 1; i++, j++) {
				var itsWidth = eccentricity[j] * spaceScaleFactor;
				bodiesId[i].next().animate({
					'margin-left' : itsWidth / -2,
					'background-color' : 'rgba(0,0,0,0.3)',
					'width' : itsWidth,
					'height' : $(window).height(),
				}, 200);
			}
			$('.neptune').next().animate({
				'margin-left' : eccentricityNeptune * spaceScaleFactor / -2,
				'background-color' : 'rgba(0,0,0,0.3)',
				'width' : eccentricityNeptune * spaceScaleFactor / 2,
				'height' : $(window).height(),
			}, 200);
			if ($('.interplanetary_space_n .eccentricity').css('display') == 'block') {
				$('.interplanetary_space_n').toggleClass('dark', 200);
			}
		}
	}
	
	function changeColors() {
		if (colors == 'distinct') {
			for (i = 0; i < bodiesId.length; i++) {
				bodiesId[i].addClass(dColor[i], 500);
				bodiesId[i].removeClass(aColor[i], 500);
				bodiesId[i].removeClass(tColor[i], 500);
			}
			for (i = 0; i < spaceId.length; i++) {
				spaceId[i].addClass(dColorSpace[i], 500);
				spaceId[i].removeClass(aColorSpace[i], 500);
			}
			$('.destination div').each(function(i) {
				$(this).addClass(dColor[i], 500);
				$(this).removeClass(aColor[i], 500);
				$(this).removeClass(tColor[i], 500);
			});
			if ($('.solar_system').hasClass('black')) {
				$('.solar_system').removeClass('black', 500);
			}
			$('body').css('background-color','#373737');
		} else if (colors == 'accurate') {
			for (i = 0; i < bodiesId.length; i++) {
				bodiesId[i].addClass(aColor[i], 500);
				bodiesId[i].removeClass(dColor[i], 500);
				bodiesId[i].removeClass(tColor[i], 500);
			}
			for (i = 0; i < spaceId.length; i++) {
				spaceId[i].addClass(aColorSpace[i], 500);
				spaceId[i].removeClass(dColorSpace[i], 500);
			}
			$('.destination div').each(function(i) {
				$(this).addClass(aColor[i], 500);
				$(this).removeClass(dColor[i], 500);
				$(this).removeClass(tColor[i], 500);
			});
			if ($('.solar_system').hasClass('black')) {
				$('.solar_system').removeClass('black', 500);
			}
			$('body').css('background-color','#373737');
		} else if (colors == 'texture') {
			for (i = 0; i < bodiesId.length; i++) {
				bodiesId[i].addClass(tColor[i], 500);
				bodiesId[i].removeClass(dColor[i], 500);
				bodiesId[i].removeClass(aColor[i], 500);
			}
			for (i = 0; i < spaceId.length; i++) {
				spaceId[i].addClass(aColorSpace[i], 500);
				spaceId[i].removeClass(dColorSpace[i], 500);
			}
			$('.destination div').each(function(i) {
				$(this).addClass(tColor[i], 500);
				$(this).removeClass(dColor[i], 500);
				$(this).removeClass(aColor[i], 500);
			});
			$('.solar_system').addClass('black', 500);
			$('body').css('background-color','black');
		}
	}

	//This isn't working, I should figure out why
/*
	function changeColor(x,y,z,a,b) {
		for (i = 0; i < bodiesId.length; i++) {
			bodiesId[i].addClass(x, 500);
			bodiesId[i].removeClass(y, 500);
			bodiesId[i].removeClass(z, 500);
		}
		for (i = 0; i < spaceId.length; i++) {
			spaceId[i].addClass(a, 500);
			spaceId[i].removeClass(b, 500);
		}
		$('.destination div').each(function(i) {
			$(this).addClass(x, 500);
			$(this).removeClass(y, 500);
			$(this).removeClass(z, 500);
		});
	}
*/
	
	function highlightBlue() {
		$('.velocity div').removeClass('blue');
		if (travelRate * 1000 * spaceScaleFactor == speedOfApollo10 * spaceScaleFactor) {
			$('.velocity div div').removeClass('blue active');
			$('.velocity a.scaleSpeedSlowest').parent().addClass('blue active');
		} else if (travelRate * 1000 * spaceScaleFactor == speedOfLightning * spaceScaleFactor) {
			$('.velocity div div').removeClass('blue active');
			$('.velocity a.scaleSpeedSlow').parent().addClass('blue active');
		} else if (travelRate * 1000 * spaceScaleFactor == speedOfLight * spaceScaleFactor) {
			$('.velocity div div').removeClass('blue active');
			$('.velocity a.scaleSpeedNormal').parent().addClass('blue active');
		} else if (travelRate * 1000 * spaceScaleFactor == speedOf60c * spaceScaleFactor) {
			$('.velocity div div').removeClass('blue active');
			$('.velocity a.scaleSpeedFast').parent().addClass('blue active');
		} else if (travelRate * 1000 * spaceScaleFactor == speedOfWarp9 * spaceScaleFactor) {
			$('.velocity div div').removeClass('blue active');
			$('.velocity a.scaleSpeedFaster').parent().addClass('blue active');
		} else if (travelRate * 1000 * spaceScaleFactor == speedOfWormHole * spaceScaleFactor) {
			$('.velocity div div').removeClass('blue active');
			$('.velocity a.scaleSpeedFastest').parent().addClass('blue active');
		}
	}

	function setAestheticMode() {
		// Give Neptune just enough space so that scrolling all the way right lands it in the center
		$('.interplanetary_space_n').css({
			'width' : interplanetarySpaceN
		});
		// Set the initial width of the solar system including the extra space mentioned above for Neptune. Plus 1 for rounding errors I presume (it just makes it work)
		$('.solar_system').css({
			'width' : solarSystem * spaceScaleFactor + interplanetarySpaceN + 1
		});
	}

	
	function setPreciseMode() {
		$('.interplanetary_space_n').css({
			'width' : interplanetarySpaceNPrecise
		});
				
		$('.solar_system').css({
			'width' : solarSystem * spaceScaleFactor + interplanetarySpaceNPrecise + 1
		});
	}
	
	function flash() {
		$('.commentary').animate({
			'background-color' : 'hsla(0,75%,85%,0.88)'
		}, 0, function() {
			$(this).animate({
				'background-color' : 'hsla(0,75%,53%,0.88)'
			}, 400)
		});
	}
	
	
	


/////////////////////////  Variables  /////////////////////////

	// Equatorial diameters in km
	
	var eDiaSun		= 1392684; //this may not be accurate as it is equal to the "mean diameter" on wikipedia
	var eDiaMercury	=    4879.4;
	var eDiaVenus	=   12103.6;
	var eDiaEarth	=   12756.2;
	var eDiaMars	=    6792.4;
	var eDiaJupiter	=  142984;
	var eDiaSaturn	=  120536;
	var eDiaUranus	=   51118;
	var eDiaNeptune	=   49528;
	
	// Separation between semi-major axes in km

	var interplanetarySpaceSM = 57909100;
	var interplanetarySpaceMV = 50298900;
	var interplanetarySpaceVE = 41390261;
	var interplanetarySpaceEM = 78340839;
	var interplanetarySpaceMJ = 550608100;
	var interplanetarySpaceJS = 654902170;
	var interplanetarySpaceSU = 1443229712;
	var interplanetarySpaceUN = 1626764579;
	var interplanetarySpaceN = $(window).width() / 2;
	var interplanetarySpaceNPrecise = $(window).width();
	
	var solarSystem = interplanetarySpaceSM + interplanetarySpaceMV + interplanetarySpaceVE + interplanetarySpaceEM + interplanetarySpaceMJ + interplanetarySpaceJS + interplanetarySpaceSU + interplanetarySpaceUN;
	
	// Distance between perihelion and aphelion in km
	
	var eccentricityMercury	=  23815700;
	var eccentricityVenus	=   1462000;
	var eccentricityEarth	=   4999942;
	var eccentricityMars	=  42540300;
	var eccentricityJupiter	=  75947200;
	var eccentricitySaturn	= 159752827;
	var eccentricityUranus	= 255481243;
	var eccentricityNeptune	= 101005657;
	
	// Velocities in km/s
	
	var speedOfApollo10		= 			   11.082;
	var speedOfLightning	= 			  440.000;
	var speedOfLight		= 		   299792.458;
	var speedOf60c			=		 17987547.48; //speedOfLight * 60
	var speedOfWarp9		= 	    454485366.3; // speedOfLight * 1516    according to How Stuff Works
	var speedOfWormHole		= 999999999999999;
	

	var bodiesId = [$('.sun'),$('.mercury'),$('.venus'),$('.earth'),$('.mars'),$('.jupiter'),$('.saturn'),$('.uranus'),$('.neptune'),];
	var bodiesDia = [eDiaSun,eDiaMercury,eDiaVenus,eDiaEarth,eDiaMars,eDiaJupiter,eDiaSaturn,eDiaUranus,eDiaNeptune,];
	var spaceId = [$('.interplanetary_space_sm'),$('.interplanetary_space_mv'),$('.interplanetary_space_ve'),$('.interplanetary_space_em'),$('.interplanetary_space_mj'),$('.interplanetary_space_js'),$('.interplanetary_space_su'),$('.interplanetary_space_un'),];
	var spaceDist = [interplanetarySpaceSM,interplanetarySpaceMV,interplanetarySpaceVE,interplanetarySpaceEM,interplanetarySpaceMJ,interplanetarySpaceJS,interplanetarySpaceSU,interplanetarySpaceUN,];
	var eccentricity = [eccentricityMercury, eccentricityVenus, eccentricityEarth, eccentricityMars, eccentricityJupiter, eccentricitySaturn, eccentricityUranus, eccentricityNeptune,];
		
	// Default values
		
	var spaceScaleFactor = 1/1000;
	var bodyScaleFactor  = 1/1000;
	var travelRate = speedOfLight * spaceScaleFactor;
	
	var constrain = false;
	var colors = 'distinct';
	
	// Colors
	
	var dColor = ['dColorSun','dColorMercury','dColorVenus','dColorEarth','dColorMars','dColorJupiter','dColorSaturn','dColorUranus','dColorNeptune',];
	var aColor = ['aColorSun','aColorMercury','aColorVenus','aColorEarth','aColorMars','aColorJupiter','aColorSaturn','aColorUranus','aColorNeptune',];
	var tColor = ['tColorSun','tColorMercury','tColorVenus','tColorEarth','tColorMars','tColorJupiter','tColorSaturn','tColorUranus','tColorNeptune',];
	var dColorSpace = ['dColorSpaceSM','dColorSpaceMV','dColorSpaceVE','dColorSpaceEM','dColorSpaceMJ','dColorSpaceJS','dColorSpaceSU','dColorSpaceUN',];
	var aColorSpace = ['aColorSpaceSM','aColorSpaceMV','aColorSpaceVE','aColorSpaceEM','aColorSpaceMJ','aColorSpaceJS','aColorSpaceSU','aColorSpaceUN',];
/*
	var bodiesColor = [];
	$('.body').each(function() {
		bodiesColor.push($(this).css('background-color'));
	});
	
	var destinationButtons = [];
	$('.destination div').each(function() {
		destinationButtons.push($(this));
	});
	
	for (i = 0; i < bodiesColor.length; i++) {
		destinationButtons[i].css('background-color',bodiesColor[i]);
		}
	
	var destinationButtonsColors = [];
	
	for (i = 0; i < bodiesColor.length; i++) {
		
	}
*/
	
	var lastDestinationClicked = "";
	var precise = false;
	var help = true; // not used anymore
		
	
	
	
	
/////////////////////////  Initialize  /////////////////////////

	setAestheticMode();
		
/*
	if(!$.cookie('userMode') == 'play') {
		$.cookie('userMode', 'learn', {expires : 30});
		alert('cookie is set');
	} else {
		alert('cookie failed to launch');
	}
*/
	
/*
	if(!localStorage.userMode) {
		localStorage.userMode = "learn";
		$('.darken').css('display','block');
		$('.userModeBox').css({
			'display' : 'block',
		});
	} else {
		alert('this didn\'t work');
	}
*/
	
	
/////////////////////////  Control Panel  /////////////////////////

	// Open & close
	$('.controls h3').click(function() {
		$(this).next().slideToggle(250);
	});
	
// Destination

	// Add Flag
	$('div.destination div').click(function() {
		var q = $(this).next().next().next().next().next().next().next().next().next();
		$(this).addClass('active');
		$('div.destination div').not(this).removeClass('active');
		$('div.destination div').not('.active').addClass('gray', 175);
		$('div.destination > a').not(q).removeClass('active');
		q.addClass('active');
		$('div.destination > a').not(q).animate({'color' : '#cbcbcb'}, 175);
	});

	// Desaturate	
	$('.destination div').addClass('gray');
	$('.destination > a').css('color','#cbcbcb');
	
	// Make the Sun Active
	$('.destination div:first').addClass('active').removeClass('gray');
	$('.destination > a:first').addClass('active').css({'color' : '#7f7f7f'});
	
	// Stay saturated on click
	$('.destination div').on('click hover', function() {
		$(this).removeClass('gray');
	});
	
	// Saturate on hover
	$('.destination div').hover(function() {
		$(this).removeClass('gray');
		$(this).next().next().next().next().next().next().next().next().next().animate({'color' : '#7f7f7f'}, 0);
	}, function() {
		if (!$(this).hasClass('active')) {
			$(this).addClass('gray', 175);
			$(this).next().next().next().next().next().next().next().next().next().animate({'color' : '#cbcbcb'}, 175);
		}
	});
	
// Velocity

	highlightBlue();
	
	// Stepper colors
	
	$('.velocity .steppers div, .velocity .presets div').not('.lcd').hover(function() {
		$(this).addClass('blue');
	}, function() {
		$('.velocity .steppers div, .velocity .presets div').not('.lcd, .active').removeClass('blue');
	});
	$('.velocity .steppers div, .velocity .presets div').on('click hover', function() {
		highlightBlue ();
	});
	
// Scale

	$('.scale .steppers div').not('.lcd').hover(function() {
		$(this).addClass('red');
	}, function() {
		$(this).not('.lcd').removeClass('red');
	});
	
// Options

	// Constrain Button
	$('.options > div').on('click hover', function() {
		if ($(this).children().hasClass('constrain') && constrain == true) {
			$(this).addClass('green');
		} else if ($(this).children().hasClass('constrain') && constrain == false) {
			$(this).removeClass('green');
		}
	});
	
	// Obrital boundaries Button
	$('.options > div').on('click hover', function() {
		if ($(this).children().hasClass('orbitBoundaries') && $('.interplanetary_space_sm').hasClass('orbit_boundary')) {
			$(this).addClass('green');
		} else if ($(this).children().hasClass('orbitBoundaries') && !$('.interplanetary_space_sm').hasClass('orbit_boundary')) {
			$(this).removeClass('green');
		}
	});

	// Orbital Eccentricities Button
	$('.options > div').on('click hover', function() {
		if ($(this).children().hasClass('eccentricityButton')) {
			$(this).toggleClass('green');
		}
	});
	
	// LightGreen on hover
	$('.options > div').not('.triple').hover(function() {
		$(this).addClass('lightGreen');
	}, function() {
		$(this).removeClass('lightGreen');
	});

	// Colors Buttons
	$('.options div.triple div').css('background-color','white');
	$('.options div.triple div:first').css('background-color','hsla(57, 100%, 65%, 1)');
	$('.options div.triple div').click(function() {
		if ($(this).children().hasClass('dColor')) {
			$('.options div.triple div').css('background-color','white');
			$(this).css('background-color','hsla(57, 100%, 65%, 1)');
		} else if ($(this).children().hasClass('aColor')) {
			$('.options div.triple div').css('background-color','white');
			$(this).css('background-color','hsla(50, 100%, 50%, 1)');
		} else if ($(this).children().hasClass('tColor')) {
			$('.options div.triple div').css('background-color','white');
			$(this).css('background-color','hsla(0, 100%, 65%, 1)');
		}
	});
	
	// Help
	
/*
	$('.help').show();
	$('.helpButton').parent().addClass('green');
	$('.helpButton').click(function() {
		if(help == true) {
			$(this).parent().removeClass('green');
			$('.help').hide('blind', 500);
			help = false;
		} else if(help == false) {
			$(this).parent().addClass('green');
			$('.help').show('blind', 500);
			help = true;
		}
	});
	
	$('.tip').hover(function() {
		if(help == true) {
			$('.controls h3:nth-of-type(1)').hover(function() {
				$('.help .info').html('<p>Click to open the Destination panel</p><p>Click a planet to travel to it at the velocity chosen in the Velocity panel.</p>');
				$('.help').fadeIn();
				}, function() {
				$('.help').fadeOut();
			});
		}
	});
*/



/////////////////////////  Actions  /////////////////////////
	
	// Destination
		
	
	$('div.destination a').click(function(e) {
		if (precise == false) {
			travelToDestination(this);
		} else if (precise == true) {
			travelToDestinationPrecise(this);
		}
		lastDestinationClicked = this;
		e.preventDefault(); // necessary!
	});
	
	$('.controls h3 a.stop').click(function(e) {
		stopTraveling();
		e.stopPropagation();
	});

		
	// Velocity
		
	$('div.velocity a').click(function() {
		if (precise == false) {
			if($(this).hasClass('scaleSpeedSlowest')) {
				travelRate = kmsToMmpt(speedOfApollo10); // puts it in terms of Mm per sec
				if (lastDestinationClicked) {
					travelToDestination(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000))); // returns it to km per sec for the display
			} else if($(this).hasClass('scaleSpeedSlow')) {
				travelRate = kmsToMmpt(speedOfLightning);
				if (lastDestinationClicked) {
					travelToDestination(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedNormal')) {
				travelRate = kmsToMmpt(speedOfLight);
				if (lastDestinationClicked) {
					travelToDestination(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedFast')) {
				travelRate = kmsToMmpt(speedOf60c);
				if (lastDestinationClicked) {
					travelToDestination(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedFaster')) {
				travelRate = kmsToMmpt(speedOfWarp9);
				if (lastDestinationClicked) {
					travelToDestination(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedFastest')) {
				travelRate = kmsToMmpt(speedOfWormHole);
				if (lastDestinationClicked) {
					travelToDestination(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedDown10')) {
				travelRate /= 10;
				if (lastDestinationClicked) {
					travelToDestination(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedDown2')) {
				travelRate /= 2;
				if (lastDestinationClicked) {
					travelToDestination(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('resetSpeed')) {
				travelRate = kmsToMmpt(speedOfLight);
				if (lastDestinationClicked) {
					travelToDestination(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedUp2')) {
				travelRate *= 2;
				if (lastDestinationClicked) {
					travelToDestination(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedUp10')) {
				travelRate *= 10;
				if (lastDestinationClicked) {
					travelToDestination(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			}
		} else if (precise == true) {
			if($(this).hasClass('scaleSpeedSlowest')) {
				travelRate = kmsToMmpt(speedOfApollo10); // puts it in terms of Mm per sec
				if (lastDestinationClicked) {
					travelToDestinationPrecise(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000))); // returns it to km per sec for the display
			} else if($(this).hasClass('scaleSpeedSlow')) {
				travelRate = kmsToMmpt(speedOfLightning);
				if (lastDestinationClicked) {
					travelToDestinationPrecise(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedNormal')) {
				travelRate = kmsToMmpt(speedOfLight);
				if (lastDestinationClicked) {
					travelToDestinationPrecise(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedFast')) {
				travelRate = kmsToMmpt(speedOf60c);
				if (lastDestinationClicked) {
					travelToDestinationPrecise(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedFaster')) {
				travelRate = kmsToMmpt(speedOfWarp9);
				if (lastDestinationClicked) {
					travelToDestinationPrecise(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedFastest')) {
				travelRate = kmsToMmpt(speedOfWormHole);
				if (lastDestinationClicked) {
					travelToDestinationPrecise(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedDown10')) {
				travelRate /= 10;
				if (lastDestinationClicked) {
					travelToDestinationPrecise(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedDown2')) {
				travelRate /= 2;
				if (lastDestinationClicked) {
					travelToDestinationPrecise(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('resetSpeed')) {
				travelRate = kmsToMmpt(speedOfLight);
				if (lastDestinationClicked) {
					travelToDestinationPrecise(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedUp2')) {
				travelRate *= 2;
				if (lastDestinationClicked) {
					travelToDestinationPrecise(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			} else if($(this).hasClass('scaleSpeedUp10')) {
				travelRate *= 10;
				if (lastDestinationClicked) {
					travelToDestinationPrecise(lastDestinationClicked);
				}
				$('div.velocity').prev().children().children().text(numberWithCommas(Math.round(travelRate * 1000)));
			}
		}
	});
	
	// Body Scale
	
	$('div.scale a').click(function() {
		if(!constrain) {
			if($(this).hasClass('scaleBodyDown10')) {
				bodyScaleFactor /= 10;
			} else if($(this).hasClass('scaleBodyDown2')) {
				bodyScaleFactor /= 2;
			} else if($(this).hasClass('resetBodyScale')) {
				bodyScaleFactor = 1/1000;
			} else if($(this).hasClass('scaleBodyUp2')) {
				bodyScaleFactor *= 2;
			} else if($(this).hasClass('scaleBodyUp10')) {
				bodyScaleFactor *= 10;
			}
			changeBodyScale();
			displayBodyScale();
		} else if (constrain) {
			if($(this).hasClass('scaleBodyDown10')) {
				bodyScaleFactor /= 10;
				spaceScaleFactor /= 10;
			} else if($(this).hasClass('scaleBodyDown2')) {
				bodyScaleFactor /= 2;
				spaceScaleFactor /= 2;
			} else if($(this).hasClass('resetBodyScale')) {
				bodyScaleFactor = 1/1000;
				spaceScaleFactor = 1/1000;
			} else if($(this).hasClass('scaleBodyUp2')) {
				bodyScaleFactor *= 2;
				spaceScaleFactor *= 2;
			} else if($(this).hasClass('scaleBodyUp10')) {
				bodyScaleFactor *= 10;
				spaceScaleFactor *= 10;
			}
			changeBodyScale();
			displayBodyScale();
			changeSpaceScale();
			displaySpaceScale();
		}
	});	
	



	// Space Scale

	$('div.scale a').click(function() {
		if (!constrain) {
			if($(this).hasClass('scaleSpaceDown10')) {
				spaceScaleFactor /= 10;
			} else if($(this).hasClass('scaleSpaceDown2')) {
				spaceScaleFactor /= 2;
			} else if($(this).hasClass('resetSpaceScale')) {
				spaceScaleFactor = 1/1000;
			} else if($(this).hasClass('scaleSpaceUp2')) {
				spaceScaleFactor *= 2;
			} else if($(this).hasClass('scaleSpaceUp10')) {
				spaceScaleFactor *= 10;
			}
			stopTraveling();
			changeSpaceScale();
			displaySpaceScale();
			setEccentricity();
		} else if (constrain) {
			if($(this).hasClass('scaleSpaceDown10')) {
				spaceScaleFactor /= 10;
				bodyScaleFactor /= 10;
			} else if($(this).hasClass('scaleSpaceDown2')) {
				spaceScaleFactor /= 2;
				bodyScaleFactor /= 2;
			} else if($(this).hasClass('resetSpaceScale')) {
				spaceScaleFactor = 1/1000;
				bodyScaleFactor = 1/1000;
			} else if($(this).hasClass('scaleSpaceUp2')) {
				spaceScaleFactor *= 2;
				bodyScaleFactor *= 2;
			} else if($(this).hasClass('scaleSpaceUp10')) {
				spaceScaleFactor *= 10;
				bodyScaleFactor *= 10;
			}
			stopTraveling();
			changeSpaceScale();
			displaySpaceScale();
			changeBodyScale();
			displayBodyScale();
			setEccentricity();
		}
	});	



/////////////////////////  Options  /////////////////////////
	
	// Constrain Scales
	
	$('.options .constrain').click(function() {
		if (!constrain) {
			constrain = true;
			bodyScaleFactor = spaceScaleFactor;
			changeBodyScale();
			displayBodyScale();
		} else if (constrain) {
			constrain = false;			
		}
	});
	
	// Orbital Boundaries
	
		// initialize first
	for (i = 0; i < bodiesId.length; i++) {
		bodiesId[i].addClass(dColor[i], 500);
	}
	for (i = 0; i < spaceId.length; i++) {
		spaceId[i].addClass(dColorSpace[i], 500);
	}
	$('.destination div').each(function(i) {
		$(this).addClass(dColor[i], 500);
	});
	
		// now toggle on and off by removing the "clear background" class
	$('.options .orbitBoundaries').click(function() {
		$('.solar_system > div').toggleClass('orbit_boundary', 500);
	});
	
		
	// Orbital Eccentricities
	
	setEccentricity();
		
	$('.options .eccentricityButton').click(function() {
		$('.eccentricity').toggle('fade', 500);
		setEccentricity();
	});
	
	// Colors
	
	// I need to make this function thing work and learn how to do it
/*
	$('.options .dColor').click(function() {
		changeColor(dColor[i],aColor[i],tColor[i],dColorSpace[i],aColorSpace[i]);
		$('body').removeClass('black', 500);
	});
	$('.options .aColor').click(function() {
		changeColor(aColor[i],dColor[i],tColor[i],aColorSpace[i],dColorSpace[i]);
		$('body').removeClass('black', 500);
	});
	$('.options .tColor').click(function() {
		changeColor(tColor[i],dColor[i],aColor[i],aColorSpace[i],dColorSpace[i]);
		$('body').addClass('black', 500);
	});
*/


	$('.options .dColor').click(function() {
		colors = 'distinct';
		changeColors();
	});
	$('.options .aColor').click(function() {
		colors = 'accurate';
		changeColors();
	});
	$('.options .tColor').click(function() {
		colors = 'texture';
		changeColors();
	});
	
	// Precise Mode
	
	$('.options a.preciseButton').click(function() {
		if (precise == false) {
			setPreciseMode();
			$(this).parent().toggleClass('green', 500);
			precise = true;
		} else if (precise == true) {
			setAestheticMode();
			$(this).parent().toggleClass('green', 500);
			precise = false;
		}
	});

	// Tutorial
	
	// not complete.
/*
	$('.options a.helpButton').click(function() {
		console.log('worked');
		if(siteMode = 'instrument') {
			siteMode = 'tutorial';
			spaceScaleFactor = 1/1000;
			bodyScaleFactor = 1/1000;
			travelRate = speedOfWormHole;
			precise = false;
			colors = 'distinct';
			lastDestinationClicked = '<a href="#sun"></a>';
			progress = 0;
			stopTraveling();
			changeSpaceScale();
			displaySpaceScale();
			changeBodyScale();
			displayBodyScale();
			travelToDestination(lastDestinationClicked);
			setEccentricity();
			changeColors();
			setAestheticMode();
		} else if(siteMode = 'tutorial') {
			$('.commentary').slideUp(400);
			siteMode = 'instrument';
		}
	});
*/




///////////////////////////////////////////// Tutorial //////////////////////////////////////////////






	var progress = 0;
	var siteMode = 'instrument';
	
	$('body').prepend('<div class="commentary"><p></p></div>');
	$('.commentary p').html('Is this your first time here? Do you think this website is broken? Try taking a quick tutorial of how it works. Whatever you do, <span class="goal">DO NOT</span> underestimate the vastness of space. <div class="buttons"><button class="teach">Tutorial</button><button class="skip">Dismiss</button></div>');
		
	$('.skip').click(function() {
		$('.commentary').slideUp(400);
		siteMode = 'instrument';
	});
	$('.teach').click(function() {
		$('.commentary p').html('Great! This will only take a few minutes and you\'ll have fun doing it. Let\'s start by traveling somewhere. You can <span class="goal">scroll</span> left or right by using your mouse, trackpad, or the bottom scroll bar.');
		flash();
		siteMode = 'tutorial';
		$('h3').hide();
		$(window).scroll(function() {
			var position = $(document).scrollLeft();
			if(progress == 0 && position > 1000) {
				$('.commentary p').html('Looking good. Scroll as far as you like. With a keen eye, You\'ll see planets zip by now and then but, it may suit you better to <span class="goal">choose a destination</span> from the control panel at the top right. Open it by clicking "Destination" then select where you want to go.');
				flash();
				$('h3:nth-of-type(1)').delay(1000).fadeIn(400);
				progress = 1;
			}
		});		
	});
	
	$('.destination > div').click(function() {
		if(progress == 1) {
			$('.commentary p').html('Here we go. We\'re flying on autopilot now. If all you see is a gray screen, it\'s because space is mostly empty and extremely vast! But you can usually tell that you\'re moving by paying attention to the scroll bar. The flashing stop button also clues you in (which, as you might have guessed, will bring you to a stop if you click it). This trip could take a while though...see the new <span class="goal">Velocity panel</span>? Click it.');
			flash();
			$('h3:nth-of-type(2)').delay(3000).fadeIn(400);
			progress = 2;
		}
	});
	$('h3:nth-of-type(2)').click(function() {
		if(progress == 2) {
			$('.commentary p').html('The default speed you travel is the speed of light. That\'s many thousands of times faster than the fastest speed humans have ever attained. But when traversing interplanetary space in a web browser it tends to try our patience. Pick up the pace and multiply your current speed by using the <span class="goal">2x</span> or <span class="goal">10x steppers</span>. Or just choose a preset speed below the steppers. Remember, all velocities faster than Light are not realistic.');
			flash();
			progress = 3;
		}
	});
	$('.velocity div').not('.lcd').click(function() {
		if(progress == 3) {
			$('.commentary p').html('Much better. As you may have seen, you can change you\'re velocity mid-travel. If for some reason you pressed stop before reaching a destination, choosing a velocity resumes your trip at the selected speed. Ok, we\'ve bent time with the Velocity panel, now we\'re ready to warp space with the <span class="goal">Scale panel</span>. This demonstration is probably most effective if you travel back to the Sun first, but it will work no matter where you are. Give the Scale panel a click when you\'re ready.');
			flash();
			$('.scale .steppers:nth-of-type(2)').hide();
			$('h3:nth-of-type(3)').delay(3000).fadeIn(400);
			progress = 4;
		}
	});
	$('h3:nth-of-type(3)').click(function() {
		if(progress == 4) {
			$('.commentary p').html('There are two ways you can change the scale of the Solar System but right now we\'re only focusing on one. Using the steppers to change the <span class="goal">Body Scale</span> increases or decreases only the diameter of the planetary bodies. The distances between them are left unchanged. Unless you\'re using a very large monitor, the Sun is likely too big to fit on screen. Try decreasing its size.');
			flash();
			progress = 5;
		}
	});
	$('.scale .steppers:nth-of-type(1) div:nth-of-type(1), .scale .steppers:nth-of-type(1) div:nth-of-type(2)').click(function() {
		if(progress == 5) {
			$('.commentary p').html('That did it! Keep in mind this decreases all the bodies of the Solar System by the same factor. Some may be too small to see now. When you\'re ready, <span class="goal">reset</span> the Body Scale by pressing the associated black button and we\'ll continue.');
			flash();
			progress = 6;
		}
	});
	$('.scale .steppers:nth-of-type(1)').click(function() {
		if(progress == 6 && bodyScaleFactor < 0.0011 && bodyScaleFactor > 0.0009 ) {
			$('.commentary p').html('The other way we can manipulate the scale of the Solar System is by changing the distances between the center points of each body. Try decreasing interplanetary space by a factor of 1000 by clicking the 0.1x <span class="goal">Space Scale</span> button three times.');
			flash();
			$('.scale .steppers:nth-of-type(2)').delay(3000).fadeIn(400);
			progress = 7;
		}
	});
	$('.scale .steppers:nth-of-type(2)').click(function() {
		if(progress == 7 && spaceScaleFactor < 0.0000011 && spaceScaleFactor > 0.0000009) {
			$('.commentary p').html('How about that? Now you can more easily compare the sizes and distances between objects in our Solar System while keeping their relative proportions constant. Go wild! Scale Solar System bodies and distances to your every whim! When you\'ve had your fill, open the <span class="goal">Options panel</span>.');
			flash();
			$('h3:nth-of-type(4)').delay(3000).fadeIn(400);
			progress = 8;
		}
	});
	$('h3:nth-of-type(4)').click(function() {
		if(progress == 8) {
			$('.commentary p').html('Now try constraining Body Scale and Space Scale by clicking the <span class="goal">Constrain Scales</span> button. Your current Space Scale will be preserved but your Body Scale will increase or decrease to match it. Now it doesn\'t matter which steppers you use to change the scale - changing one will automatically change the other by the same amount.');
			flash();
			progress = 9;
		}
	});
	$('.options a.constrain').parent().click(function() {
		if(progress == 9) {
			$('.commentary p').html('This produces a zooming effect when you change the scale. As you can quickly tell, the size of the planets are so tiny compared to the distances between them that this mode seems almost useless for <em>viewing</em> the Solar System. This is where the <span class="goal">Orbital Boundaries</span> button comes in handy. Press it.');
			flash();
			progress = 10;
		}
	});
	$('.options a.orbitBoundaries').parent().click(function() {
		if(progress == 10) {
			$('.commentary p').html('Now it doesn\'t matter how small we\'ve scaled the Solar System bodies down, we can see the boundary of their orbits represented by changes in color. This setting is particularly usefull while traveling long distances when zoomed in as otherwise the planets might zip by without us noticing. But these boundaries only represent average distances from the Sun (semi-major axes to be precise). Click the <span class="goal">Orbital Eccentricities</span> button next.');
			flash();
			progress = 11;
		}
	});
	$('.options a.eccentricityButton').parent().click(function() {
			$('.commentary p').html('Planets orbit our central star along elliptical paths bringing them closer to or further from the Sun at any given time throughout their period. The darkened overlays which this button makes visible show the variance in orbital boundary of each planet. You\'ll want to turn off <span class="goal">Constrain Scales</span>, <span class="goal">Orbital Boundaries</span> and <span class="goal">Orbital Eccentricites</span> for the next part (though outside of this tutorial it isn\'t necessary). Turn off all three of them now.');
			flash();
			progress = 12;
	});
	$('.options div').click(function() {
		// In reality, you don't have to turn off Boundaries and Eccentricities...it's more of a suggestion :)
		if(progress == 12 && constrain == false){
			$('.commentary p').html('See the three small buttons that make up the word <span class="goal">Co-lo-rs</span>? The first one applies a color scheme made up of very distinct and bright colors. The second applies a more accurate color scheme based on the true (but not exact) average colors of the planets and Sun. The last replaces solid colors with processed images of the Solar System. Try them out (scaling the Solar System as needed). When you\'re done turn on <span class="goal">Precision Mode</span>.');
			flash();
			progress = 13;
		}
	});
	$('.options a.preciseButton').parent().click(function() {
		if(progress == 13 && precise == true) {
			$('.commentary p').html('When traveling in Precsision Mode the destination body\'s center point is placed exactly on the left edge of the browser window which makes durations perfectly accurate no matter what (otherwise durations become increasingly inaccurate as space is scaled down). You might try traveling from the Sun to the Earth at various space scales at the velocity of 60c (60 times the speed of light) and note that it always takes just over 8 seconds each time. <span class="goal">Click anywhere</span> on this paragraph to continue.');
			flash();
			progress = 14;
		}
	});
	$('.commentary').click(function() {
		if(progress == 14) {
			$('.commentary p').html('Aside from some shameless advertising of a couple of books I wrote, that\'s it! Have fun traveling throughout the Solar System and appreciating it\'s <span class="goal">immensity</span>! <button class="skip">Dismiss</button>');
			flash();
			$('.skip').click(function() {
				$('.commentary').slideUp(400);
				siteMode = 'instrument';
			});
		}
	});

	
/////////////////////////////// Browser Sniffing... ////////////////////////////////////
	
	var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(e){for(var t=0;t<e.length;t++){var n=e[t].string;var r=e[t].prop;this.versionSearchString=e[t].versionSearch||e[t].identity;if(n){if(n.indexOf(e[t].subString)!=-1)return e[t].identity}else if(r)return e[t].identity}},searchVersion:function(e){var t=e.indexOf(this.versionSearchString);if(t==-1)return;return parseFloat(e.substring(t+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};BrowserDetect.init()	
	
	if(BrowserDetect.browser != 'Safari') {
		$('.controls').append('<div class="browser"><p>This site works best in Safari on a Mac. Neptune, in<br>particular, may misbehave in other browsers. Click to dismiss.</p></div>');
	}
	$('.browser').click(function() {
		$(this).slideUp(900, 'easeOutQuart');
	});
	
});