var express = require('express'),
    Room = require('../models/room'),
    Comment = require('../models/comment');
var router = express.Router();

/* GET posts listing. */
router.get('/', function(req, res, next) {
  Room.find({}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.render('rooms/index', {room: docs});
  });
});

router.get('/list', function(req, res, next) {
  Room.find({}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.render('rooms/list', {rooms: docs});
  });
});
router.get('/new', needAuth, function(req, res, next) {
  res.render('rooms/new');
});

//글읽기
router.get('/:id', function(req, res, next) {
  Room.findById(req.params.id, function(err, room) {
    if (err) {
      return next(err);
    }
    room.read+=1; //조회수를 1 증가
    Comment.find({room: room.id}, function(err, comments) {
      if (err) {
        return next(err);
      }
      res.render('rooms/show', {room: room, comments: comments});
    });
  });
});

router.post('/', function(req, res, next) {
  var room = new Room({
    name: req.body.name,
    address: req.body.address,
    facility: req.body.facility,
    fare: req.body.fare,
    rule: req.body.rule,
    desc: req.body.desc
  });

  room.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/rooms/list');
  });
});

router.post('/:id/comments', function(req, res, next) {
  var comment = new Comment({
    room: req.params.id,
    email: req.body.email,
    content: req.body.content
  });

  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    Room.findByIdAndUpdate(req.params.id, {$inc: {numComment: 1}}, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/rooms/' + req.params.id);
    });
  });
});

module.exports = router;

function needAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.flash('danger', '로그인이 필요합니다.');
      res.redirect('/signin');
    }
}