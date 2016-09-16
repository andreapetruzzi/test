(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .factory('IcbStateProvinceService', IcbStateProvinceService);

    /** @ngInject */
    function IcbStateProvinceService(msApi, $q)
    {
        var service = {

            //campi
            stateprovince : {},
            stateprovinces : [],

            //metodi esposti
            getStateProvinces : getStateProvinces,
            getStateProvinceById : getStateProvinceById,
            getStateProvinceByCountryId : getStateProvinceByCountryId
        };

        return service;
        
        //--- METODI IMPLEMENTAZIONE ---

        function getStateProvinces()
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getStateProvinces@get', {},

                function (response)
                {
                    service.stateprovinces = response;
                    deferred.resolve(response);
                },

                function (response)
                {
                    deferred.reject(response);
                }

            );

            return deferred.promise;
        }

        function getStateProvinceById(stateprovinceId)
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getStateProvinceById@get', {stateprovinceId:stateprovinceId},

                function (response)
                {
                    service.stateprovince = response;
                    deferred.resolve(response);
                },

                function (response)
                {
                    deferred.reject(response);
                }

            );
        }

        function getStateProvinceByCountryId(countryId)
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getStateProvincesByCountryId@get', {countryId:countryId},

                function (response)
                {
                    service.stateprovinces = response;
                    deferred.resolve(response);
                },

                function (response)
                {
                    deferred.reject(response);
                }

            );

            return deferred.promise;
        }

    }
})();