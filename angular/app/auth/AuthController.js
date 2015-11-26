(function() {

    'use strict';

    angular
        .module('noteApp')
        .controller('AuthController', AuthController);

    function AuthController($auth, $state, $sce) {

        var vm = this;
        vm.loginButtonText = $sce.trustAsHtml('<i class="fa fa-sign-in"></i> Log In');

        vm.login = function() {

            vm.err = null;
            vm.loginButtonText = $sce.trustAsHtml('<i class="fa fa-refresh fa-spin"></i>');
            var credentials = {
                email: vm.email,
                password: vm.password
            };

            $auth.login(credentials)
                .then(function(data) {
                    $state.go('categories', {});
                })
                .catch(function(data) {
                    vm.password = "";
                    vm.err = "Email and/or Password Incorrect";
                    vm.loginButtonText = $sce.trustAsHtml('<i class="fa fa-user"></i> Log In');
                });
        };

        vm.hideOverlay = true;

    }

})();
