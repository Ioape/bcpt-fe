'use strict';

angular.module('menu-subtitles', [
    'ngRoute',
    'ui.bootstrap',
    'common'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/subtitles', {
            templateUrl: 'menu-subtitles/module.html'
        });
    }]);