/**
 * Created by liushiyao on 16/9/15.
 */

'use strict';

// Declare app level module which depends on views, and components
angular
    .module('BCPTAPP', [
        'ngRoute', 'ui.bootstrap', 'menu', 'user', 'common',
        'menu-rank', 'menu-usercp', 'menu-common',
        'menu-faq', 'menu-index', 'menu-subtitles', 'menu-movie',
        'menu-offers','menu-record','menu-upload','menu-staff','menu-rules'
    ])
    .value("LoginUrl", "/userLogin?returnUrl=" + encodeURIComponent(window.location.href))
    .config([
        '$routeProvider',
        '$httpProvider',
        'menuList',
        function ($routeProvider, $httpProvider, menuList) {

            $routeProvider.otherwise({redirectTo: '/index'});
            $httpProvider.interceptors.push('BCPTInterceptor');


            menuList.push(
                {name: '首页', url: '#index'},
                {name: '论坛', url: 'http://bbs.ghtt.net/forum-176-1.html'},
                {name: '影视', url: '#movie'},
                {name: '综合', url: '#common'},
                {name: '候选', url: '#offers'},
                {name: '发布', url: '#upload'},
                {name: '字幕', url: '#subtitles'},
                {name: '用户设置', url: '#usercp'},
                {name: '排行榜', url: '#rank'},
                {name: '日志', url: '#record'},
                {name: '规则', url: '#rules'},
                {name: '常见问题', url: '#faq'},
                {name: '管理组', url: '#staff'}
            );
        }
    ])
    .controller('BCPTAPPCtrl', [
        '$scope',
        'BCPTInterceptor',
        'appGlobal',
        '$uibModal',
        function ($scope, BCPTInterceptor,appGlobal,$uibModal) {
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

            appGlobal.setAlert( function( config ){
                $scope.showAlert( config.type, config.msg );
            } );
            appGlobal.setConfirm( function( title, content, config){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'global-confirm.html',
                    scope: $scope,
                    size: 'sm'
                });
                var defaultConfig = {
                    showOkBtn: true,
                    showCancelBtn: true
                };
                $scope.confirm = {
                    content: content,
                    title: title,
                    config: angular.extend(defaultConfig, config)
                };

                return modalInstance.result;
            } );
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
                                    appGlobal.showConfirm("登录提示", "登陆已失效", {showCancelBtn: false}).then(gotoLogin);
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




