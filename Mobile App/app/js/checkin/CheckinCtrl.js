angular.module('twirll.controllers')

  .controller('CheckinCtrl',
  	function($scope,$log,$state,localStorageService,$resource,$http,$translate ,//ng resources
    apiUrl,//constants
    $cordovaBarcodeScanner,landingResource,Scanner){
       
        //get store , lastchecking and userinfo from localstorage
        var store       =  localStorageService.get('storeinfo');
        var lastcheckin =  localStorageService.get('lastcheckin');
        var user        =  localStorageService.get('userinfo');
       
        console.log(store);
        //set store checkin
        $scope.checkininfo  = store;
        
        //check for follow unfollow message
        if($scope.checkininfo.follow_unfollow_determination == 'Follow'){
            $scope.follow_unfollow = 'Following';
        }else{
            $scope.follow_unfollow = $scope.checkininfo.follow_unfollow_determination;
        }
        //login user info
        $scope.userinfo = user;
        
        //lastcheckin
        $scope.lastcheckin = lastcheckin;
         // Translated resources
       
        
        if(lastcheckin.businessprofile_id == store.businessprofile_id){
          //if same checkin
           $translate('Currently-at').then(function (translation) {
              $scope.message = translation;
            });
         }else{
          //on new checkin
          $translate('Last-checked-in').then(function(translation) {
              $scope.message = translation;
          });

         }
         
         //header for page
         $scope.navTitle =  '<span class="logo"><cite>Check-in</cite></span>'+ 
                  '<span class="icons_all">'+
                       '<a href="#" ng-click="gotourl()"> <img src="img/assets/bell.png"> </a><a href="#" ng-click="takeback()"> <img src="img/assets/cart.png"></a><a href="#" class="ion-android-more-vertical"></a></span>';

  	});
