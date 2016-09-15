'use strict';

angular.module('menu-rank', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/rank', {
            templateUrl: 'menu-rank/module.html'
        });
    }]);