/* global angular */
/* global stampit */
'use strict';

const createStamp = stampit.default;

const geopardyApp = angular.module('geopardyApp', []);

geopardyApp.controller('geopardyController', ['$scope', '$http', ($scope, $http) => {
  console.log('Hi');
}]);
