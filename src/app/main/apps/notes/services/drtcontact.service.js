(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .factory('DrtContactService', DrtContactService);

    /** @ngInject */
    function DrtContactService(msApi, $q)
    {
        var service = {
            //campi
            currentContact  : {},
            city : {},
            cities : [],

            //metodi
            addContact   : addContact,
            getCities    : getCities,
            getCityById  : getCityById
        };

        /**
         * Add Contact
         */
        function addContact(contact)
        {
            
            // Create a new deferred object
            var deferred = $q.defer();

            //msApi.request('notes.contactTest2@save', contact,
            msApi.request('notes.contactTest@insert', contact,

                // SUCCESS
                function (response)
                {
                    // Attach the chats
                    service.currentContact = response;

                    // Resolve the promise
                    deferred.resolve(service.currentContact);
                },

                // ERROR
                function (response)
                {
                    deferred.reject(response);
                }

            );

            //torno promise a fine metodo
            return deferred.promise;

        }

        function getCities()
        {
            
            // Create a new deferred object
            var deferred = $q.defer();

            msApi.request('drt.icb.getCities@get', {},

                // SUCCESS
                function (response)
                {
                    // Attach the chats
                    service.cities = response;

                    // Resolve the promise
                    deferred.resolve(service.cities);
                },

                // ERROR
                function (response)
                {
                    deferred.reject(response);
                }

            );

            //torno promise a fine metodo
            return deferred.promise;

        }

       
        function getCityById(cityId)
        {
            
            // Create a new deferred object
            var deferred = $q.defer();

            msApi.request('drt.icb.getCityById@get', {cityId:cityId},

                // SUCCESS
                function (response)
                {
                    // Attach the chats
                    service.city = response;

                    // Resolve the promise
                    deferred.resolve(service.city);
                },

                // ERROR
                function (response)
                {
                    deferred.reject(response);
                }

            );

            //torno promise a fine metodo
            return deferred.promise;

        }

        //torno il servizio alla fine
        return service;

    }
})();