'use strict';

angular.module('menu-common', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/common', {
            templateUrl: 'menu-common/module.html'
        });
    }]);