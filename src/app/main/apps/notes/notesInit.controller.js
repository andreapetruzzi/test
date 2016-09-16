(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .controller('NotesInitController', NotesInitController);

    /** @ngInject */
    function NotesInitController(msNavigationService, $state)
    {
        
        //aggiungo dinamicamente al menu di sx
        msNavigationService.saveItem('apps.notes.notes2', {
            title : 'Notes2 dinamico',
            state : 'app.notes2'
        });

        $state.go("app.notes");
    }

})();