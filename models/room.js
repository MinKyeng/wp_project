var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim:true},
  address: {type: String, required: true, trum:true},
  facility: {type: Array, required: true},
  fare: {type: Number, required: true},
  rule: {type: String},
  desc: {type: String},
  numComment: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true}
});

var Room = mongoose.model('Room', schema);

module.exports = Room;
