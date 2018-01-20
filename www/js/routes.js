angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.search', {
    url: '/search',
    views: {
      'tab1': {
        templateUrl: 'templates/search.html',
        controller: 'recipeCtrl'
      }
    }
  })
    
       .state('tabsController.searched', {
    url: '/searched/:cat',
    views: {
      'tab1': {
        templateUrl: 'templates/searched.html',
        controller: 'recipeCtrl'
      }
    }
  })

  .state('tabsController.cart', {
    url: '/shoppingcart',
    views: {
      'tab4': {
        templateUrl: 'templates/cart.html',
        controller: 'cartCtrl'
      }
    }
  })

  .state('tabsController.profile', {
    url: '/profile',
    views: {
      'tab3': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('tabsController.recipe', {
    url: '/recipes',
    views: {
      'tab2': {
        templateUrl: 'templates/recipe.html',
        controller: 'recipeCtrl'
      }
    }
  })
    
    .state('tabsController.recipeDetails', {
    url: '/recipeDetails/:id',
    views: {
      'tab2': {
        templateUrl: 'templates/recipeDetails.html',
        controller: 'recipeCtrl'
      }
    }
  })
    
     .state('tabsController.recipeView', {
    url: '/recipeView',
    views: {
      'tab2': {
        templateUrl: 'templates/recipeView.html',
        controller: 'recipeCtrl'
      }
    }
  })
 
    
 .state('addrecipe', {
     url: '/addrecipe',
     templateUrl: 'templates/addrecipe.html',
     controller: 'addrecipeCtrl'
  })
    
 .state('category', {
     url: '/category',
     templateUrl: 'templates/category.html',
     controller: 'categoryCtrl'
  })

  .state('recommendedRecipes', {
    url: '/recommendedrecipe',
    templateUrl: 'templates/recommendedRecipes.html',
    controller: 'recommendedRecipesCtrl'
  })

  .state('nurition', {
    url: '/nutrition',
    templateUrl: 'templates/nurition.html',
    controller: 'nuritionCtrl'
  })

  .state('orderedRecipe', {
    url: '/orderedrecipe',
    templateUrl: 'templates/orderedRecipe.html',
    controller: 'orderedRecipeCtrl'
  })

  .state('orderHistory', {
    url: '/orderHistory',
    templateUrl: 'templates/orderHistory.html',
    controller: 'orderHistoryCtrl'
  })

  .state('payment', {
    url: '/payment',
    templateUrl: 'templates/payment.html',
    controller: 'paymentCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

$urlRouterProvider.otherwise('/page1/recipes')


});