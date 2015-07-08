angular.module('starter.services', [])

.factory('Auth', function($q,$rootScope) {
    return {
      

	fetchData:function(){    

	    var data =  localStorage.getItem('usersinfo');
		
            var deferred = $q.defer();
            var promise = deferred.promise;
	   
            deferred.resolve(data);
            
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
	  },
    loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'user' && pw == 'secret') {
                
                localStorage.setItem('logined','123');
         
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

