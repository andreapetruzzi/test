(function ()
{
    'use strict';

    angular
        .module('app.navigation')
        .controller('NavigationController', NavigationController);

    /** @ngInject */
    function NavigationController($scope, msNavigationService)
    {
        var vm = this;

        // Data
        vm.bodyEl = angular.element('body');
        vm.folded = false;
        vm.msScrollOptions = {
            suppressScrollX: true
        };

        // Methods
        vm.toggleMsNavigationFolded = toggleMsNavigationFolded;

        initDynamicNavigationMenu();

        //////////


        //metodo di inizializzazione dinamica del menu
        //in modo che posso creare dinamicamente il contenuto del menu di sx dopo la fase di configurazione
        function initDynamicNavigationMenu()
        {
            //aggiungo dinamicamente al menu di sx
            msNavigationService.saveItem('apps.notes.notes2', {
                title : 'Notes2 dinamico',
                state : 'app.notes2'
            });
        }


        /**
         * Toggle folded status
         */
        function toggleMsNavigationFolded()
        {
            vm.folded = !vm.folded;
        }

        // Close the mobile menu on $stateChangeSuccess
        $scope.$on('$stateChangeSuccess', function ()
        {
            vm.bodyEl.removeClass('ms-navigation-horizontal-mobile-menu-active');
        });
    }

})();