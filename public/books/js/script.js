$(document).ready(function() {
    
    //alert($('div').length + " divs found (jQuery works).");
    
    $('tbody tr td:nth-child(4)').prepend(function() {
	    return '<a href="' + $(this).text() + '">' + 'Get info: ' + '</a>';
    });
    
    
    $('tbody tr td:nth-child(5)').prepend(function() {
	    return '<a href="' + $(this).text() + '">' + 'See image: ' + '</a>';
    });

	
	        
});