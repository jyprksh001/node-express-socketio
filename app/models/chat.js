var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({	
	text:String,
	date:{type: Date, default: Date.now },
	user:{type: Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Chat', chatSchema);


