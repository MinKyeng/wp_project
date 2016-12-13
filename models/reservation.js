var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
    writer: {type:String, require:true},
    name: {type:String, require:true},
    email: {type:String, require:true},
    checkin:{type: Date, require:true},
    checkout:{type: Date, require:true},
    member:{type: Number},
    createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true}
});

var Reservation = mongoose.model('reservation', schema);

module.exports = Reservation;
