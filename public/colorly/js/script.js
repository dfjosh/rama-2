$(document).ready(function() {
    
    //alert($('div').length + " divs found (jQuery works).");
    
///////////////////////////////////// RGB to HSL ////////////////////////////////////
// Credit: http://www.easyrgb.com
    
	function rgb2hsl(R, G, B) {
		var_R = ( R / 255 )
		var_G = ( G / 255 )
		var_B = ( B / 255 )
		
		var_Min = Math.min( var_R, var_G, var_B )
		var_Max = Math.max( var_R, var_G, var_B )
		del_Max = var_Max - var_Min
		
		L = ( var_Max + var_Min ) / 2
		
		if ( del_Max == 0 )
		{
		   H = 0
		   S = 0
		}
		else
		{
		   if ( L < 0.5 ) S = del_Max / ( var_Max + var_Min )
		   else           S = del_Max / ( 2 - var_Max - var_Min )
		
		   del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max
		   del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max
		   del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max
		
		   if      ( var_R == var_Max ) H = del_B - del_G
		   else if ( var_G == var_Max ) H = ( 1 / 3 ) + del_R - del_B
		   else if ( var_B == var_Max ) H = ( 2 / 3 ) + del_G - del_R
		
		   if ( H < 0 ) H += 1
		   if ( H > 1 ) H -= 1
		}
		
		hslOut = [H, S, L];
		return hslOut;
	}

///////////////////////////////////// HSL to RGB ////////////////////////////////////
// Credit: http://www.easyrgb.com
	
	function hsl2rgb(H, S, L) {
		if ( S == 0 )
		{
		   R = L * 255
		   G = L * 255
		   B = L * 255
		}
		else
		{
		   if ( L < 0.5 ) var_2 = L * ( 1 + S )
		   else           var_2 = ( L + S ) - ( S * L )
		
		   var_1 = 2 * L - var_2
		
		   R = 255 * Hue_2_RGB( var_1, var_2, H + ( 1 / 3 ) ) 
		   G = 255 * Hue_2_RGB( var_1, var_2, H )
		   B = 255 * Hue_2_RGB( var_1, var_2, H - ( 1 / 3 ) )
		}
			
		rgbOut = [Math.round(R), Math.round(G), Math.round(B)];
		return rgbOut;
	}

	function Hue_2_RGB( v1, v2, vH )
	{
	   if ( vH < 0 ) vH += 1
	   if ( vH > 1 ) vH -= 1
	   if ( ( 6 * vH ) < 1 ) return ( v1 + ( v2 - v1 ) * 6 * vH )
	   if ( ( 2 * vH ) < 1 ) return ( v2 )
	   if ( ( 3 * vH ) < 2 ) return ( v1 + ( v2 - v1 ) * ( ( 2 / 3 ) - vH ) * 6 )
	   return ( v1 )
	}
	
///////////////////////////////////// RGB to HEX ////////////////////////////////////

	function rgb2hex(R, G, B) {
		
		if(R < 16) {
			var rHex = '0' + R.toString(16);		// Otherwise 10 = a instead of 0a for example
		} else {
			var rHex = R.toString(16);
		}
		if(G < 16) {
			var gHex = '0' + G.toString(16);
		} else {
			var gHex = G.toString(16);
		}
		if(B < 16) {
			var bHex = '0' + B.toString(16);
		} else {
			var bHex = B.toString(16);
		}
		
		var rgbHex = rHex + gHex + bHex;
		return rgbHex;
	}

///////////////////////////////////// HEX to RGB ////////////////////////////////////

	function hex2rgb(rH, gH, bH) {
		var R = parseInt(rH, 16);
		var G = parseInt(gH, 16);
		var B = parseInt(bH, 16);
		
		var hexRgb = [R, G, B];
		return hexRgb;
	}

///////////////////////////////////// HSL to HEX ////////////////////////////////////

	function hsl2hex(H, S, L) {
		var rgb = hsl2rgb(H, S, L);
		var hex = rgb2hex(rgb[0], rgb[1], rgb[2]);
		return hex;
	}

///////////////////////////////////// HEX to HSL ////////////////////////////////////

	function hex2hsl(rH, gH, bH) {
		var rgb = hex2rgb(rH, gH, bH);
		var hsl = rgb2hsl(rgb[0], rgb[1], rgb[2]);
		return hsl;
	}

///////////////////////////////////// Other Functions ////////////////////////////////////

	function outputFromHex(x) {
		$('input.hex').val('#' + x.toUpperCase());
		
		var rH = x.substring(0,2);
		var gH = x.substring(2,4);
		var bH = x.substring(4,6);
		var rgb = hex2rgb(rH, gH, bH);
		var rgbCSS = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
		$('input.rgb').val(rgbCSS);
		
		var hsl = rgb2hsl(rgb[0], rgb[1], rgb[2]);
		var hslWeb = [Math.round(hsl[0] * 360), Math.round(hsl[1] * 100), Math.round(hsl[2] * 100)];
		var hslCSS = 'hsl(' + hslWeb[0] + ', ' + hslWeb[1] + '%, ' + hslWeb[2] + '%)';
		$('input.hsl').val(hslCSS);
		
		$('.error').hide();
	}
	
	function sanitizeInput(a) {
		var inputClean = a.replace(/[^0-9]/g, ' ');
		var inputCleanArray = inputClean.split(' ');
		var inputCleanArray = inputCleanArray.filter(function(n){return n});
		for(i = 0; i < inputCleanArray.length; i++) {
			inputCleanArray[i] = parseInt(inputCleanArray[i], 10);
		}
		return inputCleanArray;
	}

///////////////////////////////////// Input Fields ////////////////////////////////////
		
	var withHaste = 150;	// Speed of animations

	$('form').submit(function(e) {			// Target the form (not input) when using submit
		if($(this).hasClass('hex')) {
			var input = $('input.hex').val();
			var inputClean = input.replace(/[^0-9A-F]/ig, '');
			if(inputClean.length == 6) {
				outputFromHex(inputClean);
				$('body').animate({'background-color' : '#' + inputClean}, withHaste);
			} else if(inputClean.length == 3) {
				var sixDigits = inputClean.split('');
				var sixDigits = '' + sixDigits[0] + sixDigits[0] + sixDigits[1] + sixDigits[1] + sixDigits[2] + sixDigits[2];
				outputFromHex(sixDigits); 
				$('body').animate({'background-color' : '#' + sixDigits}, withHaste);
			} else {
				$('.error').hide();
				$('<p class="error">Please enter a 3 or 6 digit hexadecimal value.</p>').insertAfter('input.hex');
			}
			e.preventDefault();
		} else if($(this).hasClass('rgb')) {
			var input = $('input.rgb').val();
			var inputCleanArray = sanitizeInput(input);
			if(inputCleanArray.length == 3 && inputCleanArray[0] <= 255 && inputCleanArray[0] >= 0 && inputCleanArray[1] <= 255 && inputCleanArray[1] >= 0 && inputCleanArray[2] <= 255 && inputCleanArray[2] >= 0) {
				$('body').animate({'background-color' : 'rgb(' + inputCleanArray + ')'}, withHaste);
				$('input.rgb').val('rgb(' + inputCleanArray[0] + ', ' + inputCleanArray[1] + ', ' + inputCleanArray[2] + ')');
				var hex = rgb2hex(inputCleanArray[0], inputCleanArray[1], inputCleanArray[2]);
				$('input.hex').val('#' + hex.toUpperCase());
				var hsl = rgb2hsl(inputCleanArray[0], inputCleanArray[1], inputCleanArray[2]);
				var hslWeb = [Math.round(hsl[0] * 360), Math.round(hsl[1] * 100), Math.round(hsl[2] * 100)];
				$('input.hsl').val('hsl(' + hslWeb[0] + ', ' + hslWeb[1] + '%, ' + hslWeb[2] + '%)');
				$('.error').hide();
			} else {
				$('.error').hide();
				$('<p class="error">Please enter a set of 3 integers, each between 0 and 255 inclusive, separated by spaces or commas or as a CSS property value.</p>').insertAfter('input.rgb');
			}
			e.preventDefault();
		} else if($(this).hasClass('hsl')) {
			var input = $('input.hsl').val();
			var inputCleanArray = sanitizeInput(input);
			if(inputCleanArray.length == 3 && inputCleanArray[0] <= 360 && inputCleanArray[0] >= 0 && inputCleanArray[1] <= 100 && inputCleanArray[1] >= 0 && inputCleanArray[2] <= 100 && inputCleanArray[2] >=0) {
				$('body').animate({'background-color' : 'hsl(' + inputCleanArray[0] + ',' + inputCleanArray[1] + '%,' + inputCleanArray[2] + '%)'}, withHaste);
				$('input.hsl').val('hsl(' + inputCleanArray[0] + ', ' + inputCleanArray[1] + '%, ' + inputCleanArray[2] + '%)');
				var hslPrepared = [parseFloat((inputCleanArray[0] / 360).toFixed(4), 10), parseFloat((inputCleanArray[1] / 100).toFixed(4), 10), parseFloat((inputCleanArray[2] / 100).toFixed(4), 10)];
				var rgb = hsl2rgb(hslPrepared[0], hslPrepared[1], hslPrepared[2]);
				$('input.rgb').val('rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')');
				var hex = hsl2hex(hslPrepared[0], hslPrepared[1], hslPrepared[2]);
				$('input.hex').val('#' + hex.toUpperCase());
				$('.error').hide();
			} else {
				$('.error').hide();
				$('<p class="error">Please enter a set of 3 integers, between 0-360, 0-100, and 0-100 respectively, separated by spaces or commas or as a CSS property value.</p>').insertAfter('input.hsl');
			}
			e.preventDefault();
		}
		
		
		var currentColor = $('input.hsl').val().split(',');
		if(parseInt(currentColor[2]) < 60) {
			$('p, h1, h2').animate({'color' : 'hsl(0, 0%, 100%)'}, withHaste);
			if(parseInt(currentColor[0]) < 50 || parseInt(currentColor[0]) > 300) {
				$('a').animate({'color' : 'hsl(208, 56%, 53%)'}, withHaste);
			} else {
				$('a').animate({'color' : 'hsl(0, 80%, 69%)'}, withHaste);
			}
		} else {
			$('p, h1, h2').animate({'color' : 'hsl(0, 0%, 10%)'}, withHaste);
			if(parseInt(currentColor[0]) > 160 && parseInt(currentColor[0]) < 270) {
				$('a').animate({'color' : 'hsl(0, 80%, 69%)'}, withHaste);
			} else {
				$('a').animate({'color' : 'hsl(208, 56%, 53%)'}, withHaste);
			}
		}
	});
	
	
	
		
/*
	var urlParts = location.pathname.split('?');
	console.log(urlParts);
	if(urlParts[parts.length - 1] == 'pop_out=true') {
		$('.pop_out').hide();
		console.log('yep');
	} else {
		console.log('nope');
	}
*/
    
    
    
/*
    $('.more').click(function() {
    	if($('.drawer').is(':visible')) {
	    	$('.more').text('more...');
    	} else {
	    	$('.more').text('less...');
    	}
	    $('.drawer').slideToggle(100);
    });
*/
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});

