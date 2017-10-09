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
    wisdom: { type: String },
    strength: { type: String },
    hp: { type: String},
    owner : {type : String}
});

adventure = new Schema({
    owner : {type : String},
    name : {type : String}
})

invitation = new Schema({
    party : {type : String},
    player : {type : String},
    character : {type : String}
})

output.account = mongoose.model('account', account);
output.character = mongoose.model('character', character);
output.adventure = mongoose.model('adventure', adventure);
output.invitation = mongoose.model('invitation', invitation);

module.exports = output; 