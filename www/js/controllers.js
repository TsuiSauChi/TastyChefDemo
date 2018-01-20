angular.module('app.controllers', [])
  
.controller('tastyChefCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cartCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('profileCtrl', ['$scope', '$stateParams','favService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,favService) {

    favService.all().then(function(result) {

      $scope.favArray = result;
    })
    
 $scope.toggleFav = function(item) {
        if (item.favIcon == "icon ion-ios-heart-outline") {
          item.favIcon = "icon ion-ios-heart";
            item.likes = item.likes +1;    
          favService.add(item);
        }
        else {
          item.favIcon = "icon ion-ios-heart-outline";
          favService.dislike(item);
        }
      }
}])

.controller('addrecipeCtrl', ['$scope', '$stateParams','recipeService', '$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,recipeService) {

  $scope.recipe = {
      name: null,
      image: null,
      portion: null,
      dificulty:null,
      type:null,
      date: new Date(),
  };
    
$scope.add = function() {
      
recipeService.add($scope.recipe.name,

                     $scope.recipe.image,

                     $scope.recipe.portion,

                     $scope.recipe.difficulty,

                     $scope.recipe.type,
                  
                     $scope.recipe.date);
  }
}])




.controller('recipeCtrl', ['$scope', '$stateParams','recipeService', 'favService','$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,recipeService,favService,$rootScope) {

   recipeService.all().then(function(result) {

      $scope.recipeArray = result;
       
       for (var i = 0; i < $scope.recipeArray.length; i++) {
        $scope.recipeArray[i].favIcon = "icon ion-ios-heart-outline";
          if (favService.isFav($scope.recipeArray[i]) >= 0){
            $scope.recipeArray[i].favIcon = "icon ion-ios-heart";
          }
          else{
            $scope.recipeArray[i].favIcon = "icon ion-ios-heart-outline";
          }
        }

        });
    
     $scope.toggleFav = function(item) {
        if (item.favIcon == "icon ion-ios-heart-outline") {
          item.favIcon = "icon ion-ios-heart";
          favService.add(item);
        }
        else {
          item.favIcon = "icon ion-ios-heart-outline";
          favService.dislike(item);
        }
      }
      
        var id = $stateParams.id;
        
       $scope.recipeDetailsArray = recipeService.getSpecificRecipe(id);
         
//        $scope.mySplit = function(item, nb) {
//            var ingred = recipeService.get(item);
//            var array = ingred.ingredient;
//            console.log(array);
//            return array[nb];
//        }
    
 
    
        $scope.split = function(item){
          $scope.recipeDetailsArray = recipeService.getSpecificRecipe(id);
            console.log(id);
            var ingred = recipeService.get(item);
            $scope.splitingred = ingred.ingredient.split(';;').toString();
             console.log($scope.splitingred);
        }
}])

.controller('recipeDetailsCtrl', ['$scope', '$stateParams','recipeService','favService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,recipeService,favService,$rootScope) {
    
        var id = $stateParams.id;
    
       $scope.recipeDetailsArray = recipeService.getSpecificRecipe(id);
    
}])

.controller('searchCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('categoryCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('recommendedRecipesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('nuritionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('orderedRecipeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('orderHistoryCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('paymentCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 