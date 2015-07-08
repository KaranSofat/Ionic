angular.module('twirll.controllers')

  .controller('StoreCtrl',
  	function($scope,$log,$state,localStorageService,$translate ,
  	$cordovaGeolocation,//ng resources
    Store){

    //header for page
     $scope.navTitle =  '<span class="logo"><cite>Check-in</cite></span>'+ 
                  '<span class="icons_all store">'+
                       '<a href="#" ng-click="gotourl()"  class="ion-search"> </a><a href="#" ng-click="takeback()"> <img src="img/assets/location.png"></a><a href="#" class="ion-android-more-vertical"></a></span>';
     
     //geolocation initiliazation
     $scope.position = {};
      
     var posOptions = {timeout: 10000, enableHighAccuracy: false};

     $cordovaGeolocation
		    .getCurrentPosition(posOptions)
		    .then(function (position) {
           
          $scope.position.latitude = position.coords.latitude;
          $scope.position.latitude = position.coords.longitude;
		     
		    }, function(err) {
		      // error
		    });  

      //get store by location near by 5km
      
      $scope.getStore  = function(){
           $log.log($scope.position);
         //parameters to send for request response
         var store_data =  {
                           "business_location":
                            {
                              "Nearbyflag" :"L",      
                             "latitude" :"28.635647",
                             "longitude"    :"77.364724",
                             "range_in_km"    :".5",
                             "category"    :""   
                           }}

        
         Store.searchby.near(JSON.stringify(store_data))
         .$promise.then(function(Store) {
       
              $log.log(Store);
              $scope.stores  =  Store;

         });


      }   

      //initialize stores 

      $scope.getStore();               

  	})
  