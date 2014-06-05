$(document).ready(function(){
	var $window = $(window),
		$body = $("body"),
		$stickyHeader = $("#sticky-header"),
		stickyOffsetTop = 0
		resizeTimeoutId = null;

	function determineStickyPosition() {
		$body.removeClass("sticky");
		stickyOffsetTop = $stickyHeader.offset().top;		
	}

	function processStickiness(){
		var scrollTop = $window.scrollTop();

		if(scrollTop >= stickyOffsetTop)
			$body.addClass("sticky");
		else
			$body.removeClass("sticky");
	}

	$window.on("scroll", function(e){
		processStickiness();
	});

	$window.on("resize", function(){
		clearTimeout(resizeTimeoutId);

		//decreases cycles for performance
		resizeTimeoutId = setTimeout(function(){
			determineStickyPosition();
			processStickiness();
		}, 10);
	});	

	determineStickyPosition();
	processStickiness();
});