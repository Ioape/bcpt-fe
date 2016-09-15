'use strict';

angular.module('menu-rules', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/rules', {
            templateUrl: 'menu-rules/module.html'
        });
    }]);