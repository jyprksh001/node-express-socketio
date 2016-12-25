var User=require('../models/user');
var Chat=require('../models/chat');
var config = require('../../config');
var secretKey = config.secretKey;
//var jsonwebtoken = require('jsonwebtoken');
var socketioJwt=require('socketio-jwt')

module.exports=function(io){
    io.use(socketioJwt.authorize({
      secret: config.secretKey,
      handshake: true
    }));

    io.on('connection', function (socket) {
          console.log('hello! ', socket.decoded_token.name);
          var defaultRoom = 'general';

          socket.on('new user',function(data){
            socket.join(defaultRoom);
            io.in(defaultRoom).emit('user joined', socket.decoded_token.name);  
          })

          socket.on('new message',function(data) {
                    //Create message
                    //console.log(data)
                    //console.log(socket.decoded_token)
                    //console.log(data)
                    var newMsg = new Chat({
                                  user:socket.decoded_token.id,
                                  text:data.text
                                });
                    //Save it to database
                    newMsg.save(function(err, msg){
                      //Send message to those connected in the room
                      //console.log(msg)
                      if(!err){
                        console.log(msg)
                        io.in(defaultRoom).emit('message created', msg);
                      }
                      
                    });
          });
    })
}
