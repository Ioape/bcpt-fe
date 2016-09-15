'use strict';

angular.module('menu-offers', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/offers', {
            templateUrl: 'menu-offers/module.html'
        });
    }]);