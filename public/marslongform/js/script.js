var directoryList = [
	["ESP_037235_1605", "Fluidized Ejecta Crater in Hadley Crater with Possible Phyllosilicates"],
	["ESP_037203_2555", "Polar Dunes Dubbed Hazar with Abundant Sand"],
	["PSP_001660_2570", "Frost-Covered Dunes in the North Polar Region"],
	["PSP_002542_1080", "Sand Dune Field in Richardson Crater"],
	["PSP_003273_1675", "Evros Vallis and Nearby Craters"],
	["ESP_037142_1430", "Chaos in Eridania Basin"],
	["PSP_004821_1985", "West Rim of Olympus Mons Caldera"],
	["ESP_013131_2110", "West-Facing Slope of a Crater West of Elysium Fossae"],
	["ESP_011292_1720", "Layering at Ganges Chasma"],
	["ESP_011408_0930", "Spiders in Variety of Terrains"],
	["ESP_011842_0980", "Starburst Spider"],
	["ESP_016641_2500", "Polygonal Patterned Ground"],
	["ESP_028575_1890", "Continual Dune and Ripple Migration in Nili Patera"],
	["ESP_020243_1670", "Well-Preserved 34-Kilometer Diameter Crater in Noachis Terra"],
	["ESP_012730_2025", "Well-Preserved 8 Kilometer Diameter Impact Crater with Central Peak"],
	["ESP_011909_1320", "Sand Dunes and Ripples in Proctor Crater"],
	["ESP_037545_1730", "A Light Toned Deposit in Arsinoes Chaos"],
	["ESP_037300_1825", "A Collection of Landforms in Eastern Elysium Planitia"],
	["ESP_013134_1610", "Central Structure of a Large Impact Crater"]
];
var numTriptics = directoryList.length;
var sectionCount = 1;
var articleCount = 0;					// 0 because I remove it later to make loadTripticSet work correctly...ugly...
var tripticsPerPage = 5;
var article = $("article").clone();		// I make a clone of a clone with this... :)
var speed = 100;
var lastClicked = "";
var noMoreImages = false;

// More easing functions
$.easing.jswing = $.easing.swing;
$.extend($.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert($.easing.default);
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});


function loadTripticSet(loadSection, num) {
	if (loadSection == true) {
		sectionCount += 1;
		$("<section class='section-" + sectionCount + "'></section>").insertAfter("section:last");
	} else {
		$("section").addClass("section-" + sectionCount);
		$("article").addClass("article-" + articleCount);
		$("section article").remove();		// ugh. This fixes the load five more only loading 4 more issue but I hate it.
	}
	for (i=1; i<=num; i++) {
		articleCount += 1;
		article.clone().appendTo(".section-" + sectionCount).addClass("article-" + articleCount);
	}
	$(".section-" + sectionCount + " article").each(function(i) {
		var theImage = directoryList[tripticsPerPage * (sectionCount - 1) + i];
		if (theImage) {
	/*
			console.log(tripticsPerPage + " * (" + sectionCount + " - 1) + " + i + " = " + ( tripticsPerPage * (sectionCount - 1) + i) );
			console.log(tripticsPerPage * (sectionCount - 1) + i);
	*/
			
			// The Title
			$(this).find("h2 a").text(theImage[1]);
			
			// The Images
			$(this).find(".left img").attr("src", "https://s3-us-west-1.amazonaws.com/lazy-rama/marslongform/img/triptics/" + theImage[0] + "/960x600_(thumb)/" + theImage[0] + "(1).jpg");
			$(this).find(".right img").attr("src", "https://s3-us-west-1.amazonaws.com/lazy-rama/marslongform/img/triptics/" + theImage[0] + "/960x600_(thumb)/" + theImage[0] + "(3).jpg");
			$(this).find(".middle img").attr("src", "https://s3-us-west-1.amazonaws.com/lazy-rama/marslongform/img/triptics/" + theImage[0] + "/960x600_(thumb)/" + theImage[0] + "(2).jpg");
			
			// The Links
			var externalLink = "http://www.uahirise.org/" + theImage[0];
			$(this).find("h2 a").attr("href", externalLink).attr("title", externalLink);
/* 			$(this).find("h2 a").append(" <span class='small'>" + externalLink + " &#10142;</span>"); */
			$(this).find(".triptic > div").each(function(i) {
				var order = [1, 3, 2];
				$(this).find(".sizes a:nth-of-type(1)").attr("href", "https://s3-us-west-1.amazonaws.com/lazy-rama/marslongform/img/triptics/" + theImage[0] + "/1920x1080_(HD)/" 	+ theImage[0] + "(" + order[i] + ").jpg");
				$(this).find(".sizes a:nth-of-type(2)").attr("href", "https://s3-us-west-1.amazonaws.com/lazy-rama/marslongform/img/triptics/" + theImage[0] + "/2560x1440_(27in)/" 	+ theImage[0] + "(" + order[i] + ").jpg");
				$(this).find(".sizes a:nth-of-type(3)").attr("href", "https://s3-us-west-1.amazonaws.com/lazy-rama/marslongform/img/triptics/" + theImage[0] + "/2880x1800_(rMBP)/" 	+ theImage[0] + "(" + order[i] + ").jpg");
				$(this).find(".sizes a:nth-of-type(4)").attr("href", "https://s3-us-west-1.amazonaws.com/lazy-rama/marslongform/img/triptics/" + theImage[0] + "/3840x2160_(4K)/" 	+ theImage[0] + "(" + order[i] + ").jpg");
				$(this).find(".sizes a:nth-of-type(5)").attr("href", "https://s3-us-west-1.amazonaws.com/lazy-rama/marslongform/img/triptics/" + theImage[0] + "/5120x2880_(5K)/" 	+ theImage[0] + "(" + order[i] + ").jpg");
			});
		} else {
			$(".load-more").hide();
			$(".article-" + (i + 1 + (sectionCount - 1) * tripticsPerPage)).remove();	// Yikes, this is ugly. So ugly.
			noMoreImages = true;
		}
	});
	openTriptic();
}
function keepScrollPos(x, y) {
	if (x.offset().top < y.offset().top) {
		console.log("The current one is above the last one!!! curr:" + x.offset().top + " vs " + "last:" + lastClicked.offset().top);
	    $('html,body').animate({
	        scrollTop: $(window).scrollTop() + 48
	    }, speed)
	} else {
		console.log("The current one is below the last one!!! curr:" + x.offset().top + " vs " + "last:" + lastClicked.offset().top);
	    $('html,body').animate({
	        scrollTop: $(window).scrollTop() - 165
	    }, speed)
	}
}
function placeAtTop(x, y) {
	$("html, body").animate({
		scrollTop : x.offset().top - parseInt(x.css("margin-top"), 10) / 2
	}, y, "easeOutQuint");
}
function openTriptic() {
	$(".triptic img").on("click", function() {
		var target = $(this).closest(".triptic");
		if (target.siblings("h2").is(":visible")) {
			return;
		} else {
			$("h2").slideUp(speed);
			$(".sizes").slideUp(speed);
			target.siblings("h2").slideToggle(speed);
			target.find(".sizes").slideToggle(speed, function() {
				placeAtTop($(this).closest("article"), speed);
			});
/*
			if (lastClicked == "") {
				lastClicked = $(".section-1 .article-1");
			}
			keepScrollPos(target, lastClicked);
			lastClicked = target;
*/
		}
	});
}
function setHeaderImgSize() {
	var imgSize = "/960x600_(thumb)/";
	if (($(window).width() > 480 && $(window).width() <= 960) || ($(window).height() > 300 && $(window).height() <= 600)) {
		var imgSize = "/1920x1080_(HD)/";
	} else if ($(window).width() > 960 || $(window).height() > 600) {
		var imgSize = "/2560x1440_(27in)/";
	}
	var randomImg = directoryList[Math.floor(Math.random() * numTriptics)][0];
	var randomImgUrl = "url('https://s3-us-west-1.amazonaws.com/lazy-rama/marslongform/img/triptics/" + randomImg + imgSize + randomImg + "(" + Math.floor(Math.random() * 3 + 1) + ").jpg')";
	$("header").css("background-image", randomImgUrl);
}
/*
function mobileView(x) {
	if (x == true) {
		$(".triptic").addClass("swipe").attr("id", "slider").wrapInner("<div class='swipe-wrap'></div>");
		window.mySwipe = Swipe(document.getElementById('slider'));
	} else if (x == false) {
		console.log("too wide");
	}
}
*/

$(document).ready(function() {
	
	// Header
	$(window).on("resize load", function() {
		$("header").css("height", $(window).height());
	});
	setHeaderImgSize();
	$("header .down-arrow").on("click", function() {
		placeAtTop($("article:first"), 1300);
		$(".article-1 h2, .article-1 .sizes").delay(300).slideDown(speed*2);
	});
	
	// Load more button
/*
	$(".load-more").append("Load " + tripticsPerPage + " More");
	$(".load-more").on("click", function() {
		loadTripticSet(true, tripticsPerPage);
	});
*/

	// Load more triptics
	loadTripticSet(false, tripticsPerPage);

	
	$(window).on("load scroll resize", function() {
		var bottomOfWindow = $(window).scrollTop() + $(window).height();
		var bottomOfDocument = $(document).height();
/* 		console.log((bottomOfWindow + 400) + " =? " + bottomOfDocument); */
		if (bottomOfWindow + 400 >= bottomOfDocument && noMoreImages == false) {
			loadTripticSet(true, tripticsPerPage);
		}
/* 		$(".small").css("font-size", parseInt($("article h2").css("font-size"), 10) / 2); */
	});
	
	// Mobile view
/*
	$(window).on("load resize", function() {
		mobileView( $(window).width() < 400 ? true : false );
	});
*/
	
});