var express = require('express');
    Reservation = require('../models/reservation');
var router = express.Router(); //express에 Router라는 함수를 호출한 결과를 router에 할당.

/* GET posts listing. */

//글 목록 페이지를 보여준다.
//get : 서버에게 resorce를 보내달라고 요청. 서버의 resource는 클라이언트로 전달만 될 뿐 변경되지 않는다.
router.get('/', function(req, res, next) {
  Reservation.find({}, function(err,reservations) { //find는 조건에 맞는 결과를 모두 찾아 array로 전달.
    if (err) {
      return next(err);
    }
    res.render('reservation/index',{ reservations:reservations }); // posts/index.jade파일을 보여준다. render : view template를 보여준다.
  });
});

//글 쓰기
//글쓰기 페이지를 보여줌
router.get('/new', function(req, res, next) {
  res.render('reservation/new'); //글쓰기를 할때는 post값이 없으므로 post인자를 비워서 보낸다.
});

//글 읽기
router.get('/:id', function(req, res, next) {
  Reservation.findById(req.params.id, function(err, reservation) {
    if (err) {
      return next(err);
    }
    reservation.save(function(err){//save 메소드를 호출해 저장.
      if(err){
        return next(err);      
      }
      res.render('reservation/show', {reservation: reservation});
    });
    
  });
});

//글쓰기 
//post : 서버에게 resource를 보내면서 생성해달라고 요청.
router.post('/', function(req, res, next) {
  Reservation.findOne({email: req.body.email}, function(err, reservation) { //findOne : 인자로 넘겨 받은 오브젝트에 해당하는 데이터를 하나 찾는다.
    if (err) {
      return next(err);
    }   
    var newPost = new Reservation({
      writer: req.body.writer,
      name: req.body.name,    
      email: req.body.email,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      member: req.body.member
    });

    newPost.save(function(err) { //save 메소드를 호출해 저장.
      if (err) {
        return next(err);
      } else {
        res.redirect('/reservation');
      }
    });
  });
});


module.exports = router;