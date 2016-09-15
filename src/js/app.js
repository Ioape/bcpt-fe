/**
 * Created by liushiyao on 16/9/15.
 */

'use strict';

// Declare app level module which depends on views, and components
angular.module('BCPTAPP', [
    'ngRoute',
    'ui.bootstrap'
]).value("LoginUrl", "/userLogin?returnUrl=" + encodeURIComponent(window.location.href)).config([
    '$routeProvider',
    '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/index'});
        $httpProvider.interceptors.push('BCPT-interceptor');
    }
]).controller('BCPTAPPCtrl', [
    "$scope",
    'HLJ-interceptor',
    function ($scope, BCPTInterceptor) {
        $scope.alerts = [];
        $scope.showAlert = function (type, msg) {
            $scope.alerts.push({type: type || 'danger', msg: msg});
        };
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        BCPTInterceptor.setResponseErrorHanlder(function (msg) {
            $scope.showAlert('danger', msg);
        });
    }
]).factory('BCPT-interceptor', [
    "$q",
    "$httpParamSerializerJQLike",
    "$location",
    "LoginUrl",
    "appGlobal",
    function ($q, $httpParamSerializerJQLike, $location, LoginUrl, appGlobal) {
        var responseErrorHanlder = null;

        function gotoLogin() {
            window.location.replace(LoginUrl);
        }

        return {
            'setResponseErrorHanlder': function (handler) {
                responseErrorHanlder = handler;
            },
            // optional method
            'request': function (config) {
                if (config.jqLike) {
                    config.data = $httpParamSerializerJQLike(config.data);
                    config.headers = {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    }
                }
                return config;
            },
            // optional method
            'response': function (response) {
                var result = $q.defer();
                if (!angular.isUndefined(response.data.code)) {
                    if (response.data.code === 0) {
                        result.resolve(response.data.body);
                    } else {
                        switch (response.data.code + "") {
                            case "401" :
                            {
                                appGlobal.showConfirm("登录提示", "请先去登录吧！", {showCancelBtn: false}).then(gotoLogin);
                                break;
                            }
                            default:
                            {
                                result.reject(response.data.body);
                                (responseErrorHanlder || angular.noop)(response.data.body);
                            }
                        }
                    }
                } else {
                    result.resolve(response);
                }
                return result.promise;
            },
            'responseError': function (rejection) {
                var result = $q.reject(rejection.statusText || rejection.data);
                (responseErrorHanlder || angular.noop)(rejection.statusText || rejection.data);
                return result;
            }
        };
    }]);




