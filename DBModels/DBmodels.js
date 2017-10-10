var mongoose = require('mongoose');
var output = {};
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

account = new Schema({
    username: { type: String, unique : true},
    password: { type: String},
    _id : Schema.Types.ObjectId
});

character = new Schema({
    hp: { type: String},
    race: {type: String},
    name: { type: String },
    strength: { type: String },
    level: { type: String},
    owner : { type: Schema.Types.ObjectId, ref: 'account'},
    dexterity: { type: String },
    constitution: { type: String},
    intelligence: { type: String},
    wisdom: { type: String },
    charisma: { type: String }
});

adventure = new Schema({
    owner : { type: Schema.Types.ObjectId, ref: 'account'},
    name : {type : String}
})

invitation = new Schema({
    adventure : { type: Schema.Types.ObjectId, ref: 'adventure'},
    player : { type: Schema.Types.ObjectId, ref: 'player'},
    character : { type: Schema.Types.ObjectId, ref: 'character'}
})

output.account = mongoose.model('account', account);
output.character = mongoose.model('character', character);
output.adventure = mongoose.model('adventure', adventure);
output.invitation = mongoose.model('invitation', invitation);

module.exports = output; 