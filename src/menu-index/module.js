'use strict';

angular.module('menu-index', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'menu-index/module.html'
        });
    }]);