'use strict';

angular.module('menu-upload', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/upload', {
            templateUrl: 'menu-upload/module.html'
        });
    }]);