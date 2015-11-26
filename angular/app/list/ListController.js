(function() {

    'use strict';

    angular
        .module('noteApp')
        .controller('ListController', ['$http', '$auth', '$state', '$stateParams', 'SessionService', '$sce', ListController]);

    function ListController($http, $auth, $state, $stateParams, SessionService, $sce) {
        var vm = this;
        vm.lists = JSON.parse(SessionService.get('lists' + $stateParams.category));
        vm.refreshClass = "fa fa-refresh";
        vm.listAddButton = $sce.trustAsHtml('<i class="fa fa-check"></i> Create List Item');
        vm.listDeleteButton = $sce.trustAsHtml('<i class="fa fa-cross"></i> Delete');
        vm.listDelete = false;

        if (!vm.lists) {
            $http.get('/api/lists/' + $stateParams.category).success(function (data) {
                vm.lists = data;
                SessionService.set('lists' + $stateParams.category, JSON.stringify(data));
                vm.hideOverlay = true;
            }).error(function (data) {
                $state.go('auth', {});
            });
        } else {
            vm.hideOverlay = true;
        }

        vm.create = function() {
            vm.listAddButton = $sce.trustAsHtml('<i class="fa fa-refresh fa-spin"></i>');
            $http.post('/api/lists', {'text': vm.listItem, 'category': $stateParams.category}).success(function (data) {
                vm.lists.push(data);
                vm.listItem = "";
                SessionService.set('lists' + $stateParams.category, JSON.stringify(vm.lists));
                vm.cats = JSON.parse(SessionService.get('categories'));
                for (vm.i = 0; vm.i < vm.cats.length; vm.i++) {
                    if (vm.cats[vm.i].id == $stateParams.category) {
                        vm.cats[vm.i].count++;
                    }
                }
                SessionService.set('categories', JSON.stringify(vm.cats));
                vm.listAddButton = $sce.trustAsHtml('<i class="fa fa-check"></i> Create List Item');
            }).error(function (data) {
                $state.go('auth', {});
            });
        };

        vm.delete = function(id) {
            vm.listDelete = true;
            $http.delete('/api/lists/' + id).success(function (data) {
                vm.lists = data;
                SessionService.set('lists' + $stateParams.category, JSON.stringify(data));
                vm.cats = JSON.parse(SessionService.get('categories'));
                for (vm.i = 0; vm.i < vm.cats.length; vm.i++) {
                    if (vm.cats[vm.i].id == $stateParams.category) {
                        vm.cats[vm.i].count--;
                    }
                }
                SessionService.set('categories', JSON.stringify(vm.cats));
                vm.listDelete = false;
            }).error(function (data) {
                $state.go('auth', {});
            });
        };

        vm.refresh = function() {
            vm.refreshClass = "fa fa-refresh fa-spin";
            $http.get('/api/lists/' + $stateParams.category).success(function (data) {
                vm.lists = data;
                SessionService.set('lists' + $stateParams.category, JSON.stringify(data));
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
