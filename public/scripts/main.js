/* global angular */
/* global stampit */
'use strict';


const geopardyApp = angular.module('geopardyApp', []);

geopardyApp.factory('Stampit', () => {
  const Stampit = stampit.default;
  return Stampit;
});

geopardyApp.controller('geopardyController', ['$scope', '$http', 'Stampit', ($scope, $http, Stampit) => {
  console.log(Stampit);
}]);
