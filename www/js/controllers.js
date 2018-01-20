angular.module('app.controllers', ['firebase'])


  .controller('tastyChefCtrl', ['$scope', '$stateParams', '$state', 'nutritionProfileService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, nutritionProfileService) {

      $scope.init = function () {
        firebase.auth().onAuthStateChanged((user) => {
          nutritionProfileService.get(user.uid).on('value', function (snapshot) {
            var hasProfile = snapshot.val();
            if (hasProfile == null) {
              $scope.hasProfile = false;
            } else {
              $scope.hasProfile = true;
            }
          })
        })
      }

      $scope.signOut = function () {
        firebase.auth().signOut().then(function () {
          console.log("Sign-out successful");
          $state.go('login');
        }).catch(function (error) {
          console.log("Error");
        });
      }


    }])

  .controller('homeCtrl', ['$scope', '$stateParams', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
      $scope.array = [
        { "name": "Little or no exercise", "value": "1.2" },
        { "name": "Light exercise/sports 1 to 3 days per week", "value": "1.375" },
        { "name": "Moderate exercise/sports 6 to 7 days per week", "value": "1.55" },
        { "name": "Hard exercise every day or exercise 2 times a day", "value": "1.725" },
        { "name": "Hard exercise 2 or more times per day", "value": "1.9" }]
      //declare
      $scope.showActivity = { activity: "" }
      $scope.nutritionprofile = { activityLevel: "" }
      $scope.showActivity.activity = $scope.array[0]
      $scope.addAntropometricAssessmentInput = function () {
        $scope.nutritionprofile.activityLevel = $scope.showActivity.activity.value
        var item = NPService.get();
        item.push($scope.nutritionprofile);
        console.log(item);
      }
    }])

  .controller('DietaryIntakeAssessmentPageCtrl', ['$scope', '$stateParams', 'NPService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    function ($scope, $stateParams, NPService) {
      //Diet Type
      $scope.DietTypeArray = [
        { "name": "None" },
        { "name": "Vegetarian" },
        { "name": "Vegan" },
        { "name": "Atkins/Ketogenic" }]
      $scope.None = false;
      $scope.AvoidNone = false;

      $scope.nutritionprofile = { "DietType": "", "MealFrequency": "", "SnackFrequency": "" }
      $scope.nutritionprofile.DietType = $scope.DietTypeArray[0]

      //Meal Frequency
      $scope.MealFrequencyArray = [
        { "name": "1 times per day", "Value": 1 },
        { "name": "2 times per day", "Value": 2 },
        { "name": "3 times per day", "Value": 3 },
        { "name": "4 times per day", "Value": 4 },
        { "name": "5 times per day", "Value": 5 },
        { "name": "6 times per day", "Value": 6 }]
      $scope.nutritionprofile.MealFrequency = $scope.MealFrequencyArray[2]

      $scope.snackArray = [
        { "name": "None", "Value": 0 },
        { "name": "1 times per day", "Value": 1 },
        { "name": "2 times per day", "Value": 2 },
        { "name": "3 times per day", "Value": 3 },
        { "name": "4 times per day", "Value": 4 },
        { "name": "5 times per day", "Value": 5 },
        { "name": "6 times per day", "Value": 6 }
      ]
      $scope.nutritionprofile.SnackFrequency = $scope.snackArray[0]

      $scope.foodallergycheckbox = [
        { "name": "Egg", "checked": false },
        { "name": "Fish", "checked": false },
        { "name": "Milk", "checked": false },
        { "name": "Peanuts", "checked": false },
        { "name": "Shellfish", "checked": false },
        { "name": "Soy", "checked": false },
        { "name": "Tree-Nuts", "checked": false },
        { "name": "Wheat", "checked": false }
      ]

      $scope.foodavoidancecheckbox = [
        { "name": "Beef", "checked": false },
        { "name": "Cheese", "checked": false },
        { "name": "Mutton", "checked": false },
        { "name": "Onion", "checked": false }
      ]

      $scope.clickNone = function () {
        $scope.None = !$scope.None;
        for (var i = 0; i < $scope.foodallergycheckbox.length; i++) {
          $scope.foodallergycheckbox[i].checked = $scope.None
        }
      }

      $scope.clickAvoidanceNone = function () {
        $scope.AvoidNone = !$scope.AvoidNone;
        for (var i = 0; i < $scope.foodavoidancecheckbox.length; i++) {
          $scope.foodavoidancecheckbox[i].checked = $scope.AvoidNone
        }
      }

      $scope.addDietaryIntakeAssessmentInput = function () {
        var allergies = ""
        if ($scope.None) {
          allergies = "None";
        } else {
          for (var i = 0; i < $scope.foodallergycheckbox.length; i++) {
            if ($scope.foodallergycheckbox[i].checked) {
              allergies = allergies + $scope.foodallergycheckbox[i].name + ";";
            }
          }
          allergies = allergies.slice(0, -1);
        }
        var avoidance = ""
        if ($scope.AvoidNone) {
          avoidance = "None";
        } else {
          for (var i = 0; i < $scope.foodavoidancecheckbox.length; i++) {
            if ($scope.foodavoidancecheckbox[i].checked) {
              avoidance = avoidance + $scope.foodavoidancecheckbox[i].name + ";";
            }
          }
          avoidance = avoidance.slice(0, -1);
        }
        var tempProfile = {
          "DietType": $scope.nutritionprofile.DietType.name,
          "MealFrequency": $scope.nutritionprofile.MealFrequency.Value,
          "SnackFrequency": $scope.nutritionprofile.SnackFrequency.Value,
          "foodallergy": allergies,
          "foodavoidance": avoidance

        }
        var item = NPService.get();
        item.push(tempProfile);
        console.log(item);
      }
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

  .controller('recipeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controllerr
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])
  .controller('MedicalConditionAssessmentPageCtrl', ['$scope', '$stateParams', 'NPService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    function ($scope, $stateParams, NPService) {
      $scope.glucoseLevel = { "text": "" }
      //Diet Type
      $scope.MedicalConditionArray = [
        { "name": "Diabetes", "checked": false },
        { "name": "Hypertension", "checked": false }]
      $scope.none = false
      $scope.clickNone = function () {
        $scope.none = !$scope.none;
        for (var i = 0; i < $scope.MedicalConditionArray.length; i++) {
          $scope.MedicalConditionArray[i].checked = $scope.none;
        }
      }

      $scope.addDietaryIntakeAssessmentInput = function () {
        var medcon = "";
        if ($scope.none) {
          medcon = "none";
        } else {
          for (var i = 0; i < $scope.MedicalConditionArray.length; i++) {
            if ($scope.MedicalConditionArray[i].checked) {
              medcon = medcon + $scope.MedicalConditionArray[i].name + ";";
            }
          }
          medcon = medcon.slice(0, -1);
        }

        var item = NPService.get();
        item.push({
          medicalCondition: medcon,
          glucoseLevel: $scope.glucoseLevel.text
        });
        console.log(item);
      }
    }])


  .controller('recommendedRecipesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])
  .controller('NutritionalAsessmentConfirmationPageCtrl', ['$scope', '$stateParams', 'NPService', 'nutritionProfileService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    function ($scope, $stateParams, NPService, nutritionProfileService) {
      $scope.nutritionprofile = NPService.get();
      //create
      $scope.submit = function () {
        firebase.auth().onAuthStateChanged((user) => {
          nutritionProfileService.add(user.uid, $scope.nutritionprofile);
        });
      }

      $scope.showActivityLevel = function (value) {
        if (value === "1.2") {
          return "Little or no exercise";
        }
        else if (value === "1.375") {
          return "Light exercise/sports 1 to 3 days per week";
        }
        else if (value === "1.55") {
          return "Moderate exercise/sports 6 to 7 days per week";
        }
        else if (value === "1.725") {
          return "Hard exercise every day or exercise 2 times a day";
        }
        else if (value === "1.9") {
          return "Hard exercise 2 or more times per day";
        }
      }

    }])
  .controller('NutritionProfilePageCtrl', ['$scope', '$stateParams', 'NPService', 'nutritionProfileService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    function ($scope, $stateParams, NPService, nutritionProfileService) {
      firebase.auth().onAuthStateChanged((user) => {
        nutritionProfileService.get(user.uid).on('value', function (snapshot) {
          $scope.nProfile = snapshot.val();
        });
      });
    }])

  .controller('UpdateNutritionProfilePageCrtl', ['$scope', '$stateParams', 'NPService', 'nutritionProfileService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    function ($scope, $stateParams, NPService, nutritionProfileService) {
      $scope.DietTypeArray = [
        { "name": "None" },
        { "name": "Vegetarian" },
        { "name": "Vegan" },
        { "name": "Atkins/Ketogenic" }
      ]

      //Meal Frequency
      $scope.MealFrequencyArray = [
        { "name": "1 times per day", "Value": 1 },
        { "name": "2 times per day", "Value": 2 },
        { "name": "3 times per day", "Value": 3 },
        { "name": "4 times per day", "Value": 4 },
        { "name": "5 times per day", "Value": 5 },
        { "name": "6 times per day", "Value": 6 }]

      $scope.snackArray = [
        { "name": "None", "Value": 0 },
        { "name": "1 times per day", "Value": 1 },
        { "name": "2 times per day", "Value": 2 },
        { "name": "3 times per day", "Value": 3 },
        { "name": "4 times per day", "Value": 4 },
        { "name": "5 times per day", "Value": 5 },
        { "name": "6 times per day", "Value": 6 }
      ]

      $scope.foodallergycheckbox = [
        { "name": "Egg", "checked": false },
        { "name": "Fish", "checked": false },
        { "name": "Milk", "checked": false },
        { "name": "Peanuts", "checked": false },
        { "name": "Shellfish", "checked": false },
        { "name": "Soy", "checked": false },
        { "name": "Tree-Nuts", "checked": false },
        { "name": "Wheat", "checked": false }
      ]

      $scope.foodavoidancecheckbox = [
        { "name": "Beef", "checked": false },
        { "name": "Cheese", "checked": false },
        { "name": "Mutton", "checked": false },
        { "name": "Onion", "checked": false }
      ]

      $scope.activityArr = [
        { "name": "Little or no exercise", "value": "1.2" },
        { "name": "Light exercise/sports 1 to 3 days per week", "value": "1.375" },
        { "name": "Moderate exercise/sports 6 to 7 days per week", "value": "1.55" },
        { "name": "Hard exercise every day or exercise 2 times a day", "value": "1.725" },
        { "name": "Hard exercise 2 or more times per day", "value": "1.9" }
      ]

      $scope.MedicalConditionArray = [
        { "name": "Diabetes", "checked": false },
        { "name": "Hypertension", "checked": false }
      ]

      $scope.AllergyNone = false;
      $scope.AvoidanceNone = false;
      $scope.ConditionNone = false;
      var userId = ""

      firebase.auth().onAuthStateChanged((user) => {
        userId = user.uid;
        nutritionProfileService.get(user.uid).on('value', function (snapshot) {

          $scope.nProfile = snapshot.val();
          $scope.updateProfile = [
            {
              height: $scope.nProfile.Height,
              weight: $scope.nProfile.Weight,
              activityLevel: $scope.nProfile.ActivityLevel
            },
            {
              "DietType": $scope.nProfile.DietType,
              foodallergy: $scope.nProfile.FoodAllergies,
              foodavoidance: $scope.nProfile.FoodAvoidance,
              MealFrequency: $scope.nProfile.MealFrequency,
              SnackFrequency: $scope.nProfile.SnackFrequency
            },
            {
              medicalCondition: $scope.nProfile.MedicalConditions,
              glucoseLevel: $scope.nProfile.GlucoseLevel
            }
          ]
          console.log($scope.updateProfile)
          if ($scope.nProfile.FoodAllergies === "None") {
            $scope.AllergyNone = true;
          } else {
            var allergyTemp = $scope.nProfile.FoodAllergies.split(";")
            $scope.foodallergycheckbox.forEach(function (allergy) {
              if (allergyTemp.indexOf(allergy.name) > -1) {
                allergy.checked = true;
              }
            })
          }

          if ($scope.nProfile.FoodAvoidance === "None") {
            $scope.AvoidanceNone = true;
          } else {
            var avoidanceTemp = $scope.nProfile.FoodAvoidance.split(";")
            $scope.foodavoidancecheckbox.forEach(function (avoidance) {
              if (avoidanceTemp.indexOf(avoidance.name) > -1) {
                avoidance.checked = true;
              }
            })
          }

          if ($scope.nProfile.MedicalConditions === "None") {
            $scope.ConditionNone = true;
          } else {
            $scope.MedicalConditionArray.forEach(function (med) {
              if ($scope.nProfile.MedicalConditions.indexOf(med.name) > -1) {
                med.checked = true;
              }
            })
          }

        })
      });

      $scope.clickAllergyNone = function () {
        $scope.AllergyNone = !$scope.AllergyNone;
        $scope.foodallergycheckbox.forEach(function (allergy) {
          allergy.checked = false;
        })
      }

      $scope.clickAvoidanceNone = function () {
        $scope.AvoidanceNone = !$scope.AvoidanceNone;
        $scope.foodavoidancecheckbox.forEach(function (a) {
          a.checked = false;
        })
      }

      $scope.clickConditionNone = function () {
        $scope.ConditionNone = !$scope.ConditionNone;
        $scope.MedicalConditionArray.forEach(function (a) {
          a.checked = false;
        })
      }

      $scope.updateNutProfile = function () {
        if ($scope.ConditionNone) {
          $scope.updateProfile[2].medicalCondition = "None"
        } else {
          var temp = ""
          $scope.MedicalConditionArray.forEach(function (a) {
            if (a.checked) {
              temp = temp + a.name + ";";
            }
          })

          $scope.updateProfile[2].medicalCondition = temp.slice(0, -1);
        }
        if ($scope.AvoidanceNone) {
          $scope.updateProfile[1].foodavoidance = "None"
        } else {
          var temp = ""
          $scope.foodavoidancecheckbox.forEach(function (a) {
            if (a.checked) {
              temp = temp + a.name + ";";
            }
          })
          $scope.updateProfile[1].foodavoidance = temp.slice(0, -1);
        }
        if ($scope.AllergyNone) {
          $scope.updateProfile[1].foodallergy = "None"
        } else {
          var temp = ""
          $scope.foodallergycheckbox.forEach(function (a) {
            if (a.checked) {
              temp = temp + a.name + ";";
            }
          })
          $scope.updateProfile[1].foodallergy = temp.slice(0, -1);
        }
        nutritionProfileService.add(userId, $scope.updateProfile);
      }

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
