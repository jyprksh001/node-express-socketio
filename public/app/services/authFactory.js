app.factory("authFactory",["$window","$location","$http",function(window,location,$http){
	var authFactory = {};
	
	authFactory.getToken=function(){
		return window.localStorage.getItem('token')
	}

	authFactory.setToken=function(token){
		if(token){
			window.localStorage.setItem('token',token)
		}else{
			window.localStorage.removeItem('token')
		}
	}

	authFactory.login = function(user) {
		return $http.post('/api/login', {
			username: user.username,
			password: user.password
		})
		.success(function(data) {
			authFactory.setToken(data.token);
			console.log(data)
			return data;
		})
	}

	authFactory.signUp=function(user){
		return $http.post('/api/signup', user);
	}

	authFactory.logout = function() {
		authFactory.setToken();
		location.path('/')
	}

	authFactory.isLoggedIn = function() {
		if(authFactory.getToken())
				return true;
		else
			return false;
	}

	authFactory.getUser = function() {
		if(authFactory.getToken())
			return $http.get('/api/me');
		else
			return $q.reject({ message: "User has no token"});
	}
	return authFactory;
}])