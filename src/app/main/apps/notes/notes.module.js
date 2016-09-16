(function ()
{
    'use strict';

    angular
        .module('app.notes', [])
        .config(config);

    /** @ngInject */
    function config(APPL_CONTEXT_URL, $stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
         
         /*
         $stateProvider.state('app.notesInit', {
            url    : '/notesInit',
            views  : {
                'content@app': {
                    controller : 'NotesInitController as vm'
                }
            }
        });
        */
        
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
                },

                //XXX AP: aggiungo anche le country
                CountryData: function (msApi) {
                    return msApi.resolve('notes.country@get');
                },
                CitiesData : function (IcbCityService)
                {
                    return IcbCityService.getCities();
                }
                
            }
        });

         //copia di quello sopra tanto per fare un test
         $stateProvider.state('app.notes2', {
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

        //XXX AP:test per invocare servizio esterno
        msApiProvider.register('notes.country', [APPL_CONTEXT_URL + '/countries',
            {},
            { 
                get: { method: 'GET', isArray: true }
            }]
        );
        
        //msApi.request('notes.contactTest@insert', contact,
        msApiProvider.register('notes.contactTest', [APPL_CONTEXT_URL + '/contacts',
            {},
            { 
                insert: { method: 'POST', isArray: false }
            }]
        );
        

        //questo viene invocato con il metodo save
        //msApi.request('notes.contactTest2@save', contact, ...
        msApiProvider.register('notes.contactTest2', [APPL_CONTEXT_URL + '/contacts',
            {},
            {}]
        );


        //-------------DRT resource CITY ---------------------

        //recupera la lista delle city
        msApiProvider.register('drt.icb.getCities', [APPL_CONTEXT_URL + '/cities',
            {},
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero city dal suo cityId
        msApiProvider.register('drt.icb.getCityById', [APPL_CONTEXT_URL + '/cities/:cityId',
            {
                cityId: '@cityId'
            },
            { 
                get: { method: 'GET', isArray: false }
            }]
        );

        //recupero la lista delle city dal stateProvinceId
        msApiProvider.register('drt.icb.getCitiesByStateProvinceId', [APPL_CONTEXT_URL + '/cities/getCitiesByStateProvinceId/:stateProvinceId',
            {
                stateProvinceId: '@stateProvinceId'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //-------------DRT resource COUNTRY ---------------------

        //recupera la lista delle country
        msApiProvider.register('drt.icb.getCountries', [APPL_CONTEXT_URL + '/countries',
            {},
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero la country dal suo countryId
        msApiProvider.register('drt.icb.getCountryById', [APPL_CONTEXT_URL + '/countries/:countryId',
            {
                countryId: '@countryId'
            },
            { 
                get: { method: 'GET', isArray: false }
            }]
        );

        //recupera la country dal suo ISO_CODE
        msApiProvider.register('drt.icb.getCountryByISOCode', [APPL_CONTEXT_URL + '/countries/getCountryByISOCode/:code',
            {
                code: '@code'
            },
            { 
                get: { method: 'GET', isArray: false }
            }]
        );

        //-------------DRT resource LANGUAGE ---------------------
        
        //recupera la lista delle lingue
        msApiProvider.register('drt.icb.getLanguages', [APPL_CONTEXT_URL + '/languages',
            {},
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupera la lista delle lingue ATTIVE
        msApiProvider.register('drt.icb.getLanguagesActive', [APPL_CONTEXT_URL + '/languages/getLanguagesActive',
            {},
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero la lingua dal suo languageId
        msApiProvider.register('drt.icb.getLanguageById', [APPL_CONTEXT_URL + '/languages/:languageId',
            {
                languageId: '@languageId'
            },
            { 
                get: { method: 'GET', isArray: false }
            }]
        );

        //recupero la lista delle lingue di una country
        msApiProvider.register('drt.icb.getLanguagesByCountryId', [APPL_CONTEXT_URL + '/languages/getLanguagesByCountryId/:countryId',
            {
                countryId: '@countryId'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //-------------DRT resource STATEPROVINCE ---------------------

        //recupera la lista delle stateprovince
        msApiProvider.register('drt.icb.getStateProvinces', [APPL_CONTEXT_URL + '/stateprovinces',
            {},
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero la stateprovince dal suo languageId
        msApiProvider.register('drt.icb.getStateProvinceById', [APPL_CONTEXT_URL + '/stateprovinces/:stateprovinceId',
            {
                stateprovinceId: '@stateprovinceId'
            },
            { 
                get: { method: 'GET', isArray: false }
            }]
        );

        //recupero la lista delle lingue di una country
        msApiProvider.register('drt.icb.getStateProvincesByCountryId', [APPL_CONTEXT_URL + '/stateprovinces/getStateprovincesByCountryId/:countryId',
            {
                countryId: '@countryId'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //-------------DRT resource CONTACT ---------------------
        
        //recupero il  dal suo contactId
        msApiProvider.register('drt.icb.getContactById', [APPL_CONTEXT_URL + '/contacts/getContactById/:contactId',
            {
                contactId: '@contactId'
            },
            { 
                get: { method: 'GET', isArray: false }
            }]
        );

        //esegue la ricerca dei contatti per i parametri passati in POST 
        //nell'oggetto che mappa SearchContactInputDto
        //esempio {"lastname":"Stickels", "firstname":"Alex", "birthday":"1985-05-10", "mobile":"", "email":"alexstickels@gmail.com"}
        msApiProvider.register('drt.icb.searchContact', [APPL_CONTEXT_URL + '/contacts/searchContact',
            {},
            { 
                get: { method: 'POST', isArray: true }
            }]
        );

        //inserisce il contact nel CRM passato in POST
        msApiProvider.register('drt.icb.createContact', [APPL_CONTEXT_URL + '/contacts/createContact',
            {},
            { 
                create: { method: 'POST', isArray: false }
            }]
        );

        //aggiorna il contact nel CRM passto in PUT
        //in caso si presente anche il parametro updateRedeemed esegue anche insert/update nella tabella mysql
        msApiProvider.register('drt.icb.updateContact', [APPL_CONTEXT_URL + '/contacts/updateContact',
            {},
            { 
                update: { method: 'PUT', isArray: false }
            }]
        );

        //esegue anche insert/update nella tabella mysql
        msApiProvider.register('drt.icb.updateRedemption', [APPL_CONTEXT_URL + '/contacts/updateRedemption',
            {},
            { 
                update: { method: 'PUT', isArray: false }
            }]
        );

        //recupero lista di KpiVo dato il barcode
        msApiProvider.register('drt.icb.getKPIByBarcode', [APPL_CONTEXT_URL + '/contacts/getKPIByBarcode/:barcode',
            {
                barcode: '@barcode'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero lista delle ULTIME transazioni dato il customer barcode
        msApiProvider.register('drt.icb.getLastTransactionsByCustomerBarcode', [APPL_CONTEXT_URL + '/contacts/getLastTransactionsByCustomerBarcode/:barcode',
            {
                barcode: '@barcode'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero lista delle transazioni dato il customer barcode
        msApiProvider.register('drt.icb.getTransactionsByCustomerBarcode', [APPL_CONTEXT_URL + '/contacts/getTransactionsByCustomerBarcode/:barcode',
            {
                barcode: '@barcode'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero lista delle ultime campagne dato il consumerId
        msApiProvider.register('drt.icb.getLastCampaignByConsumerId', [APPL_CONTEXT_URL + '/contacts/getLastCampaignByConsumerId/:consumerId',
            {
                consumerId: '@consumerId'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero lista delle birthday campagne dato il consumerId
        msApiProvider.register('drt.icb.getBirthdayCampaignByConsumerId', [APPL_CONTEXT_URL + '/contacts/getBirthdayCampaignByConsumerId/:consumerId',
            {
                consumerId: '@consumerId'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero lista delle anniversary campagne dato il consumerId
        msApiProvider.register('drt.icb.getAnniversaryCampaignByConsumerId', [APPL_CONTEXT_URL + '/contacts/getAnniversaryCampaignByConsumerId/:consumerId',
            {
                consumerId: '@consumerId'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero lista delle taglie dato il customerBarcode
        msApiProvider.register('drt.icb.getCustomerSizesByCustomerBarcode', [APPL_CONTEXT_URL + '/contacts/getCustomerSizesByCustomerBarcode/:customerBarcode',
            {
                customerBarcode: '@customerBarcode'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero lista delle transazioni dato il customerBarcode
        msApiProvider.register('drt.icb.getTransactionsByCategory', [APPL_CONTEXT_URL + '/contacts/getTransactionsByCategory/:customerBarcode',
            {
                customerBarcode: '@customerBarcode'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //recupero lista delle campaign reedemed dato il customerBarcode
        msApiProvider.register('drt.icb.getCampaignReedemedByConsumerId', [APPL_CONTEXT_URL + '/contacts/getCampaignReedemedByConsumerId/:consumerId',
            {
                consumerId: '@consumerId'
            },
            { 
                get: { method: 'GET', isArray: true }
            }]
        );

        //-------------DRT resource ---------------------
        

        //creo un sottomenu che quando ci clicco sopra popola dinamicamente il contenuto
        /*
        msNavigationServiceProvider.saveItem('apps.notes', {
            title : 'Notes',
            icon  : 'icon-lightbulb',
            state : 'app.notesInit',
            weight: 12
        });

        msNavigationServiceProvider.saveItem('apps.notes.notes1', {
            title : 'Notes1',
            state : 'app.notes',
        });
        */

        msNavigationServiceProvider.saveItem('apps.notes', {
            title : 'Notes',
            icon  : 'icon-lightbulb',
            state : 'app.notes',
            weight: 12
        });

    }

})();