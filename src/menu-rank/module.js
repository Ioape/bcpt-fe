'use strict';

angular.module('menu-rank', [
        'ngRoute',
        'ui.bootstrap'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/rank', {
            templateUrl: 'menu-rank/module.html'
        });
    }])
    .controller('rankCtrl', [
        '$scope',
        '$http',
        'rankService',
        function ($scope, $http, rankService) {
            var data = {};
            rankService.getRankInfo().then(function (data) {
                $scope.rankInfo = data ? data : {};
            })
        }])
    .constant("rankURL", {
        getRankInfo: '/user/rank'
    })
    .factory('rankService', [
        "$http",
        'rankURL',
        function ($http, rankURL) {
            var service = {};
            service.getRankInfo = function () {
                return $http.get(rankURL.getRankInfo);
            };
            return service;
        }
    ]);