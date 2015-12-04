(function() {

    'use strict';

    angular
        .module('noteApp')
        .controller('CategorydeleteController', ['$http', '$state', '$auth', '$stateParams', 'SessionService', CategorydeleteController]);

    function CategorydeleteController($http, $state, $auth, $stateParams, SessionService) {

        var vm = this;
        vm.categoryDelete = false;

        vm.no = function() {
            $state.go('categories', {});
        };

        vm.delete = function(id) {
            vm.categoryDelete = true;
            $http.delete('/api/categories/' + $stateParams.category).success(function (data) {
                $http.get('/api/categories').success(function(data) {
                    SessionService.rem('notes' + $stateParams.category);
                    SessionService.set('categories', JSON.stringify(data));
                    $state.go('categories', {});
                }).error(function (data) {
                    $state.go('auth', {});
                });
            }).error(function (data) {
                $state.go('auth', {});
            });
        };

        vm.hideOverlay = true;

    }

})();
