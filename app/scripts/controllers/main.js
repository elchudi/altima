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
        var urlApi = '/pizzas';
        urlApi = host + urlApi;
        var resource = $resource(urlApi, {
                    }, {'get': { method: 'GET', isArray: true }}  );
        return resource;
    }])
    .factory('Pizza', ['$resource', function($resource){
        var host = 'http://162.250.78.47/api';
        var urlApi = '/pizzas/:pizzaId';
        urlApi = host + urlApi;
        var resource = $resource(urlApi, {
                    }, {'get': { method: 'GET', isArray: true }}  );
        return resource;
    }])

  .controller('MainCtrl', function ($scope, Pizzas) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Pizzas.get(function(resp){
        console.log('response');
        console.log(resp);
        $scope.pizzas = resp;
    });
  });
