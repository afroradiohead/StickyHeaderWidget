$(document).ready(function(){
	var $window = $(window),
		$body = $("body"),
		$stickyHeader = $("#sticky-header"),
		stickyHeaderPosition = 0
		resizeTimeoutId = null;

	function determineStickyPosition() {
		var isSticky = checkIfSticky();

		if(isSticky) toggleSticky(false); //turn sticky off if needed
		
		stickyHeaderPosition = getStickyHeaderPosition(); //calculate stickyHeader height
		
		if(isSticky) toggleSticky(true); //turn sticky on if needed
	}

	function processStickiness(){
		if(getWindowScrollPosition() >= stickyHeaderPosition)
			toggleSticky(true);
		else
			toggleSticky(false);
	}

	function getStickyHeaderPosition() {
		return $stickyHeader.offset().top;
	}

	function getWindowScrollPosition() {
		return $window.scrollTop();
	}

	function checkIfSticky(){
		return $body.hasClass("sticky");
	}

	function toggleSticky(isOn){
		$body.toggleClass("sticky", isOn);
	}


	/*== Events== */
	
	if($stickyHeader.length) {
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

		$window.load(function() {
			determineStickyPosition();
			processStickiness();
		});		
	}

});