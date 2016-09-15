'use strict';

angular.module('menu', ["ui.bootstrap"])

.constant("menuList", [])

/** 菜单 指令
    <menu></menu>
 */
.directive("menu", function(){

    var directiveDefinitionObject = {

        templateUrl: 'common/menu/module.html',
        transclude: false,
        restrict: 'E',
        scope: {
        },
        controller: ["$scope", "$element", "menuList", function($scope, $element, menuList) {
            $scope.menuList = menuList;
        }]
    };
    return directiveDefinitionObject;
});