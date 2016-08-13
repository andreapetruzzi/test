(function ()
{
    'use strict';

    angular
        .module('app.notes', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        $stateProvider.state('app.notes', {
            url    : '/notes',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/apps/notes/notes.html',
                    controller : 'NotesController as vm'
                }
            },
            resolve: { /** @ngInject */
                Notes : function (NotesService)
                {
                    return NotesService.getData();
                },
                //XXX AP: aggiunto note e recuperate nel controller
                NotesCopy : function (msApi)
                {
                    return msApi.resolve('notes.notes2@get');
                },
                Labels: function (LabelsService)
                {
                    return LabelsService.getData();
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/notes');

        // Api
        msApiProvider.register('notes.notes', ['app/data/notes/notes.json']);
        msApiProvider.register('notes.notes2', ['app/data/notes/notes2.json']);
        msApiProvider.register('notes.labels', ['app/data/notes/labels.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.notes', {
            title : 'Notes',
            icon  : 'icon-lightbulb',
            state : 'app.notes',
            weight: 11
        });

    }

})();