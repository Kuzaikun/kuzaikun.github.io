(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space
////////////////////////////////////////////////////////////////////
if (count > 3) {
    //Nested function evaluates paginator
    debugMsg('Mayor que tres');
    if (paginatorVar == 'true') {
        debugMsg('Paginador activo');
        //It's true, so only will display the next values
        forJSON(1, count, JSONResponse);
        nextMsg('POST_INTEGRATION_MESSAGE');
    } else {
        //It's false, so will display 0 to 3 values
        debugMsg('Paginador no activo');
        forJSON(0, 3, JSONResponse);
        //Now the Paginator status need to be upgrade
        setVar('paginatorVar', 'true');
        nextMsg('PAGINATOR_OPTIONS');
    }
    //End of nested functions
} else {
    //If counter is less than 3 options, show all response
    debugMsg('Menor que tres');
    forJSON(0, counterTipoServicio, JSONResponse);
}
