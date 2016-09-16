(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .factory('IcbLanguageService', IcbLanguageService);

    /** @ngInject */
    function IcbLanguageService(msApi, $q)
    {
        var service = {

            //campi
            language : {},
            languages : [],

            //metodi esposti
            getLanguages : getLanguages,
            getLanguagesActive: getLanguagesActive,
            getLanguageById : getLanguageById,
            getLanguagesByCountryId : getLanguagesByCountryId
        };

        return service;
        
        //--- METODI IMPLEMENTAZIONE ---

        function getLanguages()
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getLanguages@get', {},

                function (response)
                {
                    service.languages = response;
                    deferred.resolve(response);
                },

                function (response)
                {
                    deferred.reject(response);
                }

            );

            return deferred.promise;
        }

        function getLanguagesActive()
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getLanguagesActive@get', {},

                function (response)
                {
                    service.languages = response;
                    deferred.resolve(response);
                },

                function (response)
                {
                    deferred.reject(response);
                }

            );

            return deferred.promise;
        }

        function getLanguageById(languageId)
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getLanguageById@get', {languageId:languageId},

                function (response)
                {
                    service.language = response;
                    deferred.resolve(response);
                },

                function (response)
                {
                    deferred.reject(response);
                }

            );
        }

        function getLanguagesByCountryId(countryId)
        {
            
            var deferred = $q.defer();

            msApi.request('drt.icb.getLanguagesByCountryId@get', {countryId:countryId},

                function (response)
                {
                    service.languages = response;
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