'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp')
    .factory('Pizzas', ['$resource', function($resource){
        var host = 'http://162.250.78.47/api';
        var urlApi = '/pizzas/:_id';
        urlApi = host + urlApi;
        var resource = $resource(urlApi, { }, {'update': { method: 'PUT' }}  );
        return resource;
    }])
  .controller('MainCtrl', function ($scope, Pizzas) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Pizzas.query(function(resp){
        console.log('response');
        console.log(resp);
        $scope.pizzas = resp;
    });
  });
