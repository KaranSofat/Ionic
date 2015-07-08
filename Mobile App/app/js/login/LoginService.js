angular.module('twirll.services', ['ngResource'])

  .factory('loginResource',

    function($resource, apiUrl) {
      return $resource(apiUrl + '/sessions.json', null, {
        login: {method: 'POST', isArray: true}
      });
    }
  )
  //all landing resources
  .factory('landingResource',
    function($resource, apiUrl) {
      return {
          //last checkin
          userinfo: $resource(apiUrl + 'checkin/userlastcheckin.json ',null, {
            get: { method: 'POST', isArray: true , headers:{'Access-Control-Allow-Credentials': true} }
          }),
          //get request to get unser info
          users: $resource(apiUrl+'users/:userId.json',{userId:'@id'}, {
            info: { method: 'GET', isArray: true ,headers:{'Access-Control-Allow-Credentials': true} }
          }),
          //business profile images
          business: $resource(apiUrl+'businessprofiles/:Id/getbusinessprofilephotos.json',{Id:'@id'}, {
          images: { method: 'POST', isArray: true ,headers:{'Access-Control-Allow-Credentials': true} }
          })

       }
    }
  )
  
  //scan items
  .factory('Scanner',
    function($resource, apiUrl) {
    return {
      QR: $resource(apiUrl + 'checkin.json', null, {
        scan: {method: 'POST', isArray: true}
      }),
      Barcode: $resource(apiUrl + 'businessprofiles/scanitem.json', null, {
        scan: {method: 'POST', isArray: true}
      }),
      Barcoder: $resource(apiUrl + 'businessinventory/scanitems.json', null, {
        scanItem: {method: 'POST', isArray: true}
      })
     }
    }

  )


  //resources for store 
   .factory('Store',
    function($resource, apiUrl) {
    return {
      searchby: $resource(apiUrl + 'business_locations/search_nearby.json', null, {
        near: {method: 'POST', isArray: true}
      }),
      
     }
    }

  )

  //catalogue page api
.factory('Catalogue',

  function($http,$q,apiUrl){
   return{
      storesinfo:function(item){
           console.log(item);
           var Url = apiUrl+'/businessprofiles/'+item+'/showcataloguestructure.json'
           var defer = $q.defer();
           $http.get(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    }
  }
 })


.factory('Content',

  function($http,$q,apiUrl){
   return{
      fetchContent:function(item){
           console.log(item);
           var Url = apiUrl+'/businessinventory/'+item+'/getproductinventorylist.json'
           var defer = $q.defer();
           $http.get(Url).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    }
  }
 })

.factory('CheckIn',

  function($http,$q,apiUrl){
   return{
      lastCheckIn:function(day){
		
           var Url = apiUrl+'/checkin/userallcheckins.json' 
           var defer = $q.defer();
           $http.post(Url,day).
              success(function (data, status, headers, config) {
                  defer.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  defer.reject();
              });

            return defer.promise;
    }
  }
 });



