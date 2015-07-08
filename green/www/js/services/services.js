
angular.module('starter.services', [])


 //factory for authentication and login signup 
.factory('HomeOwners',function($http,$q,ApiEndpoint){
   console.log(ApiEndpoint);
   var baseurl =ApiEndpoint.url;
    return{

    Create:function(item){
		//alert(item);
           var Url = baseurl+'homeowners/auctions';
           
           var defer = $q.defer();
           console.log(item);
           $http.post(Url,item).
              success(function (data, status, headers, config) {
				 console.log(data);
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },
	NewCard:function(data,datas){
	

           var Url = baseurl+'card/create?accepting_bid_id=66';
           
           var defer = $q.defer();

           $http.post(Url,datas).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },	

    Bid:function(item){
		
           var Url = baseurl+'homeowner/my_bids?api_token='+item.api_token;
           
           var defer = $q.defer();

           $http.get(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },
     BidInfo:function(item){

           var Url = baseurl+'homeowner/bidder_info/'+item.bid_id;
           
           var defer = $q.defer();

           $http.get(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },
    
    
    
    newlyCreated:function(item){

           var Url = baseurl+'homeowner/bidder_info/'+item.bid_id;
           
           var defer = $q.defer();

           $http.get(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },
    
    
   
    
     BidAccept:function(item){

           var Url = baseurl+'bid/'+item.bid_id+'/accept';
           
           var defer = $q.defer();

           $http.post(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },
    
     credit:function(item){

           var Url = baseurl+'card/new';
           
           var defer = $q.defer();

           $http.get(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },
    

 Appointment:function(item){
		
           var Url = baseurl+'appointments/all?api_token='+item.api_token;
           
           var defer = $q.defer();

           $http.get(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },

	checkauctions:function(){
		//alert("!");
           var Url = baseurl+'homeowner/auctions';

           var defer = $q.defer();

           $http.jsonp(Url).
              success(function (data, status, headers, config) {
				 
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
                 
              });

            return defer.promise;
    },
    
    logindetail:function(data){
		  var Url = 'https://greenpal-staging.herokuapp.com/api/v1/user/session';

           var defer = $q.defer();


           $http.post(Url,data).
              success(function (data, status, headers, config) {
				         
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  console.log(data);
                  defer.reject();
                 
              });

            return defer.promise;
     },
     
    reviewer:function(data,token){
		  var Url = 'https://greenpal-staging.herokuapp.com/api/v1/appointments/148/submit_review_and_payment?api_token='+token;

           var defer = $q.defer();


           $http.post(Url,data).
              success(function (data, status, headers, config) {
				         
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  console.log(data);
                  defer.reject();
                 
              });

            return defer.promise;
     },
     
     
     
    Homepage:function(item){
	
           var Url = baseurl+'homeowner/index?api_token='+item;
           
           var defer = $q.defer();

           $http.get(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },

    logoutuser:function(item){
       //storageService.remove('api_token');
       //return 'nishant';


	  var Url = baseurl+'user/session/logout?api_token='+item.api_token;
           
           var defer = $q.defer();

           $http.post(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;






    },
  
    
    
    
    
    
    
  }

})
 
 //localstorage factory
.factory('storageService', function ($rootScope) {

    return {
        
        get: function (key) {
           return localStorage.getItem(key);
        },

        save: function (key, data) {
           localStorage.setItem(key, JSON.stringify(data));
        },

        remove: function (key) {
            localStorage.removeItem(key);
        },
        
        clearAll : function () {
            localStorage.clear();
        }
    };
})

