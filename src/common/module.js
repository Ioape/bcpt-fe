'use strict';

angular.module('common', ["ui.bootstrap"])

    .constant("commonURL", {
        "city": "/manager/common/city",
        "school": "/manager/school",
        "user": "/manager/common/user",
        "apartments":  "/manager/apartments/school",
        "departments": "/manager/departments/school",
        "majors": "/manager/majors/department"
    })

    .filter('trustHtml', ['$sce', function( $sce ){
        return function( text ){
            return $sce.trustAsHtml(text);
        }
    }])

    /**  通用suggest请求
     */
    .factory('commonSuggest', ['commonURL', '$http', function( commonURL, $http ){
        var service = {};

        service.getCitys = function(key) {
            return  $http.get(
                commonURL.city,
                {
                    params: {  key: key }
                }
            );
        };
        service.getSchools = function(key, cityId) {
            return  $http.get(
                commonURL.school,
                {
                    params: { key: key, "city.id": cityId||undefined }
                }
            );
        };
        service.getUsers = function(key, cityId, schoolId) {
            return  $http.get(
                commonURL.user,
                {
                    params: { key: key, "cityId": cityId||undefined, "schoolId": schoolId||undefined }
                }
            );
        };

        service.getApartments = function( schoolId ) {
            return  $http.get(
                commonURL.apartments,
                {
                    params: { schoolId: schoolId }
                }
            );
        };

        service.getDepartments = function( schoolId ) {
            return  $http.get(
                commonURL.departments,
                {
                    params: { schoolId: schoolId }
                }
            );
        };

        service.getMajors = function( departmenId ) {
            return  $http.get(
                commonURL.majors,
                {
                    params: { departmenId: departmenId }
                }
            );
        };

        return service;
    }])

    .factory('BCPT-utils', ["$q", "$timeout", function($q, $timeout) {
        var commonUtils = {};

        /** 函数防抖
         */
        commonUtils.fnLazy = function( context, fn, delay ){
            var timer = null;
            return function(){
                var _arguments = arguments;
                if( timer ){
                    $timeout.cancel(timer);
                }
                var deferred = $q.defer();
                timer = $timeout(function(){
                    timer = null;
                    var result = fn.apply(context, _arguments);
                    if(result && typeof result.then === 'function'){
                        result.then(
                            function(data){
                                deferred.resolve(data);
                            },
                            function(reason){
                                deferred.reject(reason);
                            })
                    } else {
                        deferred.resolve(result);
                    }

                }, delay||300);
                return deferred.promise;
            }
        };

        function _isEmptyCondition(condition){
            var result = true;
            for(var key in condition){
                var value = condition[key];
                if(angular.isFunction(value)){
                    continue;
                } else if( angular.isDate(value) ){
                    result = false;
                    break;
                } else if( angular.isArray(value) && value.length>0 ){
                    result = false;
                    break;
                } else if( angular.isObject(value) ){
                    if( !_isEmptyCondition(value) ){
                        result = false;
                        break;
                    }
                } else if(!!value || value=='0' ){
                    result = false;
                    break;
                }
            }
            return result;
        };

        /** 判断一个对象是否全部为空或空字符串  主要用于查询条件
         */
        commonUtils.isEmptyCondition = function(condition){
            return _isEmptyCondition(condition);
        }
        return commonUtils;
    }])

    .factory('selectCache',['$cacheFactory',function($cacheFactory){
        var cache = $cacheFactory("query");
        return  cache;
    }])
;
