angular.module('starter.controllers',[])
.controller('login', function($scope,$rootScope,$state,$ionicPopup,Auth) {
 $scope.data = {};
 $scope.login = function() {
 Auth.loginUser($scope.data.username, $scope.data.password).success(function(data) {
	
	$state.go('tabs.dash');
	})
	.error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            })
})

}
$scope.fbLogin = function () {


            openFB.login(
                function (response) {
                    if (response.status === 'connected') {

                      $state.go('tabs.dash');
                        $scope.closeLogin();
                    } else {
                        alert('Facebook login failed');
                    }
                },
                {scope: 'email,publish_actions'});

        }

})
.controller('dash', function($scope,$rootScope,$state,$ionicPopup) {
 var item = localStorage.getItem('logined');
if(item == 123)
{

$state.go('tabs.dash');
}
else
{

openFB.api({
            path: '/me',
            params: {fields: 'id,name'},
            success: function (user) {
                $scope.$apply(function () {
                    $scope.user = user;

                });
            },
            error: function (error) {
                alert('Error connecting to Facebook. Did you log in?');
            }
        });
}


})

.controller('register', function($scope,$rootScope,$state,$ionicPopup) {
$scope.user = {};
$scope.addData = function(){

	console.log($scope.user);
	localStorage.setItem('usersinfo',JSON.stringify($scope.user));
	$scope.current = JSON.parse(localStorage.getItem('usersinfo'));

     	var alertPopup = $ionicPopup.alert({
       title: 'Your data has been submitted successfully',
     });
     alertPopup.then(function(res) {
       console.log('your data has been submitted successfully');
     });
   };



})
.controller('users', function($scope,$state,$rootScope,$ionicPopup,Auth) {
 	$scope.user= [];
     	$scope.dataonload =  function(){

   	Auth.fetchData().then(function(success){

   	var success =  JSON.parse(success);

    	$scope.datanew =  success;
	$scope.user.push(success);
   
	
  
   })
  
  }

   $scope.dataonload();
    $scope.delete = function(index)
	{
	var confirmPopup = $ionicPopup.confirm({
       template: 'Are you sure you want to delete'
     });
     confirmPopup.then(function(res) {
       if(res) {
       $scope.user.splice(index, 1);
		localStorage.setItem('usersinfo',JSON.stringify($scope.user));
       } else {
         console.log('You are not sure');
       }
     })

		
	}

$scope.edit = function(index)
{
alert(index);
$state.go('update',{id:index});
}

})
.controller('update', function($scope,$state,$rootScope,$ionicPopup,$stateParams,Auth) {
    $scope.user =  {};
    var  Id= $stateParams.id;

    Auth.fetchData().then(function(success){
	var success =  JSON.parse(success);
        console.log(success);
        $scope.user.first = success.first;
        $scope.user.last = success.last;
        $scope.user.comment = success.comment;
		
	})

   $scope.update = function(){

    console.log($scope.user);
    console.log($scope.user.first);
    localStorage.setItem('usersinfo',JSON.stringify($scope.user));
		$state.go('users');
   
}

})
.controller('logout', function($scope,$state) {

    localStorage.clear();
    sessionStorage.clear();
    $state.go('login');

})

