'use strict';

angular.module('user', ["ui.bootstrap"])
    /** 菜单 指令
     <user></user>
     */
    .controller('userCtrl', [
        '$scope',
        '$http',
        'userService',
        function ($scope, $http, userService) {
            var data = {};
            data = userService.getUserInfo().then(function (data) {
                $scope.user = data ? data : {};
                $scope.user.name = 1;
                $scope.user.mybonus = 2;
                $scope.user.invite = 3;
                $scope.user.share = '';
                $scope.user.download = '';
                $scope.user.share = '';
            });
        }
    ])
    .constant("userURL", {
        getUserInfo: '/user/info'
    })
    .factory('userService', [
        'userURL',
        '$http',
        function (userURL, $http) {
            var service = {};
            service.getUserInfo = function () {
                return $http.get(userURL.getUserInfo);
            };
            return service;
        }
    ])
    .directive("user", function () {

        var directiveDefinitionObject = {
            templateUrl: 'common/user/module.html',
            transclude: false,
            restrict: 'E',
        };
        return directiveDefinitionObject;
    });