 
angular.module('starter.services')


 //factory for authentication and login signup 
.factory('vendors',function($http,$q,ApiEndpoint){
   console.log(ApiEndpoint);
   var baseurl =ApiEndpoint.url;
    return{

 
 Create_Bid:function(items,item){

           var Url = baseurl+'vendor/auctions/'+item;
           
           var defer = $q.defer();

           $http.post(Url,items).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },
    
    vendor_list_appointment:function(item){

           var Url = baseurl+'vendor/appointments?api_token='+item.api_token;
           
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
    reschedule_date:function(id,item){

           var Url = baseurl+'vendor/requested_appointment_date_changes/'+id+'/create';
           
           var defer = $q.defer();

           $http.post(Url,item).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    },
    specificvendorappointment:function(item){

           var Url = baseurl+'vendor/appointments/'+item.vendor_appointment_id+'?api_token='+item.api_token;
           
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
    
    
    dispute_view:function(item){

           var Url = baseurl+'vendor/disputes/'+item.disputeappointmentId+'/view?api_token='+item.api_token;
           
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
    
    
    
    
       payments:function(item){

           var Url = baseurl+'/vendor/payments?api_token='+item;
           
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
    
    
         specific_payments:function(item){

           var Url = baseurl+'/vendor/payments/'+item.vendor_appointment_id+'?api_token='+item.api_token;
           
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
    
    
    
    
    
    
    location_url:function(item){

           var Url = item;
           
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
    
    
    
     update_vendor_auctions:function(items,item){
		  var Url = baseurl+'/vendor/auctions/'+item+'/update_auction';
		  
           var defer = $q.defer();


           $http.post(Url,items).
              success(function (data, status, headers, config) {
				         
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  console.log(data);
                  defer.reject();
                 
              });

            return defer.promise;
     },
    
    
    
    
    
    
      vendor_auctions:function(item){
		  var Url = baseurl+'vendor/auctions?api_token='+item.api_token;

           var defer = $q.defer();


           $http.get(Url).
              success(function (data, status, headers, config) {
				         
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  console.log(data);
                  defer.reject();
                 
              });

            return defer.promise;
     },
     
     
     
     
       update_appointment:function(item,items){
		  var Url = baseurl+'vendor/appointments/'+items;

           var defer = $q.defer();


           $http.post(Url,item).
              success(function (data, status, headers, config) {
				         
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  console.log(data);
                  defer.reject();
                 
              });

            return defer.promise;
     },
     
     
     complaint:function(item,items,token){
		 
		
		  var Url = baseurl+'/vendor/disputes/'+items+'/update?api_token?='+token;

           var defer = $q.defer();


           $http.post(Url,item).
              success(function (data, status, headers, config) {
				         
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  console.log(data);
                  defer.reject();
                 
              });

            return defer.promise;
     },
     
   
      completed_update_appointment:function(item,items){
		  var Url = baseurl+'/vendor/appointments/'+items+'/update_appointment';

           var defer = $q.defer();


           $http.post(Url,item).
              success(function (data, status, headers, config) {
				         
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  console.log(data);
                  defer.reject();
                 
              });

            return defer.promise;
     },
     
     
     
     
     
     
     
     
     reschedule_appointment:function(item,items){
		  var Url = baseurl+'vendor/appointments/'+item+'/change?api_token='+items;

           var defer = $q.defer();


           $http.get(Url).
              success(function (data, status, headers, config) {
				         
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  console.log(data);
                  defer.reject();
                 
              });

            return defer.promise;
     },
     
     cancel_appointment:function(item,items){
		 
		 
		  var Url = baseurl+'vendor/appointments/'+items+'/cancel';

           var defer = $q.defer();
			
			
           $http.post(url,item).
             success(function (data, status, headers, config) {
				         
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  console.log(data);
                  defer.reject();
                 
              });

            return defer.promise;
     },     
     
     
    vendorInfo:function(item){
     		console.log(item); 
 		   var Url = baseurl+'vendor/auctions/'+item.auction_id+'?api_token='+item.api_token;

           var defer = $q.defer();


           $http.get(Url).
              success(function (data, status, headers, config) {
				         
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  console.log(data);
                  defer.reject();
                 
              });

            return defer.promise;
     },
    
    listall:function(){
		  var Url = baseurl+'vendor/auctions';

           var defer = $q.defer();


           $http.get(Url).
              success(function (data, status, headers, config) {
				         
                  defer.resolve(data);
                   
              }).
              error(function (data, status, headers, config) {
                  console.log(data);
                  defer.reject();
                 
              });

            return defer.promise;
     },
     
     }

})



