'use strict';

angular.module('menu-usercp', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/usercp', {
            templateUrl: 'menu-usercp/module.html'
        });
    }]);