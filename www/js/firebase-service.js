angular.module('firebaseService', ['firebase'])
  // ----------- HOME
  .factory('HomeService', ['$firebaseArray',

    function ($firebaseArray) {

      var config = {
        apiKey: "AIzaSyDW5o-5259QI8DZ8I-IT0vKIFyB5P7ahRk",
        authDomain: "tastychefdemo-20139.firebaseapp.com",
        databaseURL: "https://tastychefdemo-20139.firebaseio.com",
        projectId: "tastychefdemo-20139",
        storageBucket: "tastychefdemo-20139.appspot.com",
        messagingSenderId: "648974068968"
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }

      var ref = firebase.database().ref().child("home");
      var HomeArray = $firebaseArray(ref);

      return {
        add: function (user, fDate, tDate, type, status) {
          // Transform Date to string
          var HomeItem = {
            name: user,
            fromDate: fDate.toDateString(),
            toDate: tDate.toDateString(),
            type: type,
            status: status
          };
          HomeArray.$add(HomeItem);
        },

        all: function () {
          return HomeArray.$loaded().then(function () {
            return HomeArray;
          });
        },

        get: function (item) {
          var item = HomeArray.$getRecord(item.$id);
          return item;
        },

        getPending: function () {
          var query = ref.orderByChild("status").equalTo("pending");
          var pendingArray = $firebaseArray(query);
          return pendingArray.$loaded().then(function () {
            return pendingArray;
          });
        },

        changeStatus: function (item, newStatus) {
          var item = HomeArray.$getRecord(item.$id);
          item.status = newStatus;
          HomeArray.$save(item);
        },

        delete: function (item) {
          var item = HomeArray.$getRecord(item.$id);
          HomeArray.$remove(item);
        },
      }
    }])

  // ----------- Recipe
  .factory('recipeService', ['$firebaseArray',

    function ($firebaseArray) {

      var config = {
        apiKey: "AIzaSyDW5o-5259QI8DZ8I-IT0vKIFyB5P7ahRk",
        authDomain: "tastychefdemo-20139.firebaseapp.com",
        databaseURL: "https://tastychefdemo-20139.firebaseio.com",
        projectId: "tastychefdemo-20139",
        storageBucket: "tastychefdemo-20139.appspot.com",
        messagingSenderId: "648974068968"
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }

      var ref = firebase.database().ref().child("recipe");

      var recipeArray = $firebaseArray(ref);

      return {
        add: function (rname, rimage, rportion, rdifficulty, rtype, rdate) {
          // Transform Date to string
          var recipeItem = {
            ref: rname,
            name: rname,
            image: rimage,
            portion: rportion,
            difficulty: rdifficulty,
            type: rtype,
            date: rdate.toDateString()
          };
          recipeArray.$add(recipeItem);
        },

        all: function () {
          return recipeArray.$loaded().then(function () {
            return recipeArray;
          });
        },

        get: function (item) {
          var item = recipeArray.$getRecord(item.$id);
          return item;
        },

        getPending: function () {
          var query = ref.orderByChild("status").equalTo("pending");
          var pendingArray = $firebaseArray(query);
          return pendingArray.$loaded().then(function () {
            return pendingArray;
          });
        },

        changeStatus: function (item, newStatus) {
          var item = recipeArray.$getRecord(item.$id);
          item.status = newStatus;
          recipeArray.$save(item);
        },

        delete: function (item) {
          var item = recipeArray.$getRecord(item.$id);
          recipeArray.$remove(item);
        },
      }
    }])

  // ----------- Nutrition Profile
  .factory('nutritionProfileService', ['$firebaseArray',

    function ($firebaseArray) {

      var config = {
        apiKey: "AIzaSyDW5o-5259QI8DZ8I-IT0vKIFyB5P7ahRk",
        authDomain: "tastychefdemo-20139.firebaseapp.com",
        databaseURL: "https://tastychefdemo-20139.firebaseio.com",
        projectId: "tastychefdemo-20139",
        storageBucket: "tastychefdemo-20139.appspot.com",
        messagingSenderId: "648974068968"
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }

      var ref = firebase.database().ref().child("nutritionProfile");

      //var recipeArray = $firebaseArray(ref);

      return {
        add: function (rname, obj) {
          // Transform Date to string
          var bmi = parseFloat(obj[0].weight) / ((parseFloat(obj[0].height) * 0.01) + (parseFloat(obj[0].height) * 0.01));
          var weightStatus = "";
          var risk = "";
          if (bmi >= 0 && bmi < 18.5) {
            weightStatus = "Underweight";
            risk = "Lack of nutrition risk";
            console.log("18")
          }
          else if (bmi >= 18.5  && bmi <= 22.9) {
            weightStatus = "Healthy Weight";
            risk = "Low risk";
            console.log("20")
          }
          else if (bmi >= 23 && bmi <= 27.5) {
            weightStatus = "OverWeight";
            risk = "Moderate risk";
          }
          else if (bmi > 27.5) {
            console.log("55")
            weightStatus = "Obesity";
            risk = "High risk";
          }
          console.log(weightStatus)
          //Determine the gender of the User
          var gender = "Male";
           //Determine the age of the User
          var age = 20;
          var bmr = 0;
          var calories = 0;
          //IF male
        
          if (gender = "Male") {
        
            bmr = 66.5 + (13.75 * parseFloat(obj[0].weight)) + (5.003 * (parseFloat(obj[0].height)) - (6.755 * age));
            calories = parseFloat(obj[0].activityLevel) * bmr;
          }
          //Else if Female
          else if (gender = "Female") {
            bmr = 655.1 + (9.563 * parseFloat(obj[0].weight)) + (1.850 * (parseFloat(obj[0].height)) - (4.7 * age));
            calories = parseFloat(obj[0].activityLevel) * bmr;
          }
          // RecommendedEachMealCalories
          var remc = 0;
          remc = calories / parseFloat(obj[1].MealFrequency);

             //RecommendedCarbsIntake Daily
          var carbs = calories * 0.4;
          //RecommendedProteinsIntake Daily
          var proteins = calories * 0.4;
          
        
           //RecommendedFatsIntake Daily
          var fats = calories * 0.2;

          var recipeItem = {
            

            Height: obj[0].height,
            Weight: obj[0].weight,
            ActivityLevel: obj[0].activityLevel,
            DietType: obj[1].DietType,
            FoodAllergies: obj[1].foodallergy,
            FoodAvoidance: obj[1].foodavoidance,
            MealFrequency: obj[1].MealFrequency,
            SnackFrequency: obj[1].SnackFrequency,
            MedicalConditions: obj[2].medicalCondition,
            GlucoseLevel: obj[2].glucoseLevel,
            DailyCaloriesIntake: calories,
            DailyCarbsIntake: carbs,
            DailyProteinsIntake: proteins,
            DailyFatsIntake:fats,
            RecommendedEachMealCalories: remc,
            BMI: bmi,
            Risk:risk,
            BMR:bmr,
            WeightStatus: weightStatus


          };
          //recipeArray.$add(recipeItem);
          ref.child(rname).set(recipeItem);
        },

        all: function () {
          return recipeArray.$loaded().then(function () {
            return recipeArray;
          });
        },

        get: function (uid) {
          var starCountRef = ref.child(uid);
          return starCountRef;
          
          
        },

        getPending: function () {
          var query = ref.orderByChild("status").equalTo("pending");
          var pendingArray = $firebaseArray(query);
          return pendingArray.$loaded().then(function () {
            return pendingArray;
          });
        },

        changeStatus: function (item, newStatus) {
          var item = recipeArray.$getRecord(item.$id);
          item.status = newStatus;
          recipeArray.$save(item);
        },

        delete: function (item) {
          var item = recipeArray.$getRecord(item.$id);
          recipeArray.$remove(item);
        },
      }
    }])
