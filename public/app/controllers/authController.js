app.controller('AuthController',["$scope","$location","authFactory","$timeout","$rootScope",function(scope,location,auth,timeout,$rootScope){
	scope.login=function(user){
		auth.login(user).then(function(data){
				$rootScope.$broadcast('msgid',{isLoggedIn:true});	
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