(function ()
{
    'use strict';

    angular
        .module('app.quick-panel')
        .controller('QuickPanelController', QuickPanelController);

    /** @ngInject */
    function QuickPanelController(msApi, $state, $translate)
    {
        var vm = this;

        // Data
        vm.date = new Date();
        vm.settings = {
            notify: true,
            cloud : false,
            retro : true
        };

        //XXX AP: creazione di tab dinamiche
        var today = $translate.instant('QUICKPANEL.TODAY');
        var chat = $translate.instant('QUICKPANEL.CHAT');
        var activity = $translate.instant('QUICKPANEL.ACTIVITY');

        vm.dinamicTabs = [
          { title: today, content: "app/quick-panel/tabs/today/today-tab.html"},
          { title: chat, content: "app/quick-panel/tabs/chat/chat-tab.html"},
          { title: activity, content: "app/quick-panel/tabs/activity/activity-tab.html"}
        ];

        msApi.request('quickPanel.activities@get', {},
            // Success
            function (response)
            {
                vm.activities = response.data;
            }
        );

        msApi.request('quickPanel.events@get', {},
            // Success
            function (response)
            {
                vm.events = response.data;
            }
        );

        msApi.request('quickPanel.notes@get', {},
            // Success
            function (response)
            {
                vm.notes = response.data;
            }
        );

        // Methods
        vm.eventFunction = eventFunction;
        vm.noteFunction = noteFunction;
        //////////

        function eventFunction()
        {
            console.log("Ho cliccato sugli eventi");
            $state.go('app.calendar');
        }

        function noteFunction()
        {
            console.log("Ho cliccato sulle note");
            $state.go('app.notes');

        }

    }

})();