app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'app/views/pages/home.html',
			controller:  'homeController'
		})
		.when('/login', {
			templateUrl: 'app/views/pages/login.html',
			controller: 'AuthController',
			controllerAs:'auth'
		})
		.when('/signup', {
			templateUrl: 'app/views/pages/signup.html',
			controller:'AuthController',
			controllerAs:'auth'
		})
	$locationProvider.html5Mode(true);
})