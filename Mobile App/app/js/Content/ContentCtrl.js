angular.module('twirll.controllers',[])

  .controller('ContentCtrl',
  	function($scope,$log,$state,localStorageService,$http,//ng resources
    apiUrl,//constants
    Catalogue){
	alert("a");
      var lastcheckin =  localStorageService.get('lastcheckin');
      
      $scope.searchtext = '';
      //get catalogue stores based on business id (checkin) 
      console.log(lastcheckin.businessprofile_id);

      Catalogue.storesinfo(lastcheckin.businessprofile_id)
      .then(function(success){
        //request success
          console.log(success);
          $scope.levels = success;

      },function(error){
        //request error 

      }); 

      $scope.gotosearch = function(){
        $state.go('cataloguesearch');
      }

	/*====Go to content page======*/	
      	$scope.showContent=function(){
		$state.go('content');
	
	}	
    /*====Go to content page======*/
        $scope.navTitle = 
                  '<span class="logo"><cite>Harry Hatti</cite></span>'+ 
                  '<span class="icons_all">'+
                       '<a href="#cataloguesearch" > <img src="img/icon_img.png"></a>'+
                        '<a href="#" ng-click="gotourl()"> <img src="img/assets/bell.png"> </a><a href="#" ng-click="takeback()"> <img src="img/assets/cart.png"></a><a href="#" class="ion-android-more-vertical"></a></span>';
	    
  	});
