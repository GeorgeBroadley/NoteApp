(function() {

    'use strict';

    angular
        .module('noteApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($auth, $state, $sce) {

        var vm = this;
        vm.registerButton = $sce.trustAsHtml('<i class="fa fa-user"></i> Register Account');

        vm.register = function() {

            vm.registerButton = $sce.trustAsHtml('<i class="fa fa-refresh fa-spin"></i>');

            vm.err = null;

            var credentials = {
                name: vm.fullname,
                email: vm.email,
                password: vm.password
            };

            $auth.signup(credentials)
                .then(function(data) {
                    $state.go('auth', {});
                })
                .catch(function(data) {
                    vm.password = "";
                    vm.err = "Email not unique.";
                    vm.registerButton = $sce.trustAsHtml('<i class="fa fa-user"></i> Register Account');
                });
        };

        vm.hideOverlay = true;

    }

})();
