(function($){
  $(function(){

    $('.sidenav').sidenav();
	$('.tooltipped').tooltip();
	$('html').addClass('js');
		$(window).load(function() {
			$("#loader-wrapper").fadeOut();
		});
	
  }); // end of document ready
})(jQuery); // end of jQuery name space