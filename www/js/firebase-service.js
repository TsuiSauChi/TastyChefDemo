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
            
            var nuritionRef = firebase.database().ref().child("recipe/nurition");
            
            var nuritionValueArray = $firebaseArray(nuritionRef);
             

            return {
               add: function (rname, ricon,rimage, rvideo,rduration,rportion, rprice, rdifficulty, rtype, rdate,likes,rnurition,ringredients) {
                   var recipeItem = {
                       ref:rname,
                       name:rname,
                        icon:ricon,
                       image: rimage,
                       video:rvideo,
                       duration:rduration,
                       portion: rportion,
                       price:rprice,
                       difficulty: rdifficulty,
                       type:rtype, 
                       date:rdate.toDateString(),
                       likes:likes,
                       nurition:rnurition,
                       ingredients:ringredients,
                       
                   };
                   recipeArray.$add(recipeItem);
               },
                
               addNurition: function (rid,icarbo,iprotein,ikcal,ifat) {
                   var nuritionValue = {
                       recipeId:rid,
                       carbo:icarbo,
                       protein:iprotein,
                       kcal:ikcal,
                       fat:ifat,
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
                    return pendingArray.$loaded().then(function() {
                        return pendingArray;
                    });
               },

                getSpecificRecipe: function (id) {
                    for (var i = 0; i <recipeArray.length; i++) {
                        if (recipeArray[i].id == id) { 
                            return recipeArray[i];
                        }
                      }    
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
                    for (var i = 0; i <likesArray.length; i++) {
                        if (likesArray[i].id == id) { 
                            return likesArray[i];
                        }
                      }    
                },
          
         isFav: function(item) {
          for (var i=0; i<likesArray.length; i++) {
            var likes = likesArray[i];
            if (likes.id == item.id)
              return i; // Returns the index
          }
          return -1;
          },
          
           add2: function (item,favIcon) {
                   var favItem = {
                       favIcon:favIcon,
                   };
                if (this.isFav(item) < 0) {
                   likesArray.$add(favItem);
                }
               },
                
        add: function(item) {
          if (this.isFav(item) < 0) {// Not already in fav
            likesArray.$add(item); // Save into local storage
          }
        },

        dislike: function(item) {
          var index = this.isFav(item);
          if (index >=0)
            likesArray.$remove(index);
        },

      }
    }])