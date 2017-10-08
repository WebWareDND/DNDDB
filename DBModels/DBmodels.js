var mongoose = require('mongoose');
var output = {};
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

account = new Schema({
    username: { type: String, unique : true},
    password: { type: String}
});

character = new Schema({
    name: { type: String },
    wisdom: { type: String}
});

output.account = mongoose.model('account', account);
output.character = mongoose.model('character', character);

module.exports = output; 