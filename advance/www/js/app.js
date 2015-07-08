// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.config'])

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

.config(function($stateProvider, $urlRouterProvider,FB_APP_ID) {
  openFB.init({appId: FB_APP_ID});
 $stateProvider
.state('login', {
      url: '/login',
			
      templateUrl: 'templates/login.html',
      controller: 'login'

  })
.state('tabs.dash', {
      url: '/dash',
views: {
        'home-tab': {			
      templateUrl: 'templates/dash.html',
      controller: 'dash'
}

}
  })

.state('register', {
      url: '/register',
			
      templateUrl: 'templates/register.html',
      controller: 'register'

  })
.state('users', {
      url: '/users',
			
      templateUrl: 'templates/users.html',
      controller: 'users'

  })
.state('update', {
      url: '/edit/:id',		
      templateUrl: 'templates/edit.html',
      controller: 'update'

  })
.state('logout', {
      url: '/logout',
      controller: 'logout'

  })
 .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

$urlRouterProvider.otherwise('/login');
})
