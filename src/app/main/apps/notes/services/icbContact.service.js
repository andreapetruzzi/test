(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .factory('IcbContactService', IcbContactService);

    /** @ngInject */
    function IcbContactService(msApi, $q)
    {
        var service = {

            //NOTA: tengo quasi tutti i campi delle query in modo da avere una cache da poter utilizzare
            //nel caso voglia fare back del browser e riroporre i dati della scorsa interrogazione
            contact : {},
            contacts : [],
            kpis : [],
            lastTransactions : [],
            transactions : [],
            lastCampaigns : [],
            birthdayCampaign : [],
            anniversaryCampaigns : [],
            lastSizes : [],
            lastTransactionByCat : [],
            customerCampaignRedemption : [],

            //metodi esposti
            getContactById: getContactById,
            searchContact : searchContact,
            createContact : createContact,
            updateContact : updateContact,
            updateRedemption : updateRedemption,
            getKPIByBarcode : getKPIByBarcode,
            getLastTransactionsByCustomerBarcode: getLastTransactionsByCustomerBarcode,
            getTransactionsByCustomerBarcode :  getTransactionsByCustomerBarcode,
            getLastCampaignByConsumerId : getLastCampaignByConsumerId,
            getBirthdayCampaignByConsumerId : getBirthdayCampaignByConsumerId,
            getAnniversaryCampaignByConsumerId : getAnniversaryCampaignByConsumerId,
            getCustomerSizesByCustomerBarcode : getCustomerSizesByCustomerBarcode,
            getTransactionsByCategory : getTransactionsByCategory,
            getCampaignReedemedByConsumerId : getCampaignReedemedByConsumerId
        };

        return service;
        
        //--- METODI IMPLEMENTAZIONE ---

        function getContactById(contactId)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.getContactById@get', {contactId:contactId},
                function (response)
                {
                    service.contact = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function searchContact(searchContactInput)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.searchContact@get', searchContactInput,
                function (response)
                {
                    service.contact = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function createContact(contactInput)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.createContact@create', contactInput,
                function (response)
                {
                    service.contact = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function updateContact(contactInput)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.updateContact@update', contactInput,
                function (response)
                {
                    service.contact = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function updateRedemption(redemptionInput)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.updateRedemption@update', redemptionInput,
                function (response)
                {
                    service.contact = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function getKPIByBarcode(barcode)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.getKPIByBarcode@get', {barcode:barcode},
                function (response)
                {
                    service.kpis = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function getLastTransactionsByCustomerBarcode(barcode)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.getLastTransactionsByCustomerBarcode@get', {barcode:barcode},
                function (response)
                {
                    service.lastTransactions = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function getTransactionsByCustomerBarcode(barcode)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.getTransactionsByCustomerBarcode@get', {barcode:barcode},
                function (response)
                {
                    service.transactions = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function getLastCampaignByConsumerId(consumerId)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.getLastCampaignByConsumerId@get', {consumerId:consumerId},
                function (response)
                {
                    service.lastCampaigns = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function getBirthdayCampaignByConsumerId(consumerId)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.getBirthdayCampaignByConsumerId@get', {consumerId:consumerId},
                function (response)
                {
                    service.birthdayCampaign = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function getAnniversaryCampaignByConsumerId(consumerId)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.getAnniversaryCampaignByConsumerId@get', {consumerId:consumerId},
                function (response)
                {
                    service.anniversaryCampaigns = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function getCustomerSizesByCustomerBarcode(customerBarcode)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.getCustomerSizesByCustomerBarcode@get', {customerBarcode:customerBarcode},
                function (response)
                {
                    service.lastSizes = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function getTransactionsByCategory(customerBarcode)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.getTransactionsByCategory@get', {customerBarcode:customerBarcode},
                function (response)
                {
                    service.lastTransactionByCat = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

        function getTransactionsByCategory(consumerId)
        {
            var deferred = $q.defer();

            msApi.request('drt.icb.getCampaignReedemedByConsumerId@get', {consumerId:consumerId},
                function (response)
                {
                    service.customerCampaignRedemption = response;
                    deferred.resolve(response);
                },
                function (response)
                {
                    deferred.reject(response);
                }
            );
        }

    }
})();