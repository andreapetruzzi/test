(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .controller('NotesController', NotesController);

    /** @ngInject */
    function NotesController(IcbCityService, CitiesData, $q, DrtContactService, msNavigationService, CountryData, NotesCopy, Notes, Labels, $document, $timeout, $scope, $mdSidenav, NotesService, LabelsService, $mdDialog)
    {
        var vm = this;

        // Data
        vm.notes = NotesService.data;
        vm.labels = LabelsService.data;
        //vm.notes = Notes.data; //funziona anche questo
        //vm.notes = NotesCopy.notes; //funziona anche questo

        /*
         angular.forEach(CitiesData, function(row){
            console.log(row.cityDesc);
        });

        console.log("------------------------------------");

        angular.forEach(IcbCityService.cities, function(row2){
            console.log(row2.cityDesc);
        });
        */
        

        //XXX AP: per vedere che funziona li metto in console ciclando array;
        /*
        angular.forEach(CountryData, function(row){
            console.log(row.countryId + ' - ' + row.countryDesc);
        });

        //esempio di come vengono settati gli oggetti nel msi-api.provider
        var res = ['aaa',['uno','due'],['tre','quattro'],{'campo1':'valore campo1', 'campo2':'valore campo2'}];
        var xxx = {
                url          : res[0] || '',
                paramDefaults: res[1] || [],
                actions      : res[2] || [],
                options      : res[3] || {}
            };

        //compongo oggetto che poi passo al metodo java
        vm.contact = {
            	contactID : '12x595313',
	            firstName : 'Andrea',
	            lastName  : 'Petruzzi'
        };
        */

        //TEST0
        //DrtContactService.addContact(vm.contact);  

        //TEST1
        /*
        DrtContactService.getCities()
            .then(function (data) {

                vm.cities = data;

                angular.forEach(vm.cities, function(row){
                    console.log(row.cityId + ' - ' + row.cityDesc);
                });

            })
            .catch(function (error) {
                //console.log("ERRORE nel recupero cities " + e.data.errorCode);

                var newMessage = 'XHR Failed for getCustomer'
                if (error.data && error.data.errorMessage) {
                    newMessage = newMessage + '\n' + error.data.errorMessage;
                    error.data.errorMessage = newMessage;
                }
                
                console.log(newMessage);
                return $q.reject(e);
            });
        */

        //TEST2
        /*
        DrtContactService.getCityById('700')
            .then(function (data) {

                vm.city = data;
                console.log(vm.city.cityId + ' - ' + vm.city.cityDesc);

            })
            .catch(function (error) {
                //console.log("ERRORE nel recupero cities " + e.data.errorCode);

                var newMessage = 'XHR Failed for getCustomer'
                if (error.data && error.data.errorMessage) {
                    newMessage = newMessage + '\n' + error.data.errorMessage;
                    error.data.errorMessage = newMessage;
                }
                
                console.log(newMessage);
                return $q.reject(e);
            });
        */

        /*
        DrtContactService.getCities()
            .then(function (data) {

                vm.cities = data;

                angular.forEach(vm.cities, function(row){
                    console.log(row.cityId + ' - ' + row.cityDesc);
                });

            }, function (error) {
					// Il servizio ha ritornato un errore, quindi lo notifico
					var errors = [];
					errors.push({severity: 'danger', code: error.data.errorCode });
			});
        */  
       
        //DrtContactService.getCityById('700');  
        //---

        
        vm.search = '';
        vm.searchToolbar = false;
        vm.filters = {
            archive: false
        };
        vm.labelFilterIds = [];
        vm.noteListType = 'notes';

        // Methods
        vm.filterChange = filterChange;
        vm.openSearchToolbar = openSearchToolbar;
        vm.closeSearchToolbar = closeSearchToolbar;
        vm.editNote = editNote;
        vm.deleteLabel = deleteLabel;
        vm.toggleSidenav = toggleSidenav;
        vm.addNewLabel = LabelsService.addLabel;

        //////////

        /**
         * Change Notes Filter
         * @param type
         */
        function filterChange(type)
        {

            vm.noteListType = type;

            if ( type === 'notes' )
            {
                vm.labelFilterIds = [];
                vm.filters = {
                    archive: false
                };
            }
            else if ( type === 'archive' )
            {
                vm.labelFilterIds = [];
                vm.filters = {
                    archive: true
                };
            }
            else if ( type === 'reminders' )
            {
                vm.labelFilterIds = [];
                vm.filters = {
                    reminder: '',
                    archive : false
                };
            }
            else if ( angular.isObject(type) )
            {
                vm.labelFilterIds = [];
                vm.labelFilterIds.push(type.id);
            }

            $mdSidenav('main-sidenav').close();

        }

        /**
         * Edit Note
         * @param ev
         * @param noteId
         */
        function editNote(ev, noteId)
        {
            $mdDialog.show({
                template           : '<md-dialog ms-scroll><ms-note-form note-type="\'edit\'" note-id="\'' + noteId + '\'"></ms-note-form></md-dialog>',
                parent             : $document.find('#notes'),
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true
            });
        }

        /**
         * Delete Label
         * @param ev
         * @param label
         */
        function deleteLabel(ev, label)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the label?')
                .htmlContent('The "' + label.name + '" label will be deleted permanently.')
                .ariaLabel('delete label')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {
                LabelsService.deleteLabel(label);
            });
        }

        /**
         * Open Search Toolbar
         */
        function openSearchToolbar()
        {
            vm.searchToolbar = true;

            $timeout(function ()
            {
                angular.element($document.find('#search-notes-input')).trigger('focus');

            });

            $document.on('keyup', escKeyEvent);
        }

        /**
         * Close Search Toolbar
         */
        function closeSearchToolbar()
        {
            $scope.$evalAsync(function ()
            {
                vm.searchToolbar = false;
                vm.search = '';
            });

            $document.off('keyup', escKeyEvent);
        }

        /**
         * Escape key event
         */
        function escKeyEvent(e)
        {
            if ( e.keyCode === 27 )
            {
                closeSearchToolbar();
            }
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Array prototype
         *
         * Get by id
         *
         * @param value
         * @returns {T}
         */
        Array.prototype.getById = function (value)
        {
            return this.filter(function (x)
            {
                return x.id === value;
            })[0];
        };

    }

})();