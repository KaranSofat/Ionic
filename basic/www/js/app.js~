// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('basic', ['ionic','basic.controllers'])

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

.config(function($stateProvider, $urlRouterProvider) {
 $stateProvider

.state('home', {
      url: '/home',
	views: {
        'menuContent' :{			
      templateUrl: 'templates/home.html',
      controller: 'homeCntrl'
}
}

  })

.state('loading', {
      url: '/loading',
views: {
        'menuContent' :{				
      templateUrl: 'templates/loading.html',
      controller: 'loading'
}

}
  })


.state('check', {
      url: '/check',
	views: {
        'menuContent' :{			
      templateUrl: 'templates/check.html',
      controller: 'check'
}
}

  })
.state('radio', {
      url: '/radio',
	views: {
        'menuContent' :{			
      templateUrl: 'templates/radio.html',
      controller: 'radio'
}

}
  })
.state('toggle', {
      url: '/toggle',
	views: {
        'menuContent' :{			
      templateUrl: 'templates/toggle.html',
      controller: 'toggle'
}

}
  })
.state('onhold', {
      url: '/onhold',
	views: {
        'menuContent' :{			
      templateUrl: 'templates/onhold.html',
      controller: 'onhold'
}

}
  })
.state('angularService', {
      url: '/angularServices',
	views: {
        'menuContent' :{			
      templateUrl: 'templates/angularService.html',
      controller: 'angularService'
}
}
  })
.state('list', {
      url: '/list',
	views: {
        'menuContent' :{			
      templateUrl: 'templates/list.html',
      controller: 'list'
}

}
  })
.state('repeat', {
      url: '/repeat',
	views: {
        'menuContent' :{			
      templateUrl: 'templates/repeat.html',
      controller: 'repeat'
}
}
  })
.state('pop', {
      url: '/pop',
	views: {
        'menuContent' :{			
      templateUrl: 'templates/popover.html',
      controller: 'popOver'
}
}
 })
.state('slide', {
      url: '/slide',
	views: {
        'menuContent' :{			
      templateUrl: 'templates/slide.html',
      controller: 'slide'
}
}
  })
.state('popUp', {
      url: '/popUp',
	views: {
        'menuContent' :{			
      templateUrl: 'templates/popUp.html',
      controller: 'popUp'
}
}
  })
$urlRouterProvider.otherwise('/home');


})
