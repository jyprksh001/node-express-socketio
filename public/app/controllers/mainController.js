app.controller('mainController',["$scope","authFactory","$location",function($scope,auth,location){
	$scope.isLoggedIn=auth.isLoggedIn();

	if($scope.isLoggedIn){
		auth.getUser().then(function(data){
			$scope.user=data.data.name
		})
	}

	$scope.$on('msgid', function(event, msg) {
    	$scope.isLoggedIn=msg.isLoggedIn
  	});

	$scope.logout=function(){
		//console.log("logout clicked")
		auth.logout()
		$scope.isLoggedIn=false
	}

}])