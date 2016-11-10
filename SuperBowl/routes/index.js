var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Team = mongoose.model('Team');

router.get('/teams', function(req, res, next) {
  Team.find(function(err, teams){
    if(err){ return next(err); }
    res.json(teams);
  });
});

router.post('/teams', function(req, res, next) {
  var team = new Team(req.body);
  team.save(function(err, team){
    if(err){ return next(err); }
    res.json(team);
  });
});

router.param('team', function(req, res, next, id) {
  var query = Team.findById(id);
  query.exec(function (err, team){
    if (err) { return next(err); }
    if (!team) { return next(new Error("can't find team")); }
    req.team = team;
    return next();
  });
});

router.get('/teams/:team', function(req, res) {
  res.json(req.team);
});

router.put('/teams/:team/vote', function(req, res, next) {
  req.team.vote(function(err, team){
    if (err) { return next(err); }
    res.json(team);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
