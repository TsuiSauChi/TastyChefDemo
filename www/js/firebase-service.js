angular.module('firebaseService', ['firebase'])

  .factory('cartService', ['$localStorage',

    function ($localStorage) {
      $storage = $localStorage.$default({
        cart: []
      });
      return {
        all: function () {
          var result = [];
          for (var i = 0; i < $storage.cart.length; i++) {
            var item = JSON.parse($storage.cart[i]);
            result.push(item);
          }
          return result;
        },
        isCart: function (item) {
          for (var i = 0; i < $storage.cart.length; i++) {
            var cartItem = JSON.parse($storage.cart[i]);
            if (cartItem.id == item.id)
              return i;
          }
          return -1;
        },
        add: function (item) {
          if (this.isCart(item) < 0) {
            $storage.cart.push(JSON.stringify(item));
          }
        },
        remove: function (item) {
          var index = this.isCart(item);
          if (index >= 0)
            $storage.cart.splice(index, 1);
          return $storage.cart
        },
        getOne: function (item) {

          for (var i = 0; i < $storage.cart.length; i++) {
            var a = JSON.parse($storage.cart[i]);
            if (a.id == item.id) {
              a.portion = item.portion
              console.log(a)
              $storage.cart[i] = JSON.stringify(a)
              return a;
            }
            //console.log('a')
          }
        },
        clearAll: function () {
          $storage.cart = []
          return $storage.cart;
        }
      }
    }])

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

      var MemberRef = firebase.database().ref().child("member");
      var Member = $firebaseArray(MemberRef);

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

        get: function (uid) {
          var starCountRef = ref;
          return starCountRef;
        },

        addMember: function (DoB, Email, Gender, Mobile, Password, Username) {

          var MemberItem = {
            DoB: DoB.toDateString(),
            Email: Email,
            Gender: Gender,
            Mobile: Mobile,
            Password: Password,
            Username: Username,
            Role: "Member"
          }
          console.log(MemberItem);
          Member.$add(MemberItem)
          console.log('Push successfully');
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
          var item = Member.$getRecord(item.$id);
          Member.$remove(item);
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

      var nuritionRef = firebase.database().ref().child("recipe/nurition");

      var nuritionValueArray = $firebaseArray(nuritionRef);

      return {
        add: function (rname, ricon, rimage, rvideo, rduration, rportion, rprice, rdifficulty, rtype, rdate, likes, rnurition, ringredients) {
          var recipeItem = {
            ref: rname,
            name: rname,
            icon: ricon,
            image: rimage,
            video: rvideo,
            duration: rduration,
            portion: rportion,
            price: rprice,
            difficulty: rdifficulty,
            type: rtype,
            date: rdate.toDateString(),
            likes: likes,
            nurition: rnurition,
            ingredients: ringredients,

          };
          recipeArray.$add(recipeItem);
        },

        addNurition: function (rid, icarbo, iprotein, ikcal, ifat) {
          var nuritionValue = {
            recipeId: rid,
            carbo: icarbo,
            protein: iprotein,
            kcal: ikcal,
            fat: ifat,
          };
          nuritionValueArray.$add(nuritions);
        },

        all: function () {
          return recipeArray.$loaded().then(function () {
            return recipeArray;
          });
        },

        get: function (item) {
          console.log(item);
          //   var item = recipeArray.$getRecord(item.$id);
          return item;
        },

        getTodayRecipe: function (item) {
          var query = ref.orderByChild("date").equalTo(DateTime.now);
          var pendingArray = $firebaseArray(query);
          return pendingArray.$loaded().then(function () {
            return pendingArray;
          });
        },

        getSpecificRecipe: function (id) {
          for (var i = 0; i < recipeArray.length; i++) {
            if (recipeArray[i].id == id) {
              return recipeArray[i];
            }
          }
        },

        changeStatus: function (item, newStatus) {
          var item = recipeArray.$getRecord(item.$id);
          item.status = newStatus;
          recipeArray.$save(item);
        },

        changeIcon: function (item, newIcon) {
          var item = recipeArray.$getRecord(item.$id);
          item.icon = newIcon;
          recipeArray.$save(item);
        },



        delete: function (item) {
          var item = recipeArray.$getRecord(item.$id);
          recipeArray.$remove(item);
        },
      }
    }])


  .factory('favService', ['$firebaseArray',

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

      var ref = firebase.database().ref().child("likes");

      var likesArray = $firebaseArray(ref);

      return {


        all: function () {
          return likesArray.$loaded().then(function () {
            return likesArray;
          });
        },

        getSpecificHeart: function (id) {
          for (var i = 0; i < likesArray.length; i++) {
            if (likesArray[i].id == id) {
              return likesArray[i];
            }
          }
        },

        isFav: function (item) {
          for (var i = 0; i < likesArray.length; i++) {
            var likes = likesArray[i];
            if (likes.id == item.id)
              return i; // Returns the index
          }
          return -1;
        },

        add2: function (item, favIcon) {
          var favItem = {
            favIcon: favIcon,
          };
          if (this.isFav(item) < 0) {
            likesArray.$add(favItem);
          }
        },

        add: function (item) {

          if (this.isFav(item) < 0) {// Not already in fav
            likesArray.$add(item); // Save into local storage
          }
        },

        dislike: function (item) {
          var index = this.isFav(item);
          if (index >= 0)
            likesArray.$remove(index);
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
          else if (bmi >= 18.5 && bmi <= 22.9) {
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
          var carbs = calories * 0.3;
          //RecommendedProteinsIntake Daily
          var proteins = calories * 0.4;
          //RecommendedFatsIntake Daily
          var fats = calories * 0.3;

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
            DailyFatsIntake: fats,
            RecommendedEachMealCalories: remc,
            BMI: bmi,
            Risk: risk,
            BMR: bmr,
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

  .factory('memberService', ['$firebaseArray',

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

      var ref = firebase.database().ref().child("history");

      var historyArray = $firebaseArray(ref);

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

        addToOrderHistoryHome: function (name, image, id, quantity, status, deliverymethod, zipcode, address) {
          var add = {
            id: id,
            name: name,
            image: image,
            quantity: quantity,
            status: status,
            deliverymethod: deliverymethod,
            address: address,
            zipcode: zipcode,
          };
          console.log('add', add)
          historyArray.$add(add)

        },
        addToOrderHistorySelf: function (name, image, id, quantity, status, deliverymethod, telephone) {
          var add = {
            id: id,
            name: name,
            image: image,
            quantity: quantity,
            status: status,
            deliverymethod: deliverymethod,
            phoneNumber: telephone
          };
          console.log('add', add)
          historyArray.$add(add)
        },
        all: function () {
          return historyArray.$loaded().then(function () {
            return historyArray;
          });
        },

        get: function (itema) {
          var item = recipeArray.$getRecord(itema);
          return item;
        },

        getPending: function () {
          var query = ref.orderByChild("status").equalTo("pending");
          var pendingArray = $firebaseArray(query);
          return pendingArray.$loaded().then(function () {
            return pendingArray;
          });
        },

        changeQuantity: function (item, newQuan) {
          var item = historyArray.$getRecord(item.$id);
          item.quantity = newQuan;
          historyArray.$save(item)
        },

        changeStatus: function (item, newStatus) {
          var item = recipeArray.$getRecord(item.$id);
          item.status = newStatus;
          recipeArray.$save(item);
        },

        delete: function (data) {

          var item = historyArray.$getRecord(data.$id);
          console.log(item)
          historyArray.$remove(item);
        },
      }
    }])

  .factory('adminService', ['$firebaseArray',

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
        //    add: function(name, portion, date, difficulty, type, image) {

        add: function (name, portion, date, image, availability, difficulty, type, duration, ingredient, cookware, calories, carbohydrate, protein, fat) {
          // Transform Date to string
          var recipeItem = {
            name: name,
            portion: portion,
            date: date.toDateString(),
            image: image,
            availability: availability,
            difficulty: difficulty,
            type: type,
            duration: duration,
            ingredient: ingredient,
            cookware: cookware,
            calories: calories,
            carbohydrate: carbohydrate,
            protein: protein,
            fat: fat,
            like: null
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
        updateAvailablilty: function (item, newAvailability) {
          var item = recipeArray.$getRecord(item.$id);
          item.availability = newAvailability;
          recipeArray.$save(item);
        },
        delete: function (item) {
          var item = recipeArray.$getRecord(item.$id);
          recipeArray.$remove(item);
        },
      }
    }])



