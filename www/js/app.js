// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app',
  ['ionic',
    'app.controllers',
    'app.routes',
    'app.directives',
    'app.services',
    'firebase',
    'ngCordova',
    'firebaseService',
    'ngCordovaOauth',
    'app.NutrtionProfileObjectService',
    'payPalService',
    'ion-datetime-picker',])

  .config(function ($ionicConfigProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      /*
            ApiAIPlugin.init(
              {
                subscriptionKey: "cb9693af-85ce-4fbf-844a-5563722fc27f",
                clientAccessToken: "068983cce72742a4aa160682a60a6fbd", // insert your client access key here
                lang: "en" // set lang tag from list of supported languages
              },
              function (result) {
                console.log("Sucess", result)
               },
              function (error) {
                console.log("Fail")
               }
            );
            */
    });

  })

  /*
    This directive is used to disable the "drag to open" functionality of the Side-Menu
    when you are dragging a Slider component.
  */
  .directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function ($ionicSideMenuDelegate, $rootScope) {
    return {
      restrict: "A",
      controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

        function stopDrag() {
          $ionicSideMenuDelegate.canDragContent(false);
        }

        function allowDrag() {
          $ionicSideMenuDelegate.canDragContent(true);
        }

        $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
        $element.on('touchstart', stopDrag);
        $element.on('touchend', allowDrag);
        $element.on('mousedown', stopDrag);
        $element.on('mouseup', allowDrag);

      }]
    };
  }])

  .constant('APP_CONSTS', {
    payPalSandboxId: 'tsuisauchi.tsc@gmail.com',
    payPalProductionId: 'AauVhaCQ7LeH7R8THcGpL9PbjaKWdKiJJ0r9BIJbJGce1Gtm14_K9Rr3K-qmglceo48HFjnYJbFRMXiW',
    payPalEnv: 'PayPalEnvironmentSandbox', // for testing: PayPalEnvironmentSandbox, for production PayPalEnvironmentProduction
    payPalShopName: 'Demo Shop',
    payPalMerchantPrivacyPolicyURL: 'https://www.demoshop.com/privacy',
    payPalMerchantUserAgreementURL: 'https://www.demoshop.com/terms'
  })

  /*
    This directive is used to open regular and dynamic href links inside of inappbrowser.
  */
  .directive('hrefInappbrowser', function () {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      link: function (scope, element, attrs) {
        var href = attrs['hrefInappbrowser'];

        attrs.$observe('hrefInappbrowser', function (val) {
          href = val;
        });

        element.bind('click', function (event) {

          window.open(href, '_system', 'location=yes');

          event.preventDefault();
          event.stopPropagation();

        });
      }
    };
  });

