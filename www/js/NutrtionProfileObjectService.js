angular.module('app.NutrtionProfileObjectService', ['ngStorage', 'firebase'])

  /**************************
   Favourite Service
   - stores an array of event objects
   **************************/
  .factory('NutritionProfileService', ['$localStorage',
    function ($localStorage) {
      // Favourites linked to local storage
      $storage = $localStorage.$default({
        nutritionProfile: []
      });

      return {

        all: function () {
          var result = [];
          for (var i = 0; i < $storage.nutritionProfile.length; i++) {
            var item = JSON.parse($storage.nutritionProfile[i]);
            result.push(item);
          }
          return result;
        },

        isFav: function (item) {
        
          for (var i = 0; i < $storage.nutritionProfile.length; i++) {
            var event = JSON.parse($storage.nutritionProfile[i]);
   
            //Check by username
            firebase.auth().onAuthStateChanged((user) => {
              //$scope.nutritionprofile.email = user.email;;
            });
            if (event.email == user.email)
              return i; // Returns the index
          }
          return -1;
        },

        add: function (item) {
          if (this.isFav(item) < 0) {// Not already in fav
            $storage.nutritionProfile.push(JSON.stringify(item)); // Save into local storage
          }
          //else {

          //  this.remove(item);
          //}
        },

        remove: function (item) {
          var index = this.isFav(item);
          if (index >= 0)
            $storage.nutritionProfile.splice(index, 1);
        },

      }
        
            
    }])

  .factory('NPService',
  function () {
    var array = [];
    
    return {
      get: function () {
        return array;
      }
    }
  

     })
