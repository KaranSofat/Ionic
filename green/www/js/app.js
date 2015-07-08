// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','starter.controller','starter.services','ionic.rating'])

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

.constant('ApiEndpoint', {
  url: 'https://greenpal-staging.herokuapp.com/api/v1/'
})


.config(function($httpProvider){ 

      $httpProvider.defaults.useXDomain = true;
      //$httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common["X-Requested-With"];
      $httpProvider.defaults.headers.common["Accept"] = "application/json";
      $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      
   })

.run(function($rootScope){
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    //print here
    console.log(fromState);
     $rootScope.$broadcast('ROUTE_CHANGE',fromState);
  
   });

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  .state('index', {
      url: "/index",
      templateUrl: "templates/menu.html",
      controller: 'DashCtrl'
    })

  // setup an abstract state for the tabs directive
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller : 'LoginCtrl'
  })

  // Each tab has its own nav history stack:

  .state('dash', {
    url: '/dash',
    templateUrl: 'templates/dash.html',
    controller: 'DashCtrl'
  })

  .state('new_auction', {
    url: '/new_auction',
    templateUrl: 'templates/new_auction.html',
    controller: 'NewAucCtrl'
     
  })

  .state('my_bids', {
    url: '/my_bids',
    templateUrl: 'templates/my_bids.html',
    controller: 'BidsCtrl'
     
  })

  .state('provider_detail', {
    url: '/provider_detail/:BidderId',
    templateUrl: 'templates/provider_detail.html',
    controller: 'BidInfoCtrl'
  })

   .state('appointment', {
    url: '/appointment',
    templateUrl: 'templates/appointment.html',
    controller: 'AppointmentCtrl'
  })

   .state('my_greenpal', {
    url: '/my_greenpal',
    templateUrl: 'templates/my_greenpal.html',
    controller: 'GreenpalCtrl'
  })
  
  .state('reset_password', {
    url: '/reset_password',
    templateUrl: 'templates/reset_password.html',
    controller: 'ResetCtrl'
  })

  .state('dispute_cut', {
    url: '/dispute_cut',
    templateUrl: 'templates/dispute_cut.html',
    controller: 'DisputeCtrl'
  })
  
   .state('lawn_cut', {
    url: '/lawn_cut',
    templateUrl: 'templates/lawn_cut.html',
   controller: 'LawnCtrl'
  })
 
   .state('bc_cut', {
    url: '/bc_cut',
    templateUrl: 'templates/bc_cutters.html',
   controller: 'BcCtrl'
  })
   .state('approve', {
    url: '/approve',
    templateUrl: 'templates/approve.html',
   controller: 'RatingCtrl'
  })
   .state('secure_date', {
    url: '/secure_date',
    templateUrl: 'templates/secure_date.html',
   controller: 'creditCtrl'
  })
   .state('card_secure', {
    url: '/card_secure',
    templateUrl: 'templates/card_secure.html',
   controller: 'creditCtrl'
  })
 .state('apr_secure', {
    url: '/apr_secure',
    templateUrl: 'templates/secure_apr.html',
   controller: 'creditCtrl'
  })
 .state('cut_in_dispute', {
    url: '/cut_in_dispute',
    templateUrl: 'templates/cut-in-dispute.html',
   controller: 'DisputeCtrl'
  })  
  .state('service', {
    url: '/service/:disputeappointmentId',
    templateUrl: 'templates/service.html',
   controller: 'ServiceCtrl'
  })          
  .state('complaint', {
    url: '/complaint/:complaintId',
    templateUrl: 'templates/complaint.html',
   controller: 'ComplaintCtrl'
  })   
  .state('bid', {
    url: '/bid/:vendorId',
    templateUrl: 'templates/bid.html',
   controller: 'BidCtrl'
  }) 
   .state('all', {
    url: '/all',
    templateUrl: 'templates/all.html',
   controller: 'AllCtrl'
  })  
  .state('day', {
    url: '/day',
    templateUrl: 'templates/greenpal_day.html',
   controller: 'DayCtrl'
  })     
    .state('bid_detail', {
    url: '/bid_detail',
    templateUrl: 'templates/bid_detail.html',
   controller: 'BidDetailCtrl'
  })     
    .state('overdue', {
    url: '/overdue',
    templateUrl: 'templates/overdue.html',
   controller: 'DueCtrl'
  })   
      .state('reschedule', {
    url: '/reschedule/:resId',
    templateUrl: 'templates/reschedule.html',
   controller: 'RescheduleCtrl'
  })   
    .state('complete', {
    url: '/complete/:appointmentId',
    templateUrl: 'templates/complete.html',
   controller: 'CompleteCtrl'
  })         
      .state('specific', {
    url: '/specific_date',
    templateUrl: 'templates/specific_date.html',
   controller: 'SpecificCtrl'
  }) 
  
  .state('cancelapp', {
    url: '/cancelapp/:cancelID',
    templateUrl: 'templates/cancel_appointment.html',
   controller: 'CancelAppCtrl'
  }) 
  
    .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
   controller: 'MainCtrl'
  })      
   .state('no_appointment', {
    url: '/no_appointment',
    templateUrl: 'templates/no_appointment.html',
   controller: 'NoAppointmentCtrl'
  })     
  
    .state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
   controller: 'mapCtrl'
  })     
  
   .state('app_complete', {
    url: '/app_complete',
    templateUrl: 'templates/app_complete.html',
   controller: 'app_completeCtrl'
  })   
  
     .state('paid', {
    url: '/paid/:paidID',
    templateUrl: 'templates/paid.html',
   controller: 'paidCtrl'
  })   
  
  .state('log_out', {
    url: '/log_out',
    templateUrl: 'templates/log_out.html',
   controller: 'log_outCtrl'
  })      
  
   
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/index');

});

