app.factory('AuthInterceptor', ["$q","$location","$injector",function($q, $location,$injector){
	var interceptorFactory = {};
	interceptorFactory.request = function(config) {
		var AuthFactory=$injector.get('authFactory');
		var token = AuthFactory.getToken();
		if(token) {
			//console.log(token)
			config.headers['x-access-token'] = token;
		}
		return config;
	};
	
	return interceptorFactory;
}]);