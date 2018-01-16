angular.module('app.controllers', ['firebase'])


  .controller('tastyChefCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state) {

      $scope.signOut = function () {
        firebase.auth().signOut().then(function () {
          console.log("Sign-out successful");
          $state.go('login');
        }).catch(function (error) {
          console.log("Error");
        });
      }

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

  .controller('addrecipeCtrl', ['$scope', '$stateParams', 'recipeService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, recipeService) {
      $scope.recipe = {
        name: null,
        image: null,
        portion: null,
        dificulty: null,
        type: null,
        date: new Date(),
      };


      $scope.add = function () {

        recipeService.add($scope.recipe.name,
          $scope.recipe.image,
          $scope.recipe.portion,
          $scope.recipe.difficulty,
          $scope.recipe.type,
          $scope.recipe.date);
      }
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

  .controller('profileCtrl', ['$scope', '$stateParams', '$sce',
    function ($scope, $stateParams, $sce) {

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          $scope.profileName = user.displayName;
          $scope.profileImage = user.photoURL;
          $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
          };
        } else {
          $scope.profileName = "Guest User";
          $scope.profileImage = "../guestuser.png";
        }
      });


    }])

  .controller('recipeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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

  .controller('loginCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup',
    function ($scope, $stateParams, $state, $ionicPopup, ) {

      $scope.doLogin = function (loginData) {
        firebase.auth().signInWithEmailAndPassword(loginData.username, loginData.password).then(function (data) {
          console.log(data, "Login Successfully");
          $state.go('tabsController.home');
        }).catch(function (error) {
          // Pop up function
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: 'Invalid username or password'
          });
          alertPopup.then(function (res) {
            // Handle Errors here
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage, "Login Failed")
          });

        });
      }

      $scope.loginFacebook = function () {
        // Sign in using a popup.
        var provider = new firebase.auth.FacebookAuthProvider();
        console.log(provider);
        firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a Facebook Access Token.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          $state.go('tabsController.home');
          console.log(user, "Login Successfully");
        });
      }
    }])

  .controller('registerCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup',
    function ($scope, $stateParams, $state, $ionicPopup) {

      $scope.doRegister = function (registerData) {
        console.log(registerData.password, registerData.repassword);
        if (registerData.password === registerData.repassword) {
          firebase.auth().createUserWithEmailAndPassword(registerData.email, registerData.password).then(function (data) {
            //Pop up function
            var alertPopup = $ionicPopup.alert({
              title: 'Registered Successfully',
            });
            alertPopup.then(function (res) {
              console.log(res, "Register Success")
            });

            $state.go('login');
          }).catch(function (error) {
            //Pop up function
            var alertPopup = $ionicPopup.alert({
              title: 'Registration Failed',
              template: 'Password should be at least 6 characters',
            });
            alertPopup.then(function (res) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode, errorMessage, "Registered Failed"
              )
            });
          });
        } else {
          var alertPopup = $ionicPopup.alert({
            title: 'Registration Failed',
            template: 'Password does not match"'
          });
          alertPopup.then(function (res) {
            console.log(res, "Registered Failed - password does not match"
            )
          });
        }
      }
    }])
