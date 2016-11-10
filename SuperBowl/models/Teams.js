var mongoose = require('mongoose');
var TeamSchema = new mongoose.Schema({
  title: String,
  picture: String,
  votes: {type: Number, default: 0},
});
TeamSchema.methods.vote = function(cb) {
  this.votes += 1;
  this.save(cb);
};
mongoose.model('Team', TeamSchema);