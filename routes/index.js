var express = require('express');
var Validator = require('../module/validate');
var DB = require('../module/database');
var querystring = require('querystring');
var url = require('url');

var router = express.Router();

var validator = new Validator();
var db = new DB();
db.initial();

router.get('/', function(req, res, next) {
	if (req.session.user != undefined) {
		res.redirect('/detail');
	}
	else {
		res.render('index', { title: '登录', username:'', password: '', reason:'' });
	}	
});

router.post('/', function(req, res, next) {
  console.log("/ post");
  db.query({username: req.body.username}).then(function(user) {
  	if (user != undefined) {
  		if (user.password == req.body.password) {
  			req.session.user = user;
  			res.redirect('/detail');
  		}
  		else {
  			res.render('index', { title: '登录', username:req.body.username, password: req.body.password, reason:'密码错误!'});
  		}
  	}
  	else {
  		res.render('index', { title: '登录', username:req.body.username, password: req.body.password, reason:'用户名不存在!'});
  	}
  });   	
});
	

router.get('/regist', function(req, res, next) {
	console.log("/regist get");
	if (req.session.user != undefined) {
		res.redirect('/detail');
	}
	else {
  		res.render('regist', {title: '注册', username:'', sid:'', phone:'', email:'', password:'', passwordAgain:'', reason:''});
	}
});

router.post('/regist', function(req, res, next) {
	console.log("/regist post");
  if (validator.checkUsername(req.body.username) && 
	  validator.checkSid(req.body.sid) &&
	  validator.checkPhone(req.body.phone) && 
	  validator.checkEmail(req.body.email) &&
	  validator.checkPassword(req.body.password, req.body.passwordAgain)) {
    db.query({username: req.body.username}).then(function(user) {
    	if (user != undefined) {
  			res.render('regist', {title: '注册', username:req.body.username, sid:req.body.sid, phone:req.body.phone, email:req.body.email, password:req.body.password, passwordAgain:req.body.passwordAgain, reason:"用户名已存在!"});
  		}
  		else {
  			return db.query({sid: req.body.sid});
  		}
    }).then(function(user) {
    	if (user != undefined) {
  			res.render('regist', {title: '注册', username:req.body.username, sid:req.body.sid, phone:req.body.phone, email:req.body.email, password:req.body.password, passwordAgain:req.body.passwordAgain, reason:"学号已存在!"});
  		}
  		else {
  			return db.query({phone: req.body.phone});
  		}
    }).then(function(user) {
    	if (user != undefined) {
  			res.render('regist', {title: '注册', username:req.body.username, sid:req.body.sid, phone:req.body.phone, email:req.body.email, password:req.body.password, passwordAgain:req.body.passwordAgain, reason:"电话已存在!"});
  		}
  		else {
  			return db.query({email: req.body.email})
  		}
    }).then(function(user) {
    	if (user != undefined) {
  			res.render('regist', {title: '注册', username:req.body.username, sid:req.body.sid, phone:req.body.phone, email:req.body.email, password:req.body.password, passwordAgain:req.body.passwordAgain, reason:"邮箱已存在!"});
  		}
  		else {
  			req.session.user = req.body;
  			db.insert(req.body);
    		res.redirect('/detail');
  		}
    });
  }
  else {
  	res.render('regist', {title: '注册', username:req.body.username, sid:req.body.sid, phone:req.body.phone, email:req.body.email, password:req.body.password, passwordAgain:req.body.passwordAgain, reason:validator.errorInfo});
  }
});

router.get('/detail', function(req, res, next) {
	console.log("/detail get");
	if (req.session.user) {
  		res.render('detail', {title: '详情', username:req.session.user.username , sid:req.session.user.sid, phone:req.session.user.phone, email:req.session.user.email});
	}
	else {
		res.redirect('/');
	}
});

router.post('/detail', function(req, res, next) {
	console.log("/detail post");
  req.session.user = undefined;
  res.redirect('/');
});

router.all('*', function(req, res, next) {
	console.log("*");
	req.session.user ? res.redirect('/detail') : res.redirect('/');
});

module.exports = router;
