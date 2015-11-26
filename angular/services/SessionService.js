(function() {

    'use strict';

    angular
        .module('noteApp')
        .service('SessionService', SessionService);

    function SessionService() {
        this.get = function(name) {
            return sessionStorage.getItem(name);
        };

        this.set = function(name, val) {
            return sessionStorage.setItem(name, val);
        };

        this.rem = function(name) {
            return sessionStorage.removeItem(name);
        };

        this.cle = function() {
            return sessionStorage.clear();
        };
    }



})();
