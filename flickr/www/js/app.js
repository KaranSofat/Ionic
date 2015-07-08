/*angular.module('ionicApp', ['ionic', 'ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
   
   
   
     $stateProvider
    .state('home', {
      url: "/home",
    
    
      templateUrl: "templates/flickr.html",
       controller: "AppCtrl"
 
    })
      $urlRouterProvider.otherwise("/home");
   
    })

.controller('AppCtrl', function($scope,$http) {
$http.post('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c3c6b55e576bcc4e0352dd6fc9895d12&user_id=130202134%40N05&format=json&nojsoncallback=1&api_sig=15d8837842b83ba33cf8cb76abc8abb0')
.success(function(data) {
angular.forEach( data.photos.photo, function( item,i ) {
  var a = angular.element(item);
 
            var img_src ="http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_" + "s.jpg";
           
            //alert(img_src);
            //$scope.img=img_src;
            var linked='https://www.flickr.com/photos/'+item.owner+'/'+item.id+'/';
            var titles=item.title;
//$('<img />').attr({src:img_src,}).appendTo($('<a />').attr({href:linked}).appendTo($('#images')));

        $( "<img>" ).attr( "src", img_src ).appendTo( "#images" );
        $("#tite").html(titles);
       // $("#linked").attr("href", linked);
          //$( "<a>" ).attr( "href", linked ).appendTo( "#linked" );
      });

})
})*/


angular.module('ionicApp', ['ionic', 'ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
 
 
 
     $stateProvider
    .state('home', {
      url: "/home",
  
  
      templateUrl: "templates/flickrapi.html",
       controller: "AppCtrl"
 
    })
   
     .state('flickrs', {
      url: "/flickrs/:id",
  
  
      templateUrl: "templates/flickrImage.html",
       controller: "flickrCtrl"
 
    })
   
   
      $urlRouterProvider.otherwise("/home");
 
    })

.controller('AppCtrl', function($state,$scope,$http,$ionicPopup) {
 var pagesShown = 15;
    var pageSize = 15;

$scope.images = [];
$scope.imagesdata = [];

$http.post(' https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=a93c07f2d71939d3780d390f05ee9820&user_id=130202134%40N05&format=json&nojsoncallback=1')

.success(function(data) {
   
angular.forEach( data.photosets.photoset, function( item,i ) {
          
            var img_src ="http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.primary + "_" + item.secret + "_" + "s.jpg|gif|png";
           // var img_src_lrg ="http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.primary + "_" + item.secret + "_" + "n.jpg";
           // console.log(img_src);
           var title=item.title._content;
           var id=item.id;
      var json={'image':img_src,'title':title,'id':id};
           // var linked='https://www.flickr.com/photos/'+item.owner+'/'+item.id+'/';
          
            $scope.images.push(json);
         
 
      

      });
})
$http.post('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a93c07f2d71939d3780d390f05ee9820&user_id=130202134%40N05&extras=media&format=json&nojsoncallback=1')

.success(function(data) {
   
angular.forEach( data.photos.photo, function( item,i ) {
          
            var img_src ="http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_" + "s.jpg|gif|png";
            var img_src_lrg ="http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_" + "n.jpg|gif|png";
            console.log(img_src);
            var title=item.title;
            var id=item.id;
           // alert(img_src);
           // alert(img_src);
            var json={'image':img_src,'title':title,'imagelarge':img_src_lrg};
           // var linked='https://www.flickr.com/photos/'+item.owner+'/'+item.id+'/';
          
            $scope.imagesdata.push(json);
         
 
      

      });


})







    $scope.showImagess = function(index,url,title) {
       
  
   var alertPopup = $ionicPopup.show({
         
         
      title:title ,
       template: '<img src='+url+'>',
    buttons: [
       { text: 'Cancel' }
        ]
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
    
     //alert(id);   
     //alert("nishants");
     //$state.go('flickrs',{ id: id });
 
    }

 
 











//console.log($scope.titles);
$scope.itemsLimit = function() {
        return pageSize * pagesShown;
    };
    $scope.hasMoreItemsToShow = function() {
        return pagesShown < (($scope.images.length+$scope.imagesdata.length) / pageSize);
    };
    $scope.showMoreItems = function() {
        pagesShown = pagesShown + 1;        
    };
   
    $scope.showImage = function(index,id,title) {
       
  
    /* var alertPopup = $ionicPopup.show({
         
         
      title:title ,
       template: '<img src='+url+'>',
    buttons: [
       { text: 'Cancel' }
        ]
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });*/
    
     //alert(id);   
    
     $state.go('flickrs',{ id: id });
 
    }
})

.controller('flickrCtrl', function($scope,$http,$ionicPopup,$stateParams) {
 var  id= $stateParams.id;
 

 
 var pagesShown = 15;
    var pageSize = 15;

$scope.images = [];

$http.post('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=a93c07f2d71939d3780d390f05ee9820&photoset_id='+id+'&format=json&nojsoncallback=1')
.success(function(data) {

angular.forEach( data.photoset.photo, function( item,i ) {
   
            var img_src ="http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_" + "s.jpg|gif|png";
            var img_src_lrg ="http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_" + "n.jpg|gif|png";
           // console.log(img_src);
           var title=item.title;
           var id=item.id;
      var json={'image':img_src,'title':title,'imagelarge':img_src_lrg};
           // var linked='https://www.flickr.com/photos/'+item.owner+'/'+item.id+'/';
          
            $scope.images.push(json);
         
 
      

      });

})

//console.log($scope.titles);
$scope.itemsLimit = function() {
        return pageSize * pagesShown;
    };
    $scope.hasMoreItemsToShows = function() {
        return pagesShown < ($scope.images.length / pageSize);
    };
    $scope.showMoreItemss = function() {
        pagesShown = pagesShown + 1;        
    };
   
    $scope.showImages = function(index,url,title) {
       
  
   var alertPopup = $ionicPopup.show({
         
         
      title:title ,
       template: '<img src='+url+'>',
    buttons: [
       { text: 'Cancel' }
        ]
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
    
     //alert(id);   
     //alert("nishants");
     //$state.go('flickrs',{ id: id });
 
    }

 
 
 
 
 

})
