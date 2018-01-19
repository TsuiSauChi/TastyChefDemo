
angular.module('app.controllers', ['firebase'])

  .controller('tastyChefCtrl', ['$scope', '$stateParams', '$state', 'HomeService', '$firebaseArray', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, HomeService, $firebaseArray) {

      firebase.auth().onAuthStateChanged(function (user) {
        console.log(user)
        if (user.email == "admin@tastychef.com") {
          $scope.admin = {
            "display": "block",
          }
        } else {
          $scope.admin = {
            "display": "none",
          }
        }
      });

      $scope.signOut = function () {
        firebase.auth().signOut().then(function () {
          console.log("Sign-out successful");
          $state.go('login');
        }).catch(function (error) {
          console.log("Error");
        });
      }

    }])

  .controller('homeCtrl', ['$scope', '$stateParams','$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $ionicPlatform) {
    }])

  .controller('cartCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }])

  .controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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

  .controller('recipeCtrl', ['$scope', '$stateParams', 'recipeService', 'favService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, recipeService, favService) {

      recipeService.all().then(function (result) {
        $scope.recipeArray = result;
        for (var i = 0; i < $scope.recipeArray.length; i++) {
          if (favService.isFav($scope.recipeArray[i]) >= 0)
            $scope.recipeArray[i].favIcon = "icon ion-ios-heart";
          else
            $scope.recipeArray[i].favIcon = "icon ion-ios-heart-outline";
        }

      });

      $scope.toggleFav = function (item) {
        if (item.favIcon == "icon ion-ios-heart-outline") {
          item.favIcon = "icon ion-ios-heart";
          favService.add(item);
        }
        else {
          item.favIcon = "icon ion-ios-heart-outline";
          favService.dislike(item);
        }
      }

    }])

  .controller('recipeDetailsCtrl', ['$scope', '$stateParams', 'recipeService', 'favService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, recipeService, favService) {
      var id = $stateParams.id;

      $scope.recipeDetailsArray = recipeService.getSpecificRecipe(id);
    }])



  .controller('recommendedRecipesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    function ($scope, $stateParams) {
    }])

  .controller('searchCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }])

  .controller('GetStartedNutritionAssessmentCtrl', ['$scope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $state) {
      $scope.next = function () {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user != null) {
            $state.go('AntropometricAssessmentPage');

          } else {
            $state.go('login');
          }
        });
      }

    }])

  .controller('AntropometricAssessmentPageCtrl', ['$scope', '$stateParams', 'NPService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, NPService) {

      $scope.addAntropometricAssessmentInput = function (nutritionprofile) {

        var item = NPService.get();
        item.push(nutritionprofile);
        console.log(item);

        console.log(item[0].height);

        //NutritionProfileService.add(nutritionprofile);
      }


    }])
  .controller('DietaryIntakeAssessmentPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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

  .controller('MedicalConditionAssessmentPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    function ($scope, $stateParams) {
    }])


  .controller('recommendedRecipesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])
  .controller('NutritionalAsessmentConfirmationPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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

  .controller('orderHistoryCtrl', ['$scope', '$stateParams', 'PaypalFactory',
    function ($scope, $stateParams, PaypalFactory) {
    }])

  .controller('paymentCtrl', ['$scope', '$stateParams', 'PaypalFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, PaypalFactory) {
      $scope.subscriptionName = 'MASTERCARD';
      $scope.subscriptionPrice = 'Price from Cart Page';

      $scope.payWithPayPal = function () {
        PaypalFactory.initPaymentUI().then(function () {
          PaypalFactory.makePayment($scope.subscriptionPrice, $scope.subscriptionName).then(function (data) {
            console.dir(data, 'Paypal Purchase');
          }, function (err) {
            console.dir(err, 'Paypal Purchase Canceled, Try Again');
          });
        });
      };

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

  .controller('registerCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', 'HomeService',
    function ($scope, $stateParams, $state, $ionicPopup, HomeService) {

      $scope.doRegister = function (registerData) {
        if (registerData.password === registerData.repassword) {
          firebase.auth().createUserWithEmailAndPassword(registerData.email, registerData.password).then(function (data) {
            //Pop up function
            var alertPopup = $ionicPopup.alert({
              title: 'Registered Successfully',
            });
            alertPopup.then(function (res) {
              console.log(res, "Register Success")
            });
            //$state.go('login');
          }).then(function () {
            var role;
            HomeService.addMember(
              registerData.birth,
              registerData.email,
              registerData.gender,
              registerData.mobile,
              registerData.password,
              registerData.username,
              role = "member"
            );
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
