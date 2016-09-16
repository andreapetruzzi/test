(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .factory('IcbCountryService', IcbCountryService);

    /** @ngInject */
    function IcbCountryService(msApi, $q)
    {
        var service = {

            //campi
            country : {},
            countries : [],

            //metodi esposti
            getCountries : getCountries,
            getCountryById: getCountryById,
            getCountryByISOCode : getCountryByISOCode
        };

        return service;
        
        //--- METODI IMPLEMENTAZIONE ---

        function getCountries()
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getCountries@get', {},

                function (response)
                {
                    service.countries = response;
                    deferred.resolve(response);
                },

                function (response)
                {
                    deferred.reject(response);
                }

            );

            return deferred.promise;
        }
       
        function getCountryById(countryId)
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getCountryById@get', {countryId:countryId},

                function (response)
                {
                    service.country = response;
                    deferred.resolve(response);
                },

                function (response)
                {
                    deferred.reject(response);
                }

            );
        }

        function getCountryByISOCode(code)
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getCountryByISOCode@get', {code:code},

                function (response)
                {
                    service.country = response;
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