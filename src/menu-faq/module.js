'use strict';

angular.module('menu-faq', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/faq', {
            templateUrl: 'menu-faq/module.html'
        });
    }]);