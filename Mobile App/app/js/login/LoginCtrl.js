angular.module('twirll.controllers')

  .controller('LoginCtrl',

    function(
      $scope, $state, $log, $translate, localStorageService, // ng resources
      $ionicLoading, $ionicHistory, $ionicPopup, // ionic resources
      loginResource) { // custom resources

        // Translated resources
        $translate('Loading').then(function (translation) {
          $scope.loadingText = translation;
        });
        $translate('Login-Failed').then(function(translation) {
          $scope.loginFailedText = translation;
        });
        $translate('Invalid-User-Password').then(function(translation) {
          $scope.invalidUserPasswdText = translation;
        });

        // Using HTML5 GeoLocation API. Don't feel cordova plugin is required here.
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            $scope.$apply(function() {
              $scope.latitude = position.coords.latitude;
              $scope.longitude = position.coords.longitude;
            });
          });
        }

        // Form data for the login model
        $scope.loginData = {};

        $scope.doLogin = function() {

          $ionicLoading.show({
            template: $scope.loadingText
          });

          var data = {
            "session": $scope.loginData, // contains both username and password. Check login.html
            "user_login_activity": {
              "device_id":"1",
              "device_token":null,
              "device_type":null,
              "latitude":$scope.latitude,
              "longitude":$scope.longitude}
          };

          loginResource.login(data)
            .$promise.then(function(response) {

              $log.info("success " + JSON.stringify(response));

              localStorageService.set("user", JSON.stringify(response[0]));

              $ionicLoading.hide();
              $ionicHistory.nextViewOptions({
                disableBack: true //The next view should forget its back view, and set it to null.
              });
              $state.go('home');
            }, function(error) {

              $log.error("failure " + JSON.stringify(error));

              $ionicLoading.hide();
              $ionicPopup.alert({
                title: $scope.loginFailedText,
                template: $scope.invalidUserPasswdText
              });
            });
        };
    }
  );