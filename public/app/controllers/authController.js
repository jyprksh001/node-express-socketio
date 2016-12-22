app.controller('AuthController',["$scope","$location","authFactory","$timeout",function(scope,location,auth,timeout){
	scope.login=function(user){
		auth.login(user).then(function(data){	
				console.log(auth.isLoggedIn())		
				location.path('/');
		})
	};
	
	scope.signUp=function(user){
		auth.signUp(user).then(function(data){
			auth.setToken(data.data.token)
			location.path('/');
		})
	}
}])