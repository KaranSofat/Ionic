angular.module('starter.controller')



.controller('CompleteCtrl', function($scope,$stateParams,storageService,vendors,$state, $cordovaCamera,$cordovaSms,$cordovaActionSheet){
	$scope.orginal={};
	var dateset=[];
	  $scope.appointment={};
	 $scope.specificvendorappointmentInfo={};
	  $scope.date_length={};
    var appointmentId=$stateParams.appointmentId;
    
    var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
	var json={'vendor_appointment_id':appointmentId,'api_token':$scope.orginal.api_token};
				 //atasets.push(json);
				  vendors.specificvendorappointment(json).then(function(response){
					  var appointments=JSON.parse(response.appointment);
					//console.log(appointments.service_date);
					  var service_date=appointments.service_date;
					    var date_range=appointments.date_range;
					  	var today = new Date();
						var dd = today.getDate();
						var mm = today.getMonth()+1; //January is 0!

						var yyyy = today.getFullYear();
						if(dd<10){
							dd='0'+dd
						} 
						if(mm<10){
							mm='0'+mm
						} 
						var today = yyyy+'-'+mm+'-'+dd;
					  
					  
					  
					  
					    var one_day= 24 * 60 * 60 * 1000;
						  var flexi_day=one_day*date_range;
						  var upcoming_date = new Date(new Date(service_date).getTime() + flexi_day);
						  
						  var day = upcoming_date.getDate();
							var month = upcoming_date.getMonth() + 1;
							var year = upcoming_date.getFullYear();
								if(day<10){
								day='0'+day;
							} 
							if(month<10){
								month='0'+month;
							} 
							
							
								var upcoming_dates = year+'-'+month+'-'+day;
						  
						  
						  var prev_date = new Date(new Date(service_date).getTime() - flexi_day);
					
						  var days = prev_date.getDate();
							var months = prev_date.getMonth() + 1;
							var years = prev_date.getFullYear();
								if(days<10){
								days='0'+days;
							} 
							if(months<10){
								months='0'+months;
							} 
							
							
								var prev_dates = years+'-'+months+'-'+days;
					  
					  
					  
					  
					  
					 var date1 = new Date(prev_dates);
					var date2 = new Date(today);
					var timeDiff = Math.abs(date2.getTime() - date1.getTime());
					var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
					
					var date3 = new Date(today);
					var date4 = new Date(upcoming_dates);
					var timeDiff = Math.abs(date4.getTime() - date3.getTime());
					var diffDay = Math.ceil(timeDiff / (1000 * 3600 * 24));
					
					   
					  if(diffDays==date_range || diffDay==date_range || diffDay==0)
					  {
						
						  
						  var json={"upcoming_date":upcoming_dates,"prev_date":prev_dates};
						  
						     dateset.push(json);
						  
					  }
					  $scope.date_length=dateset.length;
					  
					  
					  var latlonurl=response.directions_url;
					//  console.log(latlonurl);
					 var latloncombine =   latlonurl.split("https://www.google.com/maps/dir/Current+Location/");
					 var latlon=latloncombine[1].split(',');
					 var lat=latlon[0];
					 var longi=latlon[1];
						var url="http://maps.googleapis.com/maps/api/geocode/json?latlng=";
						var next_url="&sensor=true";
						var only_comma=",";
						var full=url+lat+only_comma+longi+next_url;
						
						vendors.location_url(full).then(function(responses){
				
							//key.results=response.results;
							console.log(response);
							
							var appointment_josn={'appointments':appointments,'response':response,'results':responses.results};
					  $scope.specificvendorappointmentInfo=appointment_josn;
					  

		/*====lawn details code starts here======*/
		var lawn_details = JSON.parse(response.lawn_details);
			$scope.lawn_detail= lawn_details;
			var descrip=$scope.lawn_detail.description;
			$scope.description=descrip.trim();
			console.log(lawn_details);

 /*====lawn details code ends here======*/
							
							
							
							
						})
					  
					 
						 $scope.Picture = function(id) {  
							 

					

						var options = {
							title: 'Choose Option',
							buttonLabels: ['Take Picture', 'Upload From Gallery'],
							addCancelButtonWithLabel: 'Cancel',
							androidEnableCancelButton : true,
							winphoneEnableCancelButton : true,
							addDestructiveButtonWithLabel : 'Delete it'
						  };


							document.addEventListener("deviceready", function () {

							$cordovaActionSheet.show(options)
							  .then(function(btnIndex) {
								var index = btnIndex;
							  });
						  }, false);
			
			
					}	
 
		// $scope.takePicture = function(id) {
			    /*var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
	console
			 var completed="http://img1.sunset.timeinc.net/sites/default/files/image/2011/02/front-yard-facelift-0211-l.jpg";
			 	 var data = "appointment[completed]="+completed+"&api_token="+$scope.orginal.api_token;

			 	 //var data = "completed_works="+completed_work+"&appointment[api_token]="+$scope.orginal.api_token;
	
			 	vendors.completed_update_appointment(data,id).then(function(responses){
					console.log(responses);
					storageService.save("id",id);
					$state.go('app_complete');
					
					
				})*/
				
				
			
				
				
			 	//update_appointment
			 
			 //alert("test");
			 
			 // Use the camera plugin code here
			 

		/*	var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
			*/
			
	  
		
					  
    
})


$scope.openmap  =  function(item){
	//storageService.save("map_image",item);
//$state.go('map');

  window.open(item, "_blank", "location=yes");
   }

$scope.call=  function(){
//alert("call");

//window.open("tel:+919685968574", "_system"); // or if _system doesnt work
//window.open("tel:+919685968574", "_blank");

 // window.open(item, "_blank", "location=yes");
 
 navigator.app.loadUrl('tel:+919999999999', { openExternal:true });
   }


$scope.email=function(){
	navigator.app.loadUrl('mailto:nishantg@ocodewire.com?subject=Hello', { openExternal:true });
	//alert("email");
              //  window.open("mailto:nishantg@ocodewire.com?subject=Hello", "_system"); // or if _system doesnt work
                //window.open("mailto:nishantg@ocodewire.com?subject=Hello", "_blank");
            }


$scope.sms  =  function(phonenumber){
	document.addEventListener("deviceready", function () {
    
    var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };
    
    $cordovaSms
      .send(phonenumber, 'SMS content', options)
      .then(function() {
        // Success! SMS was sent
      }, function(error) {
        // An error occurred
      });

     });
   }






})






.controller('app_completeCtrl', function($scope,$state,$http,vendors,storageService,$stateParams,ApiEndpoint){
	$scope.orginal={};
	   var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
				var appointmentId=storageService.get("id");
	var json={'vendor_appointment_id':appointmentId,'api_token':$scope.orginal.api_token};
	

	vendors.specificvendorappointment(json).then(function(response){
					  var appointments=JSON.parse(response.appointment);
					  
					  console.log(appointments);
					})
	
})




.controller('CancelAppCtrl', function($scope,$state,$http,vendors,storageService,$stateParams,$ionicPopup,ApiEndpoint){
   $scope.orginal  = {};
   $scope.cancel={};
   $scope.appointment={};
    $scope.vendor_auctions={};
   $scope.tab  = 'first';
   $scope.scroll_data=0;
   $scope.rate = 3;
   
   $scope.max  = 5;
   
   
  
   
    
    var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
   
   	   $scope.cancel=$stateParams.cancelID;
   	  

		$scope.cancel_appointment = function(id) {

			var id=id;

   	  	 var cncl_work_resn=document.getElementById("cancl").value;
			 
   	  
   	   var data = "cancelReason="+cncl_work_resn+"&api_token="+$scope.orginal.api_token;

     			var confirmPopup = $ionicPopup.confirm({
      			 title: 'Are you sure',
      			// template: 'Are you sure you want to eat this ice cream?'
     			});
     			confirmPopup.then(function(res) {
      			 if(res) {
       				  $http.post(ApiEndpoint.url+'vendor/appointments/'+id+'/cancel',data)
		.success(function(data){
			console.log(data);
			$state.go("overdue");
			//$scope.list = data.items;
		}).error(function() {
			console.log("FAIL");
		});			
       			} else {
        			 console.log('You are not sure');
       			}
     		});
  		 };



   	   /*$scope.cancel_appointment= function(id) {





			var id=id;

   	  	 var cncl_work_resn=document.getElementById("cancl").value;
			 
   	  
   	   var data = "cancelReason="+cncl_work_resn+"&api_token="+$scope.orginal.api_token;
			
	   $http.post(ApiEndpoint.url+'vendor/appointments/'+id+'/cancel',data)
		.success(function(data){
			console.log(data);
			$state.go("overdue");
			//$scope.list = data.items;
		}).error(function() {
			console.log("FAIL");
		});			
   	  
   }*/
})











.controller('DueCtrl', function($scope,$state,$rootScope,$http,vendors,storageService,ApiEndpoint){
 $scope.showonshedules=false;	
   $scope.orginal  = {};
   $scope.today={};
   $scope.todays={};
   $scope.showonshedule=false;
   	 var datasets  =  []; 
   	 var tomorrow_datasets=[];
   $scope.tomorrows={};
   $scope.vendor_auctions={};
   $scope.disputed_appointments={};
   $scope.piad={};
   $scope.tab  = 'first';
   $scope.scroll_data=0;
   $scope.rate = 3;
   
   $scope.max  = 5;
   $scope.overdue=true;

   var api_token=storageService.get("api_token");

   $scope.timestamp  = [{'time': new Date().getTime()},{'time': new Date().getTime()+ 24 * 60 * 60 * 1000}];
	
	
	
	$scope.changetab  =  function(item){
   $scope.tab = item;
  
   }
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);

    var data = {'api_token':$scope.orginal.api_token};
	
	/*====Star====Separate bid and unbid section===*/
	vendors.vendor_auctions(data).then(function(response){
		console.log(response);
		
    	var vendors=response.unbid_auctions;
 $scope.vendor_auctions=  vendors;
    var alerady_bid = response.already_bid_auctions;
  
   
   
   $scope.bid_auction = alerady_bid;

console.log("a");
console.log(alerady_bid);	
	/*====End === Separate bid and unbid section===*/
   
    var dateObj = new Date();
 
    var dataall = [];
	var month =("0" + (dateObj.getMonth() + 1)).slice(-2)
	var day = ("0" + dateObj.getDate()).slice(-2)
	var year = dateObj.getUTCFullYear();
	
	var newdate = year + "-" + month + "-" + day;
   
    angular.forEach($scope.vendor_auctions, function(key,value){
	   var id=key.id;
	   var json={'auction_id':id,'api_token':$scope.orginal.api_token};
       dataall.push(json);
      
       $http.get(ApiEndpoint.url+'vendor/auctions/'+id+'?api_token='+$scope.orginal.api_token).success(function(data){
		    	key.homeowner=data.homeowner;
		   }); 
      
    });
   
   

    }); 
	 
	
	vendors.vendor_list_appointment(data).then(function(response){
		
		
		console.log(response);
	$scope.appointment_list=JSON.parse(response.appointments);
	
	console.log(response.disputed_appointments);
	$scope.disputed_appointments=JSON.parse(response.disputed_appointments);
	//var test=$http.get("https://www.google.com/maps/dir/Current+Location/36.153325,-86.576533");
	//console.log(test);
	
	console.log($scope.appointment_list); 
	
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = yyyy+'-'+mm+'-'+dd;
    
    $scope.todays=today;
    
	var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	    if(day<10){
        day='0'+day;
    } 
    if(month<10){
        month='0'+month;
    } 
	
	
	    var tomorrow = year+'-'+month+'-'+day;
		$scope.tomorrows=tomorrow;
	
	angular.forEach($scope.appointment_list, function(key,value){
				  
				var id=key.id;
				
				var dates=key.service_date;
				if(dates==today)
				{
					datasets.push(dates);
				}
				if(dates==tomorrow)
				{
					tomorrow_datasets.push(dates);
				}
				
				
				
				var json={'vendor_appointment_id':id,'api_token':$scope.orginal.api_token};
				 //atasets.push(json);
				  vendors.specificvendorappointment(json).then(function(response){
console.log(response);
					key.homeowners=JSON.parse(response.homeowner);
					var latlonurl=response.directions_url;
					 var latloncombine =   latlonurl.split("https://www.google.com/maps/dir/Current+Location/");
					 var latlon=latloncombine[1].split(',');
					 var lat=latlon[0];
					 var longi=latlon[1];
						var url="http://maps.googleapis.com/maps/api/geocode/json?latlng=";
						var next_url="&sensor=true";
						var only_comma=",";
						var full=url+lat+only_comma+longi+next_url;
						
						vendors.location_url(full).then(function(response){
				
							key.results=response.results;
						});
							
					    //var newlocation=$http.get(full);
					   // alert(newlocation);
					   //console.log(newlocation);
					 //  console.log(newlocation.$$state.value.data.results);
					    
					  key.directions_url=response.directions_url;
				  })
				 
				//  console.log($scope.allBids);
				})
				
				
				angular.forEach($scope.disputed_appointments, function(key,value){
				  
				var id=key.id;
				var service_date=key.service_date;
				
				var new_dispute_date_json={"service_date":service_date};
				
				storageService.save("dispute_service_date",new_dispute_date_json);
				var json={'vendor_appointment_id':id,'api_token':$scope.orginal.api_token};

				  vendors.specificvendorappointment(json).then(function(response){
					//  console.log(response);
					key.homeowners=JSON.parse(response.homeowner);
					var latlonurl=response.directions_url;
					 var latloncombine =   latlonurl.split("https://www.google.com/maps/dir/Current+Location/");
					 var latlon=latloncombine[1].split(',');
					 var lat=latlon[0];
					 var longi=latlon[1];
						var url="http://maps.googleapis.com/maps/api/geocode/json?latlng=";
						var next_url="&sensor=true";
						var only_comma=",";
						var full=url+lat+only_comma+longi+next_url;
						
						vendors.location_url(full).then(function(response){
				
							key.results=response.results;
						});
							
			
					    
					  key.directions_url=response.directions_url;
				  })
				 
				//  console.log($scope.allBids);
				})
				
	
	
	$scope.tomorrow_count=tomorrow_datasets.length;
		$scope.today_count=datasets.length;
	
	});
	
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
	var data=$scope.orginal.api_token;
	vendors.payments(data).then(function(response){
		var paid_payment=JSON.parse(response.paid_appointments);
		console.log(paid_payment);
		$scope.paid=paid_payment;
		
		
		
		angular.forEach($scope.paid, function(key,value){
				  
				var id=key.id;

				
				
				
				
				
				var json={'vendor_appointment_id':id,'api_token':$scope.orginal.api_token};
				 //atasets.push(json);
				 console.log(json);
				  vendors.specificvendorappointment(json).then(function(response){
					console.log(response);
					var latlonurl=response.directions_url;
					 var latloncombine =   latlonurl.split("https://www.google.com/maps/dir/Current+Location/");
					 var latlon=latloncombine[1].split(',');
					 var lat=latlon[0];
					 var longi=latlon[1];
						var url="http://maps.googleapis.com/maps/api/geocode/json?latlng=";
						var next_url="&sensor=true";
						var only_comma=",";
						var full=url+lat+only_comma+longi+next_url;
						
						vendors.location_url(full).then(function(response){
				
							key.results=response.results;
						});
		});
		
		console.log($scope.paid);
		});
		
	
		
	});


/*new code */
  $scope.toggleOver = function() {
            $scope.overdue = $scope.overdue === false ? true: false;
        };

 $scope.toggleToday = function() {
            $scope.todayhideshow = $scope.todayhideshow === false ? true: false;
        };
        
         $scope.toggleTomorrow = function() {
            $scope.tomorrowhideshow = $scope.tomorrowhideshow === false ? true: false;
        };
                 $scope.toggleTomorrow = function() {
            $scope.tomorrowhideshow = $scope.tomorrowhideshow === false ? true: false;
        };
             
              $scope.toggleComing = function() {
            $scope.cominghideshow = $scope.cominghideshow === false ? true: false;
        };
        
        
                $scope.toggleDispute = function() {
            $scope.dispute = $scope.dispute === false ? true: false;
        };
        
       /*new code end */ 
       

       $rootScope.$on('ROUTE_CHANGE',function(e,response){
       console.log(response);
       var toggle=JSON.parse(storageService.get("toggle"));

       if((response.controller == 'RescheduleCtrl') && (toggle.status != null))
       {
		   $scope.showonshedule=true;
		  
		     $scope.showonshedules=true;
		   storageService.remove('toggle');
	   }
    

 if((response.controller == 'CancelAppCtrl'))
       {
		   
		  
		     $scope.showonshedules=true;
		   storageService.remove('toggle');
	   }

   
 })

$scope.ok = function() {
 var res_data=JSON.parse(storageService.get("res_data"));
		   var res_id=JSON.parse(storageService.get("res_id"));
		   console.log(res_data); 
		   var ids=res_id.id;
		   var data=res_data.data;
		  // alert(ids);
		  
			
           vendors.reschedule_date(ids,data).then(function(responses){
		   console.log(responses);
		 $scope.showonshedule=false;
			})
		}
       
/*======Cancel Appointment when clicks on button starts here======*/   
   
$scope.cancelAppointment = function() {

$scope.showonshedules=false;	
console.log('cancel');


}
/*======Cancel Appointment when clicks on button ends here======*/
       
})



.controller('paidCtrl', function($scope,$state,$http,vendors,storageService,$stateParams){
	$scope.orginal={};
	$scope.paid_amount={};
	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
	var paid_id=$stateParams.paidID;
	var json={'vendor_appointment_id':paid_id,'api_token':$scope.orginal.api_token};
	vendors.specific_payments(json).then(function(response){
		
		$scope.paid_amount=JSON.parse(response.payment);
		console.log($scope.paid_amount);

		
		
	})
})

.controller('ServiceCtrl', function($scope,$state,$http,vendors,storageService,$stateParams){
	$scope.orginal={};
	$scope.dispute={};
	$scope.dispute_service_date={};

	
	var disputeappointmentId=$stateParams.disputeappointmentId;

	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
	
	var json={'disputeappointmentId':disputeappointmentId,'api_token':$scope.orginal.api_token};
	vendors.dispute_view(json).then(function(response){
	$scope.dispute=response;
	console.log(response);
	var disputed_date= storageService.get("dispute_service_date");
	var dis_date=JSON.parse(disputed_date);
	$scope.dispute_service_date= new Date(dis_date.service_date);
	
	console.log($scope.dispute_service_date);


		$scope.cancel_service = function() {
			
		vendors.cancel_services().then(function(responses){
		console.log(responses);
		
			})
			
			
		}
		
	})
	
	
})

.controller('ComplaintCtrl', function($scope,$state,$http,vendors,storageService,$cordovaCamera,$stateParams){
$scope.takePicture = function() {

        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            console.log($scope.imgURI);
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }



	$scope.orginal={};
	$scope.dispute={};

	var api_token=storageService.get("api_token");
	$scope.orginal.api_token =JSON.parse(api_token);
	var api_tokens=$scope.orginal.api_token;
	var complaintId=$stateParams.complaintId;
	var image="";
	var descrip="my mistake. it was a long day. i fixed it";
	
			var data = "dispute[resolution_image]="+image+"&dispute[resolution_description]="+descrip+"&api_token="+$scope.orginal.api_token;
			
			$scope.complaintregister=function() {
	
			vendors.complaint(data,complaintId,api_tokens).then(function(response){
				console.log(response);
			})
		}
	//alert(complaintId);
	
	
	
})

.controller('RescheduleCtrl', function($scope,$state,$http,vendors,storageService,$stateParams){
	
		$scope.orginal={};
		$scope.photos = [];
		$scope.dates={};
		
	  var res_id=$stateParams.resId;
	  $scope.resp_id=res_id;
	
				var api_token=storageService.get("api_token");
		$scope.orginal.api_token =JSON.parse(api_token);
				
				vendors.reschedule_appointment(res_id,$scope.orginal.api_token).then(function(responses){
					
				var appointment=JSON.parse(responses.appointment);
				console.log();
				
				var new_var=appointment.service_date;
				
				 var today = new Date(new_var); 

	var year = today.getFullYear();
	var month = today.getMonth();
	var date = today.getDate();
	var wk_regular=new Date(year, month, date);
	$scope.dates=wk_regular;
	console.log($scope.dates);
	for(var i=0; i<30; i++){
    var wk_first=new Date(year, month, date + i);
    // console.log(day);
	var new_date_format_wk_first=wk_first.getDate()+'-'+wk_first.getMonth()+'-'+wk_first.getFullYear();
	
  $scope.photos.push(wk_first);

    
   
  }
	  console.log($scope.photos);			
				})
			
	  

 

	$scope.reschdule= function(id){
		
		
		var id={"id":id};
		var note= document.getElementById("res_resn").value;
		var requested_date="March 21, 2015";
		var api_token=storageService.get("api_token");
		$scope.orginal.api_token =JSON.parse(api_token);
	   	var data = "note="+note+"&requested_date="+requested_date+"&api_token="+$scope.orginal.api_token;
	   	var data={"data":data};
	   	storageService.save("res_data",data);
	   	storageService.save("res_id",id);
	   	storageService.save('toggle',{'status':1});
	   	$state.go("overdue");
	
	
	
   }
/*$scope.divOuterGreen=function($index)
{
	
  
  //$scope.itemClicked = function ($index) {
    console.log($index);
    $scope.selectedIndex = $index;
}*/

  
  $scope.selectedIndex =1;
  
  $scope.itemClicked = function ($index) {
    console.log($index);
    $scope.selectedIndex = $index;
  }
	
})




.controller('BidCtrl', function($scope,$state,$http,vendors,storageService,$stateParams,$ionicLoading, $compile ,ApiEndpoint){

	        $scope.orginal  = {};
	     	$scope.auction  = {};
		    $scope.vendor_auctions_place_bid={};
		    var vendor_id=$stateParams.vendorId;
		    var api_token=storageService.get("api_token");
			$scope.orginal.api_token =JSON.parse(api_token);
		    var json={'auction_id':vendor_id,'api_token':$scope.orginal.api_token};
						 
         // Coordinates to center the map
	        $scope.latlong = {};
			

			 	
             
			 // if HTML DOM Element that contains the map is found...
			 function initialize() {

			 	vendors.vendorInfo(json).then(function(response){
					console.log(response);
					
					$scope.descrip=response.lawn;
				var descrip=$scope.descrip.description;
			   $scope.descriptions=descrip.trim();
			   
			   console.log($scope.descriptions);
					/*===how_often and last_cut====*/
					$scope.place_bid_cat = JSON.parse(response.auction);

					var place_cat = $scope.place_bid_cat;
					$scope.category = place_cat;	
					/*===how_often and last_cut====*/			
					
				//console.log(response.auction);
				var auction=JSON.parse(response.auction);
				
				$scope.latlong.lat = response.hash[0].lat;
				$scope.latlong.lon = response.hash[0].lng;
				

				 var myLatlng = new google.maps.LatLng($scope.latlong.lat,$scope.latlong.lon);
			 
			    // Other options for the map, pretty much selfexplanatory
			    
			    var mapOptions = {
			        zoom: 14,
			        center: myLatlng,
			        mapTypeId: google.maps.MapTypeId.ROADMAP
			    };
			 
			   var panoramaOptions = {
				position: myLatlng,
				pov: {
				  heading: 34,
				  pitch: 10
				}
			  };
			  var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
			//  map.setStreetView(panorama);
		
			 
			 
			    // Attach a map to the DOM Element, with the defined settings
			    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

		
		  	    var place_bid={'auctions':auction,'response':response}
				
				$scope.vendor_auctions_place_bid=place_bid;
				
			 })
			 	  console.log($scope.latlong);
			 	
			 }
				  google.maps.event.addDomListener(window, 'load', initialize());
				  $scope.you_place_bid  =  function(item){

					var bid_amt= document.getElementById("amt").value;
					var vendor_note= document.getElementById("bid_resn").value;
					if(bid_amt>0)
					{
					     var api_token=storageService.get("api_token");
							$scope.orginal.api_token =JSON.parse(api_token);
							console.log($scope.orginal.api_token);
					 var data = "bid_amount="+bid_amt+"&vendor_note="+vendor_note+"&api_token="+$scope.orginal.api_token;
					
					/*comment due to cross-domain error statego in createbid part */
					
					 /* var req = {
						 method: 'post',
						 url: ApiEndpoint.url+'vendor/auctions/'+item,
						 headers: {
						   'Content-Type': 'application/json'
						 },
						 data: data
						}

						$http(req).success(function(success){
							 console.log(success);
							}).error(function(e){  console.log(e); }); */
							
							
							vendors.update_vendor_auctions(data,item).then(function(responses){
		
							console.log(responses);

		
								})
							
				
					$state.go('overdue');
					
					
					
					}
						}
				  
    
	




})



































