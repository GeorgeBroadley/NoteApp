(function() {

    'use strict';

    angular
        .module('noteApp')
        .controller('ReminderController', ['$http', '$auth', '$state', '$stateParams', 'SessionService', '$sce', '$timeout', ReminderController]);

    function ReminderController($http, $auth, $state, $stateParams, SessionService, $sce, $timeout) {
        var vm = this;
        vm.reminders = JSON.parse(SessionService.get('reminders' + $stateParams.category));
        vm.refreshClass = "fa fa-refresh";
        vm.reminderAddButton = $sce.trustAsHtml('<i class="fa fa-check"></i> Create Reminder');
        vm.reminderDeleteButton = $sce.trustAsHtml('<i class="fa fa-cross"></i> Delete');
        vm.reminderDelete = false;
        vm.days = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
        vm.monthsAvailable = ["01","02","03","04","05","06","07","08","09","10","11","12"];
        vm.yearsAvailable = ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039","2040"];
        vm.hoursAvailable = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
        vm.minsAvailable = ["00","05","10","15","20","25","30","35","40","45","50","55"];

        vm.years = [];
        vm.months = [];
        vm.hours = [];
        vm.mins = [];

        vm.today = new Date();
        vm.day = vm.today.getDate();
        vm.month = vm.today.getMonth()+1;
        vm.year = vm.today.getFullYear();
        vm.hour = vm.today.getHours();
        vm.min = vm.today.getMinutes();

        vm.dateChange = function() {
            vm.months = [];
            vm.years = [];
            vm.hours = [];
            vm.mins = [];
            vm.months = vm.monthsAvailable;

            if (vm.reminderMonth !== undefined) {
                if (vm.reminderMonth < vm.month || vm.reminderDay < vm.day) {
                    vm.yearsAvailable.forEach(function(i) {
                        if (i > vm.year) {
                            vm.years.push(i);
                        }
                    });
                } else {
                    vm.years = vm.yearsAvailable;
                }
            }

            if (vm.reminderYear !== undefined) {
                if (vm.reminderDay == vm.day && vm.reminderMonth == vm.month && vm.reminderYear == vm.year) {
                    vm.hoursAvailable.forEach(function(i) {
                        if (i >= vm.hour) {
                            vm.hours.push(i);
                        }
                    });
                } else {
                    vm.hours = vm.hoursAvailable;
                }
            }

            if (vm.reminderHour !== undefined) {
                if (vm.reminderDay == vm.day && vm.reminderMonth == vm.month && vm.reminderYear == vm.year && vm.reminderHour == vm.hour) {
                    vm.minsAvailable.forEach(function(i) {
                        if (i >= vm.min) {
                            vm.mins.push(i);
                        }
                    });
                } else {
                    vm.mins = vm.minsAvailable;
                }
            }

            vm.check = 0;

            vm.years.forEach(function(i) {
                if (i == vm.reminderYear) {
                    vm.check++;
                }
            });

            if (vm.check === 0) {
                vm.reminderYear = undefined;
            } else {
                vm.check = 0;
            }

            vm.hours.forEach(function(i) {
                if (i == vm.reminderHour) {
                    vm.check++;
                }
            });

            if (vm.check === 0) {
                vm.reminderHour = undefined;
            } else {
                vm.check = 0;
            }

            vm.mins.forEach(function(i) {
                if (i == vm.reminderMin) {
                    vm.check++;
                }
            });

            if (vm.check === 0) {
                vm.reminderMin = undefined;
            } else {
                vm.check = 0;
            }
        };

        if (!vm.reminders) {
            $http.get('/api/reminders/' + $stateParams.category).success(function (data) {
                vm.reminders = data;
                SessionService.set('reminders' + $stateParams.category, JSON.stringify(data));
                vm.hideOverlay = true;
            }).error(function (data) {
                $state.go('auth', {});
            });
        } else {
            vm.hideOverlay = true;
        }

        vm.create = function() {
            vm.reminderDate = vm.reminderYear + "-" + vm.reminderMonth + "-" + vm.reminderDay + " " + vm.reminderHour + ":" + vm.reminderMin + ":00";
            vm.reminderAddButton = $sce.trustAsHtml('<i class="fa fa-refresh fa-spin"></i>');
            $http.post('/api/reminders', {'text': vm.reminderText, 'date': vm.reminderDate, 'category': $stateParams.category}).success(function (data) {
                vm.reminders.push(data);
                vm.reminderText = "";
                vm.reminderDate = "";
                SessionService.set('reminders' + $stateParams.category, JSON.stringify(vm.reminders));
                vm.cats = JSON.parse(SessionService.get('categories'));
                for (vm.i = 0; vm.i < vm.cats.length; vm.i++) {
                    if (vm.cats[vm.i].id == $stateParams.category) {
                        vm.cats[vm.i].count++;
                    }
                }
                SessionService.set('categories', JSON.stringify(vm.cats));
                vm.reminderAddButton = $sce.trustAsHtml('<i class="fa fa-check"></i> Create Reminder');
            }).error(function (data) {
                $state.go('auth', {});
            });
        };

        vm.delete = function(id) {
            vm.reminderDelete = true;
            $http.delete('/api/reminders/' + id).success(function (data) {
                $http.get('/api/reminders/' + $stateParams.category).success(function (data) {
                    vm.reminders = data;
                    SessionService.set('reminders' + $stateParams.category, JSON.stringify(data));
                    vm.cats = JSON.parse(SessionService.get('categories'));
                    for (vm.i = 0; vm.i < vm.cats.length; vm.i++) {
                        if (vm.cats[vm.i].id == $stateParams.category) {
                            vm.cats[vm.i].count--;
                        }
                    }
                    SessionService.set('categories', JSON.stringify(vm.cats));
                    vm.reminderDelete = false;
                }).error(function (data) {
                    $state.go('auth', {});
                });
            }).error(function (data) {
                $state.go('auth', {});
            });
        };

        vm.refresh = function() {
            vm.refreshClass = "fa fa-refresh fa-spin";
            $http.get('/api/reminders/' + $stateParams.category).success(function (data) {
                vm.bookmarks = data;
                SessionService.set('reminders' + $stateParams.category, JSON.stringify(data));
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
