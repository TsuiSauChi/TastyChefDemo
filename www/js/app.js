// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'firebaseService'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('app.recipes', {
        url: '/recipes',
        views: {
          'menuContent': {
            templateUrl: 'templates/recipes.html',
            controller: 'RecipesCtrl'
          }
        }
      })

      .state('app.recrecipes', {
        url: '/recrecipes',
        views: {
          'menuContent': {
            templateUrl: 'templates/recrecipes.html',
            controller: 'RecrecipesCtrl'
          }
        }
      })
      .state('app.nurition', {
        url: '/nurition',
        views: {
          'menuContent': {
            templateUrl: 'templates/nurition.html',
            controller: 'NuritionCtrl'
          }
        }
      })

      .state('app.shoppingcart', {
        url: '/shoppingcart',
        views: {
          'menuContent': {
            templateUrl: 'templates/shoppingcart.html',
            controller: 'ShoppingcartCtrl'
          }
        }
      })

      .state('app.order', {
        url: '/order',
        views: {
          'menuContent': {
            templateUrl: 'templates/order.html',
            controller: 'OrderCtrl'
          }
        }
      })

      .state('app.history', {
        url: '/history',
        views: {
          'menuContent': {
            templateUrl: 'templates/history.html',
            controller: 'HistoryCtrl'
          }
        }
      })

      .state('app.payment', {
        url: '/payment',
        views: {
          'menuContent': {
            templateUrl: 'templates/payment.html',
            controller: 'PaymentCtrl'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });
