angular.module('twirll.controllers')
.controller('LandingCtrl',
 
  function($scope,$log,$state,localStorageService,$resource,$http,$ionicPopup,$timeout,$translate, //ng resources
    apiUrl,//constants
    $cordovaBarcodeScanner,$cordovaDialogs,landingResource,Scanner//ngcordova apis
    ) {
      //disable highlight 
      $scope.highlight =  false;

      $scope.icons = false;
      //header for home page
      $scope.navTitle =  '<span class="logo logo_new">'+
                            '<cite>Twirll</cite></span>'+ 
                          '<span class="icons_all icon_home">'+
                          '<a href="#"  ng-click="goto()" class="test"  ng-class="{\'highlight\':icons}"> <img src="img/assets/bell.png"  > </a><a href="#store" > <img src="img/assets/cart.png"></a><a href="#" class="ion-android-more-vertical"></a></span>';

  	  //check for user info 
      var user = localStorageService.get('user');
      
      //get user info 
      landingResource.users.info({userId:user.id})
      .$promise.then(function(user) {
          localStorageService.set('userinfo',JSON.stringify(user[0])); 
          $scope.userinfo = user[0];
          //after userinfo success get lastcheckin info
          landingResource.userinfo.get({})
             .$promise.then(function(response) {
                $scope.checkins = response[0] ; 
                //save lastchecking info to localstorage
                localStorageService.set('lastcheckin',JSON.stringify(response[0]));
                $scope.getcheckingphotos(response[0].businessprofile_id);

             });      
        });
 
      
        //alter message 
         var store       =  localStorageService.get('storeinfo');
         var lastcheckin =  localStorageService.get('lastcheckin');
          
         //switch messages     
         if(store != null){
             if(lastcheckin.businessprofile_id == store.businessprofile_id){
                      //if same checkin
                   $translate('Currently-at').then(function(translation) {
                    $scope.message = translation;
                   });
               }else{
                      //on new checkin
                    $translate('Last-checked-in').then(function(translation) {
                      $scope.message = translation;
                    });
               }
             
          }

      //dynamic url redirect

      $scope.goto = function(url){
        //activate highlight  
        $scope.icons = true;
        //go to state
        $state.go(url);

      }



      //offer page

      $scope.gotoOffers =  function(){
        $scope.highlight = true;
        $cordovaDialogs.alert('Offers', 'Offers Coming Soon', 'Ok')
          .then(function() {
            // callback success
          });
          //beep sounds for once
        $cordovaDialogs.beep(1);
      }
      

      //get cehcking photos 

      $scope.getcheckingphotos  = function(id){

         $http.post(apiUrl+'businessprofiles/'+id+'/getbusinessprofilephotos.json',JSON.stringify({"phototype":"thumb"})).success(function(response){
                   console.log(response);
           })
       }

      //open pop up for Qr code (stores) and barcode item (dynamic)

      $scope.Openpop =  function(title,button1,url,button2){

        // An elaborate, custom popup
                    var myPopup = $ionicPopup.show({
                      title: title,
                      scope: $scope,
                      buttons: [
                        {
                         text: button1,
                          onTap: function(e) {
                              $state.go(url);
                          } 
                        },
                        {
                          text: '<b>'+button2+'</b>',
                          type: 'button-positive',
                          onTap: function(e) {
                             $scope.scan();
                          }
                        }
                      ]
                    });
      }

     

     //take user to barcode scanner 
     $scope.scan =  function(){

          $scope.highlight =  true;
           //beep for once
          $cordovaDialogs.beep(1);
          
          $cordovaBarcodeScanner
          .scan()
          .then(function(barcodeData) {
            // Success! Barcode data is here
            $log.info(barcodeData);
              //check for scan format 
                 var location_id = barcodeData.text;
                 if(barcodeData.format == 'QR_CODE'){

                    //if Qr code split and send response to api
                    var location_id =  location_id.split('=');
                    var location_id =  location_id[1];

                    Scanner.QR.scan(JSON.stringify({'location_id':location_id}))
                   .$promise.then(function(store) {
                     if(store[0].business_id){
                        //save response and redirect to checkin page
                        localStorageService.set('storeinfo',JSON.stringify(store[0])) 
                        $state.go('checkin');
                      }
                    
                    },
                     function (error){
                        if(error.status == 406){
                          $scope.Openpop('Unable to find the store','Select Store','store','Re-Scan');
                        }                       
                     }
                    );

                 }else{
                     //if barcode scanned
                    
                     var checkin = localStorageService.get('lastcheckin'); 
                     if(checkin.checkin_at){
                      //if user has already checked in
                        Scanner.Barcode.scan(JSON.stringify({'scan_code':location_id}))
                          .$promise.then(function(store) {
                           $log.info(store);
                           localStorageService.set('itemDetail',JSON.stringify(store));
                           $state.go('itemDetail')
                         },
                          function(error){
                              console.log(error.status);
                              $scope.Openpop('Item not found or not checked-in','Search Store','storesearch','Re-Scan');
                          }
                         ); 
                     }else{
                        //if not checked In 
                        Scanner.Barcoder.scanItem(JSON.stringify({'scancode':location_id}))
                          .$promise.then(function(store) {
                          $log.info(store); 
                        },
                        function(error){
                           console.log(error.status);
                           $scope.Openpop('Product not found in nearby stores','Select store','storecatalogue','Cancel');
                        }
                        );
                   }
                  
              }
          }, function(error) {
            // An error occurred
          });
      }
  });