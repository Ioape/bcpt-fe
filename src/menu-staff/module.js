'use strict';

angular.module('menu-staff', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/staff', {
            templateUrl: 'menu-staff/module.html'
        });
    }]);