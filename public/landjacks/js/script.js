$(document).ready(function() {

	// Shuffle function acquired from the world wide web
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
	
	// This should not have to be another function. It should be combined with display flags...
	function fillBackground(x) {
		for (var i in x) {
			// Display a flags in background
			$(".background").append("<img src='https://s3-us-west-1.amazonaws.com/lazy-rama/landjacks/img/flags/" + x[i].nation + ".svg' class='bg'>");
		}
	}
	
	function loadGallery(x) {
		$("#content").load("landjacks/gallery.html");
		$("nav a").removeClass("active");
		x.addClass("active");
		
    	// Display each flag
    	displayFlags(shuffledCountries);
    	
		// Show the initial random first flag
		displaySelectedFlag($(".nation:first"));

		// Display the selected flag on click
	 	$(".nation").click(function() {
			displaySelectedFlag($(this));
		});
		
		trayResize();	// these are necessary for when the user goes to list view and then back to gallery view cause its not technically "loading"
		determineTrayPos();
    
	    // Upon window load and resize...
		$(window).off();
	    $(window).on("load resize", function() {
		    trayResize();
		    determineTrayPos();
	    });
	    
	    // Upon window resize and scroll...
	    $(window).on("resize scroll", function() {
		    paginationRight();
		    paginationLeft();
	    });
	    
	    // upon clicking left and right arrow buttons, paginate
		$(".right").click(function() {
			$(".nation_tray").animate({
				"left" : "-=" + paginationRight()
			},{
				duration: 500,
				easing: "swing",
				queue: false
			});
		});
		$(".left").click(function() {
			$(".nation_tray").animate({
				"left" : "+=" + paginationLeft()
			},{
				duration: 500,
				easing: "swing",
				queue: false
			});
		});
	
	}
	
	function loadList(x) {
		$("#content").load("landjacks/list.html");
		$("nav a").removeClass("active");
		x.addClass("active");
		
		displayListFlags(countries);
		flagHeight();
		
		$(window).off();
		$(window).on("resize", flagHeight);
	}

	// Display flag thumbnails and size tray
	function displayFlags(x) {
		for (var i in x) {
			// Display a flag in the tray
			var prettyName = x[i].nation.replace(/_/g, " ");
			$(".nation_tray").append("<a href='javascript:;' id='" + x[i].nation + "' class='nation scrollable' title='" + prettyName + "'><img src='https://s3-us-west-1.amazonaws.com/lazy-rama/landjacks/img/flags/" + x[i].nation + ".svg' class='scrollable'></a>");
			// Add the widths plus the margins
			
			var flagRatio = x[i].meta.width / x[i].meta.height;
			var flagWidth = Math.ceil( flagRatio * 100 + 4);
			jsTrayWidth += flagWidth;
						
		}		
		$(".nation_tray").css("width" , jsTrayWidth + 2);	// +2 as an added little buffer for rounding errors (only +1 is required though).
	}

	function trayResize() {
		var maskWidth = $(".thumbs_container").width() - 2 * 23;
		$(".nation_mask").css("width" , maskWidth);
	}
	
	function determineTrayPos() {
/* 	    var nationDisplayWidth = $(".nation_display").css("width"); */
	    var nationDisplayHeight = $(window).height() - $("nav").outerHeight(true) - $(".thumbs_container").outerHeight(true) - 2; // minus 2 for margin
	    $(".nation_display").css("height", nationDisplayHeight);
/*
	    if ($(window).width() <= 520) {
		    $(".nation_display").css("height" , nationDisplayWidth);
	    } else if ($(window).width() > 520 && $(window).width() < 1074) {	// was 1120
		    $(".nation_display").css("height" , 500);
	    } else {
		    $(".nation_display").css("height", nationDisplayHeight);
	    }
*/
	}
	
	function paginationRight() {
	
		// For clicking the right arrow button
		$(".left").css("opacity" , 1);
		var hiddenTray = ( $(".nation_tray").offset().left + $(".nation_tray").width() ) - $(".right").offset().left;
		var rightButtonDist = $(".right").offset();
		var scroll = $(document).scrollTop();
		var rightTargetElem = document.elementFromPoint(rightButtonDist.left - 5 , rightButtonDist.top + 5 - scroll);
		if ( ! $(rightTargetElem).hasClass("scrollable") ) {
			return 0;
		} else {
			var posOfRightTargetElem = $(rightTargetElem).offset().left;
			var distToScrollRight = posOfRightTargetElem - $(".left").offset().left - $(".left").width() - 4;		//the "4" preserves the correct margin
			if ( hiddenTray < Math.abs(distToScrollRight) ){
				distToScrollRight = hiddenTray;
				$(".right").css("opacity" , 0.3);
				return distToScrollRight;
			} else {
				return distToScrollRight;
			}
		}
	}
	
	function paginationLeft() {
		
		// For clicking the left arrow button
		$(".right").css("opacity" , 1);
		var hiddenTray = $(".nation_tray").offset().left;
		var leftButtonDist = $(".left").offset();
		var scroll = $(document).scrollTop();
		var leftTargetElem = document.elementFromPoint(leftButtonDist.left + $(".left").width() + 5 , leftButtonDist.top + 5 - scroll);
		if ( ! $(leftTargetElem).hasClass("scrollable") ) {
			return 0;
		} else {
			var posOfLeftTargetElem = $(leftTargetElem).offset().left + $(leftTargetElem).width();
			var distToScrollLeft = $(".right").offset().left - posOfLeftTargetElem - 4;		//the "4" preserves the correct margin
			if ( Math.abs(hiddenTray) < Math.abs(distToScrollLeft) ){
				distToScrollLeft = hiddenTray + leftButtonDist + $(".left").width() + 4;
				$(".left").css("opacity" , 0.3);
				return distToScrollLeft;
			} else {
				return distToScrollLeft;
			}
		}
	}
	
	function displaySelectedFlag(x) {
		var flagName = x.attr("id");
		var matchedNation = null;
		for (i in shuffledCountries) {
			if (shuffledCountries[i].nation == flagName) {
				matchedNation = shuffledCountries[i];
				break;
			} else {
				continue;
			}
		}
		var prettyName = matchedNation.nation.replace(/_/g, " ");
		$(".nation_display .nation_large_flag, .nation_display .nation_info").empty();
		$(".nation_display .nation_large_flag").append("<img src='https://s3-us-west-1.amazonaws.com/lazy-rama/landjacks/img/flags/" + matchedNation.nation + ".svg' class='big' title='" + prettyName + "'>");
		$(".nation_display .nation_info").append("<h2 title='nation'>" + prettyName + "</h2>");
		$(".nation_display .nation_info").append("<p class='nation_name' title='continent'>" + continentDict[matchedNation.meta.continent] + "</p>");
		$(".nation_display .nation_info").append("<p class='proportion' title='proportions'>" + matchedNation.meta.height + ":" + matchedNation.meta.width + "</p>");
	}
	
	// Display flags for list mode
	function displayListFlags(x) {
		for (var i in x) {
			// Display each flag
			var prettyName = x[i].nation.replace(/_/g, " ");
			$("section").append("<a href='javascript:;' id='" + x[i].nation + "' class='list_item' title='" + prettyName + "'><div class='flag'><img src='https://s3-us-west-1.amazonaws.com/lazy-rama/landjacks/img/flags/" + x[i].nation + ".svg'></div><div class='info'><h2>" + prettyName + "</h2><p>" + continentDict[x[i].meta.continent] + "</p><p>" + x[i].meta.height + ":" + x[i].meta.width + "</p></div></a>");
		}
		$("section").append("<div class='cf'></div>");		
	}
	
	// Size the flag heights in list mode
	function flagHeight() {
		var halfOfDiv = $(".flag").width() / 2;
		$(".flag img").css("height" , halfOfDiv);
	}
	
	var countries = [];
	var jsTrayWidth = 0;
	var continentDict = {NA: "North America", SA: "South America", EU: "Europe", AF: "Africa", AS: "Asia", OC: "Oceania"};
	
	// Get the data and store it
    $.ajaxSetup({
        async: false
    });
    $.getJSON("landjacks/js/flags.json", function(data) {
    	$(data.flags).each(function(i) {
		    countries.push(data.flags[i]);
    	});		
	});
	var shuffledCountries = countries.slice();    // Shuffle the order of countries. MUST COME AFTER AJAX REQUEST!
	shuffle(shuffledCountries);
	
	// Dynamic background
	fillBackground(shuffledCountries);
	
	loadGallery($("nav a#loadGallery"));
	$(".left").css("opacity", 0.3);
	
	$("#loadGallery").click(function() {
		loadGallery($(this));
	});
	$("#loadList").click(function() {
		loadList($(this));
	});
	
});