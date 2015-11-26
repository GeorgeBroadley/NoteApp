(function() {

    'use strict';

    angular
        .module('noteApp')
        .controller('NoteController', ['$http', '$auth', '$state', '$stateParams', 'SessionService', '$sce', NoteController]);

    function NoteController($http, $auth, $state, $stateParams, SessionService, $sce) {
        var vm = this;
        vm.notes = JSON.parse(SessionService.get('notes' + $stateParams.category));
        vm.refreshClass = "fa fa-refresh";
        vm.noteAddButton = $sce.trustAsHtml('<i class="fa fa-check"></i> Create Note');
        vm.noteDeleteButton = $sce.trustAsHtml('<i class="fa fa-cross"></i> Delete');
        vm.noteDelete = false;

        if (!vm.notes) {
            $http.get('/api/notes/' + $stateParams.category).success(function (data) {
                vm.notes = data;
                SessionService.set('notes' + $stateParams.category, JSON.stringify(data));
                vm.hideOverlay = true;
            }).error(function (data) {
                $state.go('auth', {});
            });
        } else {
            vm.hideOverlay = true;
        }

        vm.create = function() {
            vm.noteAddButton = $sce.trustAsHtml('<i class="fa fa-refresh fa-spin"></i>');
            $http.post('/api/notes', {'title': vm.noteTitle, 'text': vm.noteText, 'category': $stateParams.category}).success(function (data) {
                vm.notes.push(data);
                vm.noteTitle = "";
                vm.noteText = "";
                SessionService.set('notes' + $stateParams.category, JSON.stringify(vm.notes));
                vm.cats = JSON.parse(SessionService.get('categories'));
                for (vm.i = 0; vm.i < vm.cats.length; vm.i++) {
                    if (vm.cats[vm.i].id == $stateParams.category) {
                        vm.cats[vm.i].count++;
                    }
                }
                SessionService.set('categories', JSON.stringify(vm.cats));
                vm.noteAddButton = $sce.trustAsHtml('<i class="fa fa-check"></i> Create Note');
            }).error(function (data) {
                $state.go('auth', {});
            });
        };

        vm.delete = function(id) {
            vm.noteDelete = true;
            $http.delete('/api/notes/' + id).success(function (data) {
                vm.notes = data;
                SessionService.set('notes' + $stateParams.category, JSON.stringify(data));
                vm.cats = JSON.parse(SessionService.get('categories'));
                for (vm.i = 0; vm.i < vm.cats.length; vm.i++) {
                    if (vm.cats[vm.i].id == $stateParams.category) {
                        vm.cats[vm.i].count--;
                    }
                }
                SessionService.set('categories', JSON.stringify(vm.cats));
                vm.noteDelete = false;
            }).error(function (data) {
                $state.go('auth', {});
            });
        };

        vm.refresh = function() {
            vm.refreshClass = "fa fa-refresh fa-spin";
            $http.get('/api/notes/' + $stateParams.category).success(function (data) {
                vm.notes = data;
                SessionService.set('notes' + $stateParams.category, JSON.stringify(data));
                vm.refreshClass = "fa fa-refresh";
            }).error(function (data) {
                $state.go('auth', {});
            });
        };

        vm.logout = function() {
            $auth.logout();
            SessionService.cle();
            $state.go('auth', {});
        };
    }
})();
