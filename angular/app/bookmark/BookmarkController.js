(function() {

    'use strict';

    angular
        .module('noteApp')
        .controller('BookmarkController', ['$http', '$auth', '$state', '$stateParams', 'SessionService', '$sce', BookmarkController]);

    function BookmarkController($http, $auth, $state, $stateParams, SessionService, $sce) {
        var vm = this;
        vm.bookmarks = JSON.parse(SessionService.get('bookmarks' + $stateParams.category));
        vm.refreshClass = "fa fa-refresh";
        vm.bookmarkAddButton = $sce.trustAsHtml('<i class="fa fa-check"></i> Create Bookmark');
        vm.bookmarkDeleteButton = $sce.trustAsHtml('<i class="fa fa-cross"></i> Delete');
        vm.bookmarkDelete = false;

        if (!vm.bookmarks) {
            $http.get('/api/bookmarks/' + $stateParams.category).success(function (data) {
                vm.bookmarks = data;
                SessionService.set('bookmarks' + $stateParams.category, JSON.stringify(data));
                vm.hideOverlay = true;
            }).error(function (data) {
                $state.go('auth', {});
            });
        } else {
            vm.hideOverlay = true;
        }

        vm.create = function() {
            vm.bookmarkAddButton = $sce.trustAsHtml('<i class="fa fa-refresh fa-spin"></i>');
            $http.post('/api/bookmarks', {'title': vm.bookmarkTitle, 'url': vm.bookmarkUrl, 'category': $stateParams.category}).success(function (data) {
                vm.bookmarks.push(data);
                vm.bookmarkTitle = "";
                vm.bookmarkUrl = "";
                SessionService.set('bookmarks' + $stateParams.category, JSON.stringify(vm.bookmarks));
                vm.cats = JSON.parse(SessionService.get('categories'));
                for (vm.i = 0; vm.i < vm.cats.length; vm.i++) {
                    if (vm.cats[vm.i].id == $stateParams.category) {
                        vm.cats[vm.i].count++;
                    }
                }
                SessionService.set('categories', JSON.stringify(vm.cats));
                vm.bookmarkAddButton = $sce.trustAsHtml('<i class="fa fa-check"></i> Create Bookmark');
            }).error(function (data) {
                $state.go('auth', {});
            });
        };

        vm.delete = function(id) {
            vm.bookmarkDelete = true;
            $http.delete('/api/bookmarks/' + id).success(function (data) {
                $http.get('/api/bookmarks/' + $stateParams.category).success(function (data) {
                    vm.bookmarks = data;
                    SessionService.set('bookmarks' + $stateParams.category, JSON.stringify(data));
                    vm.cats = JSON.parse(SessionService.get('categories'));
                    for (vm.i = 0; vm.i < vm.cats.length; vm.i++) {
                        if (vm.cats[vm.i].id == $stateParams.category) {
                            vm.cats[vm.i].count--;
                        }
                    }
                    SessionService.set('categories', JSON.stringify(vm.cats));
                    vm.bookmarkDelete = false;
                }).error(function (data) {
                    $state.go('auth', {});
                });
            }).error(function (data) {
                $state.go('auth', {});
            });
        };

        vm.refresh = function() {
            vm.refreshClass = "fa fa-refresh fa-spin";
            $http.get('/api/bookmarks/' + $stateParams.category).success(function (data) {
                vm.bookmarks = data;
                SessionService.set('bookmarks' + $stateParams.category, JSON.stringify(data));
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
