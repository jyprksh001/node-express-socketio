var app=angular.module('liftoff',['ngRoute']);
app.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
})

