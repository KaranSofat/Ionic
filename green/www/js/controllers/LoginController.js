angular.module('starter.controller', [])

.controller('LoginCtrl', function($scope,$state,HomeOwners,storageService,$ionicPopup,$ionicLoading,$cordovaToast) {

  //initialize user
  $scope.user  = {};
  $scope.orginal  = {};
  //loginuser info
  $scope.login = function(){
     

      var data = "user[email]="+encodeURIComponent($scope.user.email)+"&user[password]="+$scope.user.password;
   	  //$state.go('dash');
   	 // console.log(data);

	$scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: false,
	    maxWidth: 200,
	    showDelay: 500

	});

   	  HomeOwners.logindetail(data).then(function(response){
		var login_api_token=response.api_token;
           console.log(response);
           storageService.save("api_token",login_api_token);
           var company_id=response.company_id;

           if(response.api_token!='' && company_id==null)
           {

				var Api_token=response.api_token;
				HomeOwners.Homepage(Api_token).then(function(response){
					console.log(response);
					
					//var new_result=JSON.stringify(response);
					//console.log();
					
					if(typeof response.open_auction!="undefined")
					{
					

						var api_token=storageService.get("api_token");
						$scope.orginal.api_token =JSON.parse(api_token);

						var data = {'api_token':$scope.orginal.api_token};
						
						   HomeOwners.Bid(data).then(function(response){
							   
							    //console.log('ssssssssssssssss');
							    console.log(response.bids);
							    if(response.bids!="")
							    {
									storageService.save("currentBid", response);
							   //console.log(response);
									$ionicLoading.hide();
									$state.go('my_bids');
									//$state.go('new_auction');
									
								}
							
								else
								{
									$ionicLoading.hide();
									  $state.go('dash');
								}
								
								
									if(response.message=="Gary is busy getting you bids.")
								{
									//alert("#")
									 //$state.go('new_auction');
									$ionicLoading.hide();		
									$state.go('dash');	
								}
								
								
					})
					
					 
						
						  //$state.go('my_bids');
					}
					
					else if(typeof response.upcoming_appointments!="undefined")
					{
							var upcoming_appointments=JSON.parse(response.upcoming_appointments);
						//console.log(upcoming_appointments);
						 storageService.save("upcoming_appointment",upcoming_appointments);
						$ionicLoading.hide();
						  $state.go('appointment');
					}
					
					else if(typeof response.completed_appointments!="")
					{
						$ionicLoading.hide();
						  $state.go('lawn_cut');
					}
					
					
					else if(typeof response.disputed_appointment!="undefined")
					{
						var disputed_obj=response;
						  storageService.save("disputed",disputed_obj);
						  $ionicLoading.hide();
						  $state.go('cut_in_dispute');
					}
					else
					{
						$ionicLoading.hide();
						  $state.go('no_appointment');
					}
				})
		   }

         

           if(response.api_token!='' && company_id!=null)
           {
			$ionicLoading.hide();	
			  $state.go('overdue');
		   }
           
        } ,function(error){
          
		$cordovaToast
    		.show('Wrong Credentials', 'long', 'center')
    			.then(function(success) {

    			}, function (error) {
  
    			});
           $ionicLoading.hide();
  			
        })



  }  
     //reset password
	$scope.resetPassword =function()
	{
		$ionicLoading.hide();
		$state.go('reset_password');

	} 

})


.controller('BidsCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService){
	
	//$scope.orginal  = {};
	$scope.tab  = 'first';
	$scope.scroll_data=0;
	//$scope.rate = 3;
	 var datasets  =  []; 
	 $scope.ratings={};
	$scope.max  = 5;

	$scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	
	
	var current_Bid=JSON.parse(storageService.get("currentBid"));
	var bids =  current_Bid.bids; 
	$scope.allBids = bids;  
	$scope.ratings=$scope.allBids.company_rating;
	console.log("nishant");
	console.log($scope.allBids);
		console.log($scope.ratings);
		/*var i=1;
	angular.forEach(bids, function(key,value){
				  
				var id=key.id;
				
				var json={'bid_id':id};
				 //atasets.push(json);
				  HomeOwners.BidInfo(json).then(function(response){
					  console.log(response);
					
					     $scope.ratings = response.company.service_range/10;
					   
							key.company=JSON.parse(response.company);
						key.ratings=JSON.stringify(key.company.service_range/10);
					
					  // console.log(key.rate);
					  //$scope.allBids = response;
					  //console.log(JSON.stringify($scope.allBids, null, 4));
				  })
				 
				//  console.log($scope.allBids);
				})*/
				
				
				
				
	
})



.controller('BidInfoCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService,$stateParams){
	//alert("11111");
				$scope.orginal  = {};
				$scope.ratings={};
				$scope.reviews_count={};
				//var photos  =  []; 
				$scope.tab  = 'first';
				$scope.scroll_data=0;
				//$scope.rate = 3;
				$scope.max  = 5;
				var i;
				var answerValue = 0; 
				var datasets  =  []; 
				$scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
				var api_token=storageService.get("api_token");
				$scope.orginal.api_token =JSON.parse(api_token);
				var data = {'api_token':$scope.orginal.api_token};
				var bid_id=$stateParams.BidderId;
				$scope.current_bid=bid_id;
				//alert(bid_id);
				var json={'bid_id':bid_id};
				 HomeOwners.BidInfo(json).then(function(response){
					  
				$scope.bidInfos = response.company 
					 console.log(response);
					   
					   var bids  = response.bid;
					   
					//  console.log(bids+'nishant');
					   
					   
					   var work_photos  = response.work_photos;
					   console.log(work_photos);
						//var photos=work_photos.split(","); 
						//console.log(photos);
					   //$scope.rate = company.service_range/10;
					 
					 //  var homeowner  = JSON.parse(response.homeowner);
					   var reviews  = response.reviews;
						if(reviews!='')
						{
							
					   var reviews_count=reviews.length;
					 
					     angular.forEach(reviews, function(key,value){
							 
							 var rating=key.rating;
							 datasets.push(rating);
							
							 
						 })
					   //  console.log(datasets);
					     
					     for(i=0;i<reviews_count;i++)
					     {
							  answerValue += Number(datasets[i]);
						 }
					     var rate_avg=Math.round(answerValue/reviews_count);
					     
					 }
					     $scope.ratings=rate_avg;
					     $scope.reviews_count=reviews_count;
					     
					$scope.allBidsInfo=  {'bids':bids,'reviews':reviews,'reviews_count':reviews_count,'rate_avg':$scope.rate,'work_photos':work_photos,'avatar':response.avatar} ;
					   console.log($scope.allBidsInfo);
					  //$scope.allBidsInfo = response.;bid
			 console.log($scope.allBidsInfo);
					  //console.log(JSON.stringify($scope.allBids, null, 4));
				  })
    
    
	/* $scope.pickMe =function(id,data)
    {
		
		var current_bid = {'bid_id':id};

		if(data!=null)
		{
		HomeOwners.BidAccept(current_bid).then(function(response){
		//console.log(current_bid);
		console.log(response);
		 $scope.current_bid=bid_id;
		 //alert(bid_id);
		 
		   storageService.save("bid_id",current_bid);
	//	$state.go('secure_date');
		//$location.path('/flickrs/');
	$state.go('main');
		
	})
}
else
{
	
	HomeOwners.credit(current_bid).then(function(response){
		//console.log(current_bid);
		console.log(response);
		 $scope.current_bid=bid_id;
		 //alert(bid_id);
		 
		   storageService.save("bid_id",current_bid);
	//	$state.go('secure_date');
		//$location.path('/flickrs/');
	$state.go('secure_date');
		
	})
	
	
}

	}*/
	
	
	
	
	 $scope.pickMe =function(id,data)
    {
		
		var current_bid = {'bid_id':id};

		if(data!=null)
		{
		HomeOwners.BidAccept(current_bid).then(function(response){
		//console.log(current_bid);
		console.log(response);
		 $scope.current_bid=bid_id;
		 //alert(bid_id);
		 
		   storageService.save("bid_id",current_bid);
	//	$state.go('secure_date');
		//$location.path('/flickrs/');
	$state.go('main');
		
	})
}
else
{
	
	HomeOwners.credit(current_bid).then(function(response){
		//console.log(current_bid);
		console.log(response);
		 $scope.current_bid=bid_id;
		 //alert(bid_id);
		 
		   storageService.save("bid_id",current_bid);
	//	$state.go('secure_date');
		//$location.path('/flickrs/');
	$state.go('secure_date');
		
	})
	
	
}

	}
	
	
	
	
	
	
	
	
	
	

		var bid_id=$stateParams.BidderId;
		
		var current_bid = {'bid_id':bid_id};
	    //$state.go('provider_detail/'+data);
	 
		HomeOwners.BidInfo(current_bid).then(function(response){
		//console.log(current_bid);
		console.log(response);
		
		//$location.path('/flickrs/');
	
		
	})

})

/*.controller('creditCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService,$stateParams){
$scope.orginal  = {};
	$scope.tab  = 'first';
	$scope.scroll_data=0;
	$scope.rate = 3;
	$scope.max  = 5;
	$scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
    var data = {'api_token':$scope.orginal.api_token};
    
     $scope.changetab  =  function(item){
   $scope.tab = item;

   }
     $scope.card =function()
    {
		
		var bid_id=storageService.get("bid_id");
		
		
		var current_bid =JSON.parse(bid_id);
		
		console.log(current_bid);
		//alert(id);
		//var current_bid = {'bid_id':id};

	HomeOwners.credit(current_bid).then(function(response){
	
	$state.go('main');
		
	})

	}
})
*/
.controller('creditCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService,$stateParams){
Stripe.setPublishableKey('pk_test_fauLBkPlJw6x4iw8GwOQB1rh');
$scope.orginal  = {};
	$scope.tab  = 'first';
	$scope.scroll_data=0;
	$scope.rate = 3;
	$scope.max  = 5;
	$scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
    var data = {'api_token':$scope.orginal.api_token};
    
     $scope.changetab  =  function(item){
   $scope.tab = item;

   }




/*=======Stripe Starts Here==========*/
$scope.stripeToken={};
$scope.appointment={};
$scope.card =function()
{

	var number = document.getElementById('number').value;
	var expiry = document.getElementById('exp').value;
	var res = expiry.split("/"); 
	var month = res[0];
	var year = res[1];

	var cvv = document.getElementById('cvc').value;




		$scope.stripeCallback = function (code, result) {
			
			
			if (result.error) {
				$scope.stripeError = result.error.message;
			} else {
				$scope.stripeToken = result.id;
			}
		
			var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);

		var data = {accepting_bid_id:66};
		var stripeToken = 'stripeToken='+$scope.stripeToken;

//var data = {'number':number,'exp-month':month,'exp-year':year,'stripeToken':$scope.stripeToken,'api_token':$scope.orginal.api_token};
	//var data = 'number='+number+'&exp-month='+month+'&exp-year='+year+'&stripeToken='+$scope.stripeToken+'&api_token='+$scope.orginal.api_token+'accepting_bid_id='+datas;

	console.log(data);

	HomeOwners.NewCard(data,stripeToken).then(function(response){
	
			console.log(response);
$state.go('main');
	
		
		})	
	};



}


/*=========Stripe Ends Here===========*/



















    /* $scope.card =function(code,result)
    {
	
	
			/*$scope.processing = false;
			$scope.hideAlerts();
			if (result.error) {
				$scope.stripeError = result.error.message;
			} else {
				$scope.stripeToken = result.id;
			}
		};

		$scope.hideAlerts = function () {
			$scope.stripeError = null;
			$scope.stripeToken = null;
		};		



	
		/*var bid_id=storageService.get("bid_id");
		
		
		var current_bid =JSON.parse(bid_id);
		
		console.log(current_bid);
		//alert(id);
		//var current_bid = {'bid_id':id};

	HomeOwners.NewCard($scope.data).then(function(response){
	
		console.log(response);

	//$state.go('main');
		
	})*/


})

.controller('NoAppointmentCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService,$stateParams){
 
	$scope.orginal  = {};
	$scope.tab  = 'first';
	$scope.scroll_data=0;
	$scope.rate = 3;
	$scope.max  = 5;
	$scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
    var data = {'api_token':$scope.orginal.api_token};
 
	$scope.changetab  =  function(item){
	$scope.tab = item;

   }

	$scope.gotourl  = function(url){
	  // alert(url);
       $state.go(url); 
   
   }
})	

.controller('MainCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService,$stateParams){
 
 $scope.orginal  = {};
	$scope.tab  = 'first';
	$scope.scroll_data=0;
	$scope.rate = 3;
	$scope.max  = 5;
	$scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
    var data = {'api_token':$scope.orginal.api_token};
 
	$scope.changetab  =  function(item){
	$scope.tab = item;

   }
	   $scope.gotourl  = function(url){
	  // alert(url);
       $state.go(url); 
   
   }
   

   
   
})	








.controller('LawnCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService,$stateParams){
 
	$scope.orginal  = {};
	
	$scope.tab  = 'first';
	$scope.scroll_data=0;
	$scope.rate = 3;
	$scope.max  = 5;
	$scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
    var data = {'api_token':$scope.orginal.api_token};
 
	$scope.changetab  =  function(item){
	$scope.tab = item;

	}

	$scope.gotourl  = function(url){
	// alert(url);
    $state.go(url); 
   }

})


.controller('SpecificCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService,$stateParams){
	
	$scope.full_month={};
	$scope.full_app={};
	$scope.full_app_new_date={};
	$scope.allAppointments_specific_dates={};
	var daysets  =  [];
	var new_date=[];
	var app_dates;
	var new_dates=[];
	var next_dates;
	var appointment_date=[];
	var new_daysets=[];
	$scope.gotourl  = function(url){
	  // alert(url);
	$state.go(url); 
   
   }
   
   var upcoming_appointment=storageService.get("upcoming_appointment");
		$scope.allAppointments_specific_dates=JSON.parse(upcoming_appointment);
		
   angular.forEach($scope.allAppointments_specific_dates, function(key,value){
				  
				var app_dates=new Date(key.service_date);
			//	alert(id);
			appointment_date.push(app_dates);
				
				
				  })
   
  // console.log(appointment_date);
   var today = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

var year = today.getFullYear();
var month = today.getMonth();
var date = today.getDate();

for(var i=0; i<30; i++){
      var wk_first=new Date(year, month, date + i);
     // console.log(day);
    var new_date_format_wk_first=wk_first.getDate()+'-'+wk_first.getMonth()+'-'+wk_first.getFullYear();
	new_daysets.push(new_date_format_wk_first);
   daysets.push(wk_first);
}

//console.log(daysets);

for(var app_dates=0;app_dates<appointment_date.length;app_dates++)
{
		var current_app_dates=appointment_date[app_dates];
		var app_new_format=appointment_date[app_dates].getDate()+'-'+appointment_date[app_dates].getMonth()+'-'+appointment_date[app_dates].getFullYear();
		console.log(app_new_format);
	
		for(var next_dates=0;next_dates<daysets.length;next_dates++)
		{
			console.log(daysets[next_dates]+'=='+current_app_dates);
			var new_date_format=daysets[next_dates].getDate()+'-'+daysets[next_dates].getMonth()+'-'+daysets[next_dates].getFullYear();
	

		if(new_date_format==app_new_format)
		{

		     for(var k=(next_dates);k<=(next_dates+5);k++)
		     {
				new_date.push(new_daysets[k]); 
				
			
			//	new_daysets[k]="";
	
		//	delete new_daysets[18];
			 //new_daysets[k].splice();
			 //new_daysets.remove(18);
			 
			 
			 }
			// 	new_dates.push(new_date_format); 
			 daysets.splice(next_dates, 6);
			 
		}
	}
	
}



$scope.full_app=new_date;
//$scope.full_app_new_date=new_dates;
$scope.full_month=daysets;
   console.log($scope.full_app);
   
   
   
   
   
   
   
})	


.controller('DisputeCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService,$stateParams){

	$scope.orginal  = {};
	$scope.disputed  = {};
	$scope.tab  = 'first';
	$scope.scroll_data=0;
	$scope.rate = 3;
	$scope.max  = 5;
	$scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
    var data = {'api_token':$scope.orginal.api_token};

	$scope.changetab  =  function(item){
	$scope.tab = item;
	}
	$scope.gotourl  = function(url){
	  // alert(url);
    $state.go(url); 
   }
   
   
   	$scope.disputed=storageService.get("disputed");
   	
	$scope.disputed_data =JSON.parse($scope.disputed);
	console.log($scope.disputed_data);
   
})	


.controller('log_outCtrl', function($scope,$state,$http,HomeOwners,storageService){
	$scope.logout =  function(){
		
	var api_token=storageService.get("api_token");
	var api_token =JSON.parse(api_token);
    var data = {'api_token':api_token};
		
		 HomeOwners.logoutuser(data).then(function(response){
		console.log(response);
		
		$state.go("login");
    });    
		
	}


})








.controller('BcCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService,$stateParams){
	
	$scope.orginal  = {};
	$scope.tab  = 'first';
	$scope.scroll_data=0;
	$scope.rate = 3;
	$scope.max  = 5;
	$scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
    var data = {'api_token':$scope.orginal.api_token};

	$scope.changetab  =  function(item){
	$scope.tab = item;

	}
	$scope.gotourl  = function(url){
	  // alert(url);
    $state.go(url); 
   }
	

})	

.controller('AppointmentCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService,$stateParams){
 
	$scope.orginal  = {};
	$scope.allAppointments={};
	var daysets  =  [];
	$scope.tab  = 'first';
	$scope.scroll_data=0;
	$scope.rate = 3;
	$scope.max  = 5;
	$scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
    var data = {'api_token':$scope.orginal.api_token};
 
 
	$scope.changetab  =  function(item){
	$scope.tab = item;

	}
	
		var upcoming_appointment=storageService.get("upcoming_appointment");
		$scope.allAppointments=JSON.parse(upcoming_appointment);
		
		
//console.log($scope.allAppointments);

	$scope.moveslider =  function(scrollnumber){ 
	var scrollnumber=scrollnumber;
	var scrollnumbers=scrollnumber*100-100;  
	var scroll=$scope.scroll_data+100;
	if(scroll<=scrollnumbers)
	{
    var position =   $ionicScrollDelegate.$getByHandle('small').getScrollPosition();
    console.log(position);
    
    $ionicScrollDelegate.$getByHandle('small').scrollTo(0,scroll);
	$scope.scroll_data=scroll;
	}
	} 

	$scope.gotourl  = function(url){
	  // alert(url);
    $state.go(url); 

   }
	
	//alert(last);
})			

.controller('GreenpalCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService,$stateParams){

	$scope.orginal  = {};
	$scope.tab  = 'first';
	$scope.scroll_data=0;
	$scope.rate = 3;
	$scope.max  = 5;
	$scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
    var data = {'api_token':$scope.orginal.api_token};
 
 
	$scope.changetab  =  function(item){
	$scope.tab = item;

	}

	$scope.gotourl  = function(url){
	  // alert(url);
    $state.go(url); 
   }

})	




.controller('DashCtrl', function($scope,$state,HomeOwners,$ionicScrollDelegate,$ionicPopup,storageService){

   $scope.orginal  = {};
   $scope.tab  = 'first';
   $scope.scroll_data=0;
   $scope.rate = 3;
   
   $scope.max  = 5;

   $scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	
	//var current_bids=storageService.get("current_bids");

	
	

	/*	HomeOwners.listall().then(function(response){
	//  $scope.allAppointments=JSON.parse(response.errors);
	// 	alert(response);
		console.log(response);
		});   */ 
    
	
	/* 	$scope.bids  = function(){
    
		HomeOwners.Bid().then(function(response){

		//console.log(response);
		})
	

	}*/
   
	HomeOwners.checkauctions().then(function(response){

    console.log(response);
    })
   //$scope.bids();

   $scope.changetab  =  function(item){
   $scope.tab = item;
   /*if(item=="second")
   {
	   
	   
	 /* var api_token=storageService.get("api_token");
		$scope.bid.api_token =JSON.parse(api_token);
		console.log($scope.bid.api_token);
    
		var data = {'api_token':$scope.bid.api_token};
    
		HomeOwners.Bid(data).then(function(response){
		console.log(response);
    });    
	   
		$scope.tab = item;
   }
    else
    {
		 $scope.tab = item;
	}*/
   
	}
	$scope.calenderPop  =  function(item){

	var myPopup = $ionicPopup.show({
    templateUrl: 'templates/calenderPopup.html',
     
    scope: $scope,
   
   });
   
	$scope.popclose=function(item){
	myPopup.close(); 
	}
   }

   $scope.gotourl  = function(url){
	  // alert(url);
   $state.go(url); 
   /* 	if(url=="appointment" || url=="specific")
		{
		var api_token=storageService.get("api_token");
		$scope.api_token =JSON.parse(api_token);
   
    
		var data = {'api_token':$scope.api_token};
		HomeOwners.Appointment(data).then(function(response){
		console.log(response);
    });    
		$state.go(url);
	}
	else
	{
		$state.go(url);   
	}   */

   }

   //scroll
   
	$scope.moveslider =  function(scrollnumber){ 
	var scrollnumber=scrollnumber;
	var scrollnumbers=scrollnumber*100-200;  
	var scroll=$scope.scroll_data+100;
	if(scroll<=scrollnumbers)
	{
    var position =   $ionicScrollDelegate.$getByHandle('small').getScrollPosition();
    console.log(position);
    
    $ionicScrollDelegate.$getByHandle('small').scrollTo(0,scroll);
	$scope.scroll_data=scroll;
	}
	} 
	
	})

//new auction controller
/*.controller('NewAucCtrl', function($scope,$state,$http,HomeOwners,storageService){
	
	//auction initialize
	$scope.auction  = {};
  
	//back to dashboard
	$scope.myGoBack = function() {
    $state.go('dash');
	};

	//set flexibility to 0 default
	$scope.auction.flexibility = 0;
	
	//toggle flexibility from 0 to 3 
	$scope.changeflex  =  function(){

    if($scope.auction.flexibility == 3){
       $scope.auction.flexibility   = -1;
    } 
    $scope.auction.flexibility  =  $scope.auction.flexibility + 1;
   }

  //create auction
	$scope.create_auction =  function(){
  
	var api_token=storageService.get("api_token");
    $scope.auction.api_token =JSON.parse(api_token);
    //console.log($scope.auction);
    
    var data = "auction[service_date]="+$scope.auction.service_date+"&auction[flexibility]="+$scope.auction.flexibility+"&auction[comments]="+$scope.auction.comments+"&auction[api_token]="+$scope.auction.api_token;
    
    console.log(data);
    
    HomeOwners.Create(data).then(function(response){
    console.log(response);
    });    
  }
})
*/
.controller('NewAucCtrl', function($scope,$state,$http,HomeOwners,storageService){
	
	//auction initialize
	$scope.auction  = {};
  
	//back to dashboard
	$scope.myGoBack = function() {
    $state.go('dash');
	};

	//set flexibility to 0 default
	$scope.auction.flexibility = 0;
	
	//toggle flexibility from 0 to 3 
	$scope.changeflex  =  function(){

    if($scope.auction.flexibility == 3){
       $scope.auction.flexibility   = -1;
    } 
    $scope.auction.flexibility  =  $scope.auction.flexibility + 1;
   }

  //create auction
	$scope.create_auction =  function(){  	

	var api_token=storageService.get("api_token");
    $scope.auction.api_token =JSON.parse(api_token);
    //console.log($scope.auction);
    
    var data = "service_date="+$scope.auction.service_date+"&flexibility="+$scope.auction.flexibility+"&comments="+$scope.auction.comments+"&api_token="+$scope.auction.api_token;
    
    console.log(data);
    
    HomeOwners.Create(data).then(function(response){
    console.log(response);
    });    
  
	var api_token=storageService.get("api_token");
	$scope.api_token =JSON.parse(api_token);
	var Ndata = {'api_token':$scope.api_token};
	HomeOwners.Bid(Ndata).then(function(response){
console.log(response);

	 if(response.message=="" || response.bids!= "")
	{
		 
	
		   $state.go('my_bids');
	}
	else
	{
	
		$state.go('dash');							
	
	}
})

}

})



.controller('ResetCtrl', function($scope,$state,$http,HomeOwners,storageService){



})
.controller('RatingCtrl', function($scope,$state,$http,HomeOwners,storageService){
	$scope.orginal={};
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
	var api_tokens=$scope.orginal.api_token;
	$scope.tab  = 'first';
	$scope.rate = 4;
	$scope.max  = 5;
	$scope.appointment_review  = {};
	
	$scope.review =function(){
			var data = "appointment_review[rate]="+$scope.rate+"&appointment_review[text]="+$scope.appointment_review.comments;
			//alert(data);
			
	HomeOwners.reviewer(data,api_tokens).then(function(response){
    console.log(response);
    });    
			
	}


$state.go('no_appointment');
	/*$scope.review =function(){
		//  
    
    //console.log(data);
    
    HomeOwners.reviewer(data).then(function(response){
    console.log(response);
    });    
   }*/

})


.directive('fundooRating', function () {
		return {
			restrict: 'A',
			template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                    '\u2605' +
                  '</li>' +
                '</ul>',
		scope: {
        ratingValue: '=',
        max: '=',
        readonly: '@',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < scope.max; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };

        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index + 1;
          scope.onRatingSelected({rating: index + 1});
        };

        scope.$watch('ratingValue', function(oldVal, newVal) {
          if (newVal) {
            updateStars();
          }
        });
      }
    }
  });

