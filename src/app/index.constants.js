(function ()
{
    'use strict';

    angular
        .module('fuse');

   //XXX AP: definisco costanti per il modulo
        .module('app.notes')  
        .constant('APPL_CONTEXT_URL', 'http://localhost:8080/DrtWeb/rest-api');

})();
