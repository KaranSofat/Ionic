angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, Auth, $ionicPopup, $state,$ionicSideMenuDelegate,$rootScope) {
    $scope.data = {};

 
    $scope.login = function() {
        Auth.loginUser($scope.data.username, $scope.data.password).success(function(data) {
       
            $state.go('dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
	$scope.toggleLeft = function() {
    	 $ionicSideMenuDelegate.toggleLeft();
        };

  $scope.closeLogin = function () {
            $scope.modal.hide();
        },
 $scope.fbLogin = function () {


            openFB.login(
                function (response) {
                    if (response.status === 'connected') {
                        console.log('Facebook login succeeded');
                        $scope.closeLogin();
                    } else {
                        alert('Facebook login failed');
                    }
                },
                {scope: 'email,publish_actions'});
        }


})


 
.controller('DashCtrl', function($scope,$rootScope,Auth) {

 $scope.user= {};
    
    $scope.userone  = function(){

     Auth.fetchData().then(function(success){
      $scope.user = JSON.parse(success);
     });

    } 

    $scope.userone();
    
    $scope.delete =  function(index){
		console.log($scope.user);
		$scope.user.splice(index, 1);
		localStorage.setItem('usersinfo',JSON.stringify($scope.user));
	   }




   $scope.dataonload =  function(){

   Auth.fetchData().then(function(success){
   
   var success =  JSON.parse(success);

    $scope.datanew =  success;   
     
  
   })
  
  }

   $scope.dataonload();
 
   $scope.test = '123';
   
   
})

.controller('fetchData', function($scope,$rootScope,Auth) {
    $scope.user= {};
    
    $scope.userone  = function(){

     Auth.fetchData().then(function(success){
      $scope.user = JSON.parse(success);
     });

    } 

    $scope.userone();
    
    $scope.delete =  function(index){
		console.log($scope.user);
		$scope.user.splice(index, 1);
		localStorage.setItem('usersinfo',JSON.stringify($scope.user));
	   }





 $scope.dataonload =  function(){

   Auth.fetchData().then(function(success){
   
     //console.log(success);
    var success =  JSON.parse(success);

    $scope.datanew =  success;   

  
   })
  
  }

   $scope.dataonload();
 
   $scope.test = '123';
   
   
})



.controller('signUp', function($scope,$state) {

	$scope.user =  {};
	$scope.user.name='karan';
	$scope.user.email='karan@gmail.com';
	$scope.user.password='123456789';
 	$scope.register = function(){
        var current = JSON.parse(localStorage.getItem('usersinfo'));
        if(current)
	{
                console.log(current);
		current.push($scope.user);    
              
	}
	else
	{
                var current = [];
		current.push($scope.user); 
              
             
	}
         
      
                localStorage.setItem('usersinfo',JSON.stringify(current));
  		$state.go('fetchData');
  
}






})



.controller('logoutCtrl', function($scope,$state) {
console.log("a");
	/*$scope.logout=function(){

    openFB.logout(
      function() {
          $state.go('login');
      },
      errorHandler);
    localStorage.clear();
    sessionStorage.clear();
  }*/
	$state.go('logout');	
})
.controller('update', function($scope) {


 
})

