(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .factory('IcbCityService', IcbCityService);

    /** @ngInject */
    function IcbCityService(msApi, $q)
    {
        var service = {

            //campi
            city : {},
            cities : [],

            //metodi esposti
            getCities : getCities,
            getCityById : getCityById,
            getCitiesByStateProvinceId : getCitiesByStateProvinceId
        };

        return service;
        
        //--- METODI IMPLEMENTAZIONE ---

        function getCities()
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getCities@get', {},

                function (response)
                {
                    service.cities = response;
                    deferred.resolve(response);
                },

                function (response)
                {
                    deferred.reject(response);
                }

            );

            return deferred.promise;
        }
       
        function getCityById(cityId)
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getCityById@get', {cityId:cityId},

                function (response)
                {
                    service.city = response;
                    deferred.resolve(response);
                },

                function (response)
                {
                    deferred.reject(response);
                }

            );

            return deferred.promise;
        }

        function getCitiesByStateProvinceId(stateProvinceId)
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getCitiesByStateProvinceId@get', {stateProvinceId:stateProvinceId},

                function (response)
                {
                    service.cities = response;
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