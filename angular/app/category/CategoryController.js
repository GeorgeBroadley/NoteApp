(function() {

    'use strict';

    angular
        .module('noteApp')
        .controller('CategoryController', ['$http', '$state', '$auth', 'SessionService', '$sce', CategoryController]);

    function CategoryController($http, $state, $auth, SessionService, $sce) {

        var vm = this;
        vm.refreshClass = "fa fa-refresh";
        vm.categoryAddButton = $sce.trustAsHtml('<i class="fa fa-check"></i> Create Category');

        vm.categories = JSON.parse(SessionService.get('categories'));
        vm.categoryTypes = JSON.parse(SessionService.get('category_types'));

        if (!vm.categories) {
            $http.get('/api/categories').success(function(data) {
                SessionService.set('categories', JSON.stringify(data));
                vm.categories = data;
            }).error(function (data) {
                $state.go('auth', {});
            });
        }

        if (!vm.category_types) {
            $http.get('/api/category_types').success(function(data) {
                SessionService.set('categoryTypes', JSON.stringify(data));
                vm.categoryTypes = data;
                vm.hideOverlay = true;
            }).error(function (data) {
                $state.go('auth', {});
            });
        } else {
            vm.hideOverlay = true;
        }

        vm.create = function() {
            console.log(vm.categoryType);
            vm.categoryAddButton = $sce.trustAsHtml('<i class="fa fa-refresh fa-spin"></i>');
            $http.post('/api/categories', {'name': vm.category, 'type': vm.categoryType}).success(function (data) {
                vm.categories.push(data);
                vm.category = "";
                vm.categoryType = "";
                SessionService.set('categories', JSON.stringify(vm.categories));
                vm.categoryAddButton = $sce.trustAsHtml('<i class="fa fa-check"></i> Create Category');
            }).error(function (data) {
                $state.go('auth', {});
            });
        };

        vm.refresh = function() {
            vm.refreshClass = "fa fa-refresh fa-spin";
            $http.get('/api/categories').success(function(data) {
                SessionService.set('categories', JSON.stringify(data));
                vm.categories = data;
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

        vm.getClass = function(type) {
            switch (type) {
                case 1:
                    return "fa fa-bookmark icon-category";
                case 2:
                    return "fa fa-list icon-category";
                case 3:
                    return "fa fa-sticky-note icon-category";
                case 4:
                    return "fa fa-clock-o icon-category";
                default:
                    return "fa fa-question icon-category";
            }
        };

        vm.getHref = function(type) {
            switch (type) {
                case 1:
                    return "/bookmarks";
                case 2:
                    return "/lists";
                case 3:
                    return "/notes";
                case 4:
                    return "/reminders";
                default:
                    return "/";
            }
        };
    }

})();
