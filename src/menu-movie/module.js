'use strict';

angular.module('menu-movie', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/movie', {
            templateUrl: 'menu-movie/module.html'
        });
    }]);