var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    
    "username" 	 :  { type: String },
    "email_ID"   :  { type: String },
    "Password"   :  { type: String }, 
    
   
});

module.exports = mongoose.model('users', usersSchema, 'users')
