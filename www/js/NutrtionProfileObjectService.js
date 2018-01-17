angular.module('app.NutrtionProfileObjectService', ['ngStorage'])

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
            if (event.id == item.id)
              return i; // Returns the index
          }
          return -1;
        },

        add: function (item) {
          if (this.isFav(item) < 0) {// Not already in fav
            $storage.nutritionProfile.push(JSON.stringify(item)); // Save into local storage
          }
        },

        remove: function (item) {
          var index = this.isFav(item);
          if (index >= 0)
            $storage.nutritionProfile.splice(index, 1);
        },

      }
    }])
