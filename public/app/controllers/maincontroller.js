app.controller('mainController',["$scope","authFactory","$location","socket",function($scope,auth,location,socket){
	$scope.isLoggedIn=auth.isLoggedIn()
	
	if($scope.isLoggedIn){
		//console.log("i ama here")
		auth.getUser().then(function(data){
			console.log(data)
			$scope.user=data.data.name
		})
	}


	$scope.logout=function(){
		//console.log("logout clicked")
		auth.logout()
	}

	$scope.clear=function(){
		console.log($scope.text)
		$scope.text={}
	}

	$scope.messages=[]
	var socket = io.connect('http://localhost:7000', {
  		'query': 'token=' + auth.getToken()
	});

	socket.on('connect', function () {
    	socket.emit('new user',{user:"new user"})
  	}).on('disconnect', function () {
    	console.log('disconnected');
  	});

	socket.on('message created',function(data){
		console.log("message created")
		$scope.messages.push(data)
		$scope.$apply() 
	})


	socket.on('user joined',function(data){
		console.log(data)
	 	$scope.messages.push(data+' joined')
	}) 

	
	$scope.submit=function(text){
		socket.emit('new message',{text:text})
	}

	

}])