angular.module('app.services', [])
  .factory('adminService', [function () {

    //  var leaveArray = [
    //    { id: "100", name: "Abby", fromDate: "1 Dec 2018", toDate: "18 Dec 2018", type:"Annual", status:"rejected" },
    //    { id: "101", name: "Ben", fromDate: "24 Dec 2018", toDate: "24 Dec 2018", type:"Medical", status:"pending" },
    //    { id: "102", name: "Chloe", fromDate: "1 Jan 2019", toDate: "1 Jan 2019", type:"National Service", status:"approved" }
    //  ];
    var recipeArray = [];
    return {

      all: function () {
        return recipeArray;
      },

      get: function (id) {
        for (var i = 0; i < recipeArray.length; i++) {
          if (recipeArray[i].id == id) {
            return recipeArray[i];
          }
        }
      },

      updateAvailablilty: function (item, availability) {
        if (item != undefined) item.availability = availability;
      },

      delete: function (id) {
        var item = recipeArray.$getRecrd(id);
        recipeArray.$remove(item);
      },
    }
  }])

  .factory('itemService', [function () {
    var itemid;

    return {
      set: function (item) {
        itemid = item
        return itemid;
      },

      get: function () {
        return itemid;
      }
    }
  }])

  .service('BlankService', [function () {

  }]);
