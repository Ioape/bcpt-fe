'use strict';

angular.module('menu-record', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/record', {
            templateUrl: 'menu-record/module.html'
        });
    }]);