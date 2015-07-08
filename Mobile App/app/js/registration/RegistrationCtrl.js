angular.module('twirll.controllers')
.controller('RegistrationCtrl',
function($scope) {

  $scope.passwordInputType = 'password';

  $scope.togglePasswordInputType = function() {
    if ($scope.passwordInputType == 'password')
      $scope.passwordInputType = 'text';
    else
      $scope.passwordInputType = 'password';
  };

});