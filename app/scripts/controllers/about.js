'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testApp
 */
var host = 'http://162.250.78.47/api';
angular.module('testApp')
    .directive('ngEnter', function () {
    return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });
     
                    event.preventDefault();
                }
            });
        };
    })
    .factory('Ingredients', ['$resource', function($resource){
        var urlApi = '/ingredients/:ingredientId';
        urlApi = host + urlApi;
        var resource = $resource(urlApi, { }, {}  );
        return resource;
    }])
  .controller('PizzaCtrl', function ($scope, $routeParams, Pizzas, Ingredients, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log('routeParams');
    console.log($routeParams);
    var createPizza = function(){
        //TODO see how to make the update not reload the model
        $scope.pizza.$save({}, function(resp){
            $location.path('/');
        });
    
    }
    var getPizza = function(){
        if($routeParams && $routeParams.pizzaId){
            Pizzas.get({_id:$routeParams.pizzaId},function(resp){
                console.log('pizza');
                console.log(resp);
                $scope.pizza = resp;
            });
        }else{
            $scope.pizza =  new Pizzas({});
            $scope.updatePizza = createPizza;
        }
    };

    var updatePizza = function(){
        //TODO see how to make the update not reload the model
        $scope.pizza.$update({_id:$scope.pizza._id}, function(resp){
            getPizza();
        });
    
    }
    
    $scope.updatePizza = updatePizza;

    getPizza();
    Ingredients.query(function(resp){
        $scope.ingredients = resp;
    }); 

    $scope.addIngredient = function(ing){
        $scope.pizza.ingredients = $scope.pizza.ingredients || {};
        $scope.pizza.ingredients.push(ing.name);
        var keepReference = $scope.pizza;
        updatePizza();
    }

    $scope.removeIngredient = function(ing){
        var ingredients = $scope.pizza.ingredients;
        for (var i=ingredients.length-1; i>=0; i--) {
            if (ingredients[i] === ing) {
                ingredients.splice(i, 1);
                break;       //<-- Uncomment  if only the first term has to be removed
            }
        }
        updatePizza();
    };
  });
