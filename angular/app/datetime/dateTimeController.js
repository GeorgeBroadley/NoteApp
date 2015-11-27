(function() {

    'use strict';

    angular
        .module('noteApp')
        .controller('dateTimeController', ['$scope', '$http', dateTimeController]);

    var dateTimeController = function ($scope, $rootScope) {
        $scope.vm = {
            message: "Bootstrap DateTimePicker Directive",
            dateTime: {}
        };

        $scope.$watch('change', function(){
            console.log($scope.vm.dateTime);
        });


        /*
           $scope.$on('emit:dateTimePicker', function (e, value) {
           $scope.vm.dateTime = value.dateTime;
           console.log(value);
           })
        */
    };
})();
