
$(document).ready(function () {

	// OUTER-LAYOUT
	$('body').layout({
		center__paneSelector:	".outer-center"
			,	west__paneSelector:		".outer-west"
				//,	east__paneSelector:		".outer-east"
				,	west__size:				300
				//,	east__size:				125
				,	north__size:			80
				,	south__size:			30
				,	spacing_open:			8  // ALL panes
				//,   south__spacing_open:	5
				,	spacing_closed:			12 // ALL panes
				,	north__maxSize:			200
				//,	south__maxSize:			200
	});

});

