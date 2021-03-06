app.controller('homeController',["$scope","authFactory","$location","socket",function($scope,auth,location,socket){

	$scope.isLoggedIn=auth.isLoggedIn()
	$scope.messages=[]
	$scope.textdata={}
	if($scope.isLoggedIn){
		auth.getAll().then(function(data){
			 angular.forEach(data.data,function(el){
			 	$scope.messages.push(el.text)
			 })
		})
	}

	// $scope.clear=function(){
	// 	console.log($scope.textdata)
	// 	$scope.textdata=''
	// }

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
		$scope.messages.push(data.text)
		$scope.textdata={}
		$scope.$apply() 
	})

	socket.on('user joined',function(data){
		console.log(data)
	 	$scope.messages.push(data+' joined')
	 	$scope.$apply()

	})
	$scope.submitData=function(textdata){
		socket.emit('new message',{text:textdata.text})
	}

}])