// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.profiles','starter.config'])

.run(function($ionicPlatform,$rootScope,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $rootScope.$on('$locationChangeStart',function(event,next,current){   
	       $rootScope.$broadcast("ROUTE_CHANGED",next);
               var item = localStorage.getItem('logined');
               if(item != '123'){
                   //$state.go('login');
                    $rootScope.loginpassed = false;
               }else{
                  // $state.go('dash');
                   $rootScope.loginpassed = true;
               }
               
	  });
  });
})

.config(function($stateProvider, $urlRouterProvider,FB_APP_ID) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
      url: '/login',
	views: {
        'menuContent' :{
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
}
}
  })
.state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile.html",
                        controller: "ProfileCtrl"
                    }
                }
            })
.state('logout', {
      url: '/logout',
	views: {
        'menuContent' :{
      templateUrl: 'templates/login.html',
      controller: 'logoutCtrl'
	}
}	
  })


.state('signUp', {
      url: '/signUp',
	views: {
        'menuContent' :{
      templateUrl: 'templates/signUp.html',
      controller: 'signUp'
	}
		}	
  })



.state('fetchData', {
      url: '/fetchData',
	views: {
        'menuContent' :{
      templateUrl: 'templates/fetchData.html',
      controller: 'fetchData'
}
}
  })
	
.state('update', {
      url: '/update',
	views: {
        'menuContent' :{
      templateUrl: 'templates/update.html',
      controller: 'update'
}
}
  })
  // setup an abstract state for the tabs directive
  /*.state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })*/

  // Each tab has its own nav history stack:

  .state('dash', {
    url: '/dash',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashCtrl'
      }
    }
  })

  /*.state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

*/
  $urlRouterProvider.otherwise('/login');

});
