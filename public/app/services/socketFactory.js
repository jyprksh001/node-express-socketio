app.factory('socket',["$rootScope",function(rootScope){

	var obj={}

	var socket = io('http://localhost:7000');
  	
  	obj.on=function(){
  
		socket.on('connect', function () {
	  		socket
	    		//.emit('authenticate', {token:}) //send the jwt
	    		.on('authenticated', function () {
	      		//do other things
	    		})
	    		.on('unauthorized', function(msg) {
	      			console.log("unauthorized: " + JSON.stringify(msg.data));
	      			throw new Error(msg.data.type);
	    		})
		});
  	}

  	return obj
}])