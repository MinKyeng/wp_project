var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  room: {type: Schema.Types.ObjectId, required: true},
  writer: {type: String, required: true},
  content: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Comment = mongoose.model('Comment', schema);

module.exports = Comment;
