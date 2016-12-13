var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
    checkin:{type: Date},
    checkout:{type: Date},
    createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true}
});

var Reservation = mongoose.model('reservation', schema);

module.exports = Reservation;
