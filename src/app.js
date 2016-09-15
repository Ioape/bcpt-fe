/**
 * Created by liushiyao on 16/9/15.
 */

'use strict';

// Declare app level module which depends on views, and components
angular
    .module('BCPTAPP', [
        'ngRoute',
        'ui.bootstrap',
        'menu'
    ])
    .value("LoginUrl", "/userLogin?returnUrl=" + encodeURIComponent(window.location.href))
    .config([
        '$routeProvider',
        '$httpProvider',
        'menuList',
        function ($routeProvider, $httpProvider, menuList) {

            $routeProvider.otherwise({redirectTo: '/index'});
            $httpProvider.interceptors.push('BCPTInterceptor');

            menuList.push({
                name: '用户', url: '#userManager'
            });
            menuList.push({
                name: '任务', url: '',
                children: [
                    {name: '任务管理', url: '#taskManager'},
                    {name: '任务统计（个人）', url: '#taskStatistics'}
                ]
            });
            menuList.push({
                name: '薪资', url: '',
                children: [
                    {name: '薪资查看(个人)', url: '#basisSalary'},
                    {name: '薪资查看(学校)', url: '#basisSalarySchool'}
                ]
            });
        }
    ])
    .controller('BCPTAPPCtrl', [
        '$scope',
        'BCPTInterceptor',
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
    ])
    .factory('appGlobal', function () {

        var confirmHandler = angular.noop;
        var alertHandler = angular.noop;

        return {
            setConfirm: function (callback) {
                confirmHandler = callback;
            },
            showConfirm: function (title, content, config) {
                return confirmHandler(title, content, config);
            },

            setAlert: function (callback) {
                alertHandler = callback;
            },
            showAlert: function (type, content) {
                return alertHandler(type, content);
            }
        }
    })
    .factory('BCPTInterceptor', [
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




