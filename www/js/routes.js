angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('tabsController.home', {
        url: '/home',
        views: {
          'tab1': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
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
            controller: 'recipeDetailsCtrl'
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
        abstract: true
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      })

      .state('updateprofile', {
        url: '/updateprofile',
        templateUrl: 'templates/updateprofile.html',
        controller: 'updateprofileCtrl'
      })

      .state('GetStartedNutritionAssessment', {
        url: '/GetStartedNutritionAssessment',
        templateUrl: 'templates/GetStartedNutritionAssessment.html',
        controller: 'GetStartedNutritionAssessmentCtrl'
      })

      .state('AntropometricAssessmentPage', {
        url: '/AntropometricAssessmentPage',
        templateUrl: 'templates/AntropometricAssessmentPage.html',
        controller: 'AntropometricAssessmentPageCtrl'
      })

      .state('DietaryIntakeAssessmentPage', {
        url: '/DietaryIntakeAssessmentPage',
        templateUrl: 'templates/DietaryIntakeAssessmentPage.html',
        controller: 'DietaryIntakeAssessmentPageCtrl'
      })

      .state('MedicalConditionAssessmentPage', {
        url: '/MedicalConditionAssessmentPage',
        templateUrl: 'templates/MedicalConditionAssessmentPage.html',
        controller: 'MedicalConditionAssessmentPageCtrl'
      })

      .state('NutritionalAsessmentConfirmationPage', {
        url: '/NutritionalAsessmentConfirmationPage',
        templateUrl: 'templates/NutritionalAsessmentConfirmationPage.html',
        controller: 'NutritionalAsessmentConfirmationPageCtrl'
      })

      .state('NutritionProfilePage', {
        url: '/NutritionProfilePage',
        templateUrl: 'templates/NutritionProfilePage.html',
        controller: 'NutritionProfilePageCtrl'
      })

      .state('UpdateNutritionProfilePage', {
        url: '/UpdateNutritionProfilePage',
        templateUrl: 'templates/UpdateNutritionProfilePage.html',
        controller: 'UpdateNutritionProfilePageCrtl'
      })

      .state('deliveryMethod', {
        url: '/deliveryMethod',
        templateUrl: 'templates/deliveryMethod.html',
        controller: 'deliveryMethodCtrl'
      })

      .state('tabsController.adminRecipe', {
        url: '/adminRecipe',
        views: {
          'tab1': {
            templateUrl: 'templates/adminRecipe.html',
            controller: 'adminRecipeCtrl'
          }
        }
      })

      .state('tabsController.createRecipe', {
        url: '/createRecipe',
        views: {
          'tab2': {
            templateUrl: 'templates/createRecipe.html',
            controller: 'createRecipeCtrl'
          }
        }
      })

      .state('tabsController.recipeDetail', {
        url: '/recipeDetail/:id',
        views: {
          'tab1': {
            templateUrl: 'templates/recipeDetail.html',
            controller: 'recipeDetailCtrl'
          }
        }
      })

      .state('tabsController.updateRecipe', {
        url: '/updateRecipe',
        views: {
          'tab1': {
            templateUrl: 'templates/updateRecipe.html',
            controller: 'updateRecipeCtrl'
          }
        }
      })

      .state('tabsController.changeAvailability', {
        url: '/changeAvailability',
        views: {
          'tab3': {
            templateUrl: 'templates/changeAvailability.html',
            controller: 'changeAvailabilityCtrl'
          }
        }
      })


    $urlRouterProvider.otherwise('/page1/recipes')
  });

