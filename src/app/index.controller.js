(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming)
    {
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;

        //////////cosa scritta in sviluppo e altra cosa scritta sul master

        //qui scrivo altra cosa in sviluppo

        //qui ho fatto il fix in produzione

        //altro fix fatto in produzione

        //conflitto!!!!! e qui inizia il conflitto di nuovo
    }

})();