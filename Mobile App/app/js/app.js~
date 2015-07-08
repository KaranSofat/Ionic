angular.module('twirll',
  [ 'ionic',
    'LocalStorageModule',
    'ngMessages',
    'ngCordova',
    'angularMoment',
    'pascalprecht.translate',
    'twirll.constants',
    'twirll.controllers',
    'twirll.services'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  // No need to provide dependency list. ngAnnotate gulp plugin will take of it during minification phase.
  .config(function($translateProvider) {

    $translateProvider.useStaticFilesLoader({
      prefix: 'data/locale-',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
  })

 .config(function($httpProvider){ 

    //
   })


  // This config sets up client side unhandled exceptions logging to the server
  .config(function($provide, apiUrl) {
    // We should have used $log instead of console.log. But can get $log instance in config. Only providers and
    // constants can be accessed here.
    console.log('Api Url : ' + apiUrl);

    // exceptionHandler is a ng service which handles all unhandled exceptions. By default just logs the
    // stack to console. We will decorate it to post such exceptions to server.
    $provide.decorator("$exceptionHandler", function($delegate) {
      return function(exception, cause) {
        $delegate(exception, cause); // Default functionality provided by ng service

        // now try to log the error to the server side.
        try{
          var errorMessage = exception.toString();

          // use stacktrace.js to generate a stack trace
          var stackTrace = printStackTrace({e: exception});

          // use AJAX and NOT $http ng service to avoid infinite loop
          jQuery.ajax({
            type: "POST",
            url: apiUrl + "/logger", // TODO: Server needs to provide this API
            contentType: "application/json",
            data: angular.toJson({
              url: window.location.href,
              message: errorMessage,
              type: "exception",
              stackTrace: stackTrace, cause: ( cause || "")
            })
          });
        } catch (loggingError){
          console.log("Error server-side logging failed");
        }
      };
    });
  })


  .config(function ($httpProvider) {
    
    $httpProvider.defaults.withCredentials = true;
  
  })

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "LoginCtrl"
      })

      .state('home', {
        url: "/home",
        templateUrl: "templates/home.html",
        controller:"LandingCtrl"
      })

      .state('landing-page', {
        url: "/landing-page",
        templateUrl: "templates/landing-page.html",
        controller: "LandingCtrl"
      })

      .state('registration', {
        url: "/registration",
        templateUrl: "templates/registration.html",
        controller: "RegistrationCtrl"
      })
       
       .state('store', {
        url: "/store",
        templateUrl: "templates/store.html",
        controller: "StoreCtrl"
      })

      .state('storecatalogue', {
        url: "/storecatalogue",
        templateUrl: "templates/storecatalogue.html",
        controller: "StoreCtrl"
      })
      .state('storesearch', {
        url: "/storesearch",
        templateUrl: "templates/storesearch.html",
        controller: "StoreCtrl"
      })
       .state('checkin', {
        url: "/checkin",
        templateUrl: "templates/checkin.html",
        controller: "CheckinCtrl"
      })
       .state('lastcheckin', {
        url: "/lastcheckin",
        templateUrl: "templates/lastcheckin.html",
        controller: "CheckinCtrl"
      })
      .state('itemDetail', {
          url: "/itemDetail",
          templateUrl: "templates/itemDetail.html",
          controller: "ItemCtrl"
      })

      .state('Catal', {
          url: "/Catal",
          templateUrl: "templates/catalouge.html",
          controller: "CatalCtrl"
       })

      .state('cataloguesearch', {
          url: "/cataloguesearch",
          templateUrl: "templates/searchcatalogue.html",
          controller: "CatalCtrl"
       })

       .state('contentInformation', {
          url: "/contentInformation",
          templateUrl: "templates/contentInformation.html",
        controller: "CatalCtrl"
       })
	.state('content', {
          url: "/content",
          templateUrl: "templates/content.html",
          controller: "CatalCtrl"
       })
	.state('manualItem', {
          url: "/manualItem",
          templateUrl: "templates/manualItem.html",
          controller: "CatalCtrl"
      })
	.state('OrderInfo', {
          url: "/OrderInfo",
          templateUrl: "templates/orderInfo.html",
          //controller: "CatalCtrl"
      })
	.state('lastCheckIn', {
          url: "/lastCheckIn",
          templateUrl: "templates/lastcheckin.html",
          controller: "CatalCtrl"
      })
    $urlRouterProvider.otherwise('/itemDetail');

  });
