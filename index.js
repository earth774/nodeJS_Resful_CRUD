var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');
    next();
});

var con = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"",
            database:"banking"
        });

	app.get('/data',function(req,res){
		var sql = "SELECT * FROM `account` WHERE 1";
		con.query(sql,function(err,row){
			if(err) throw err;
			res.json(row);
		});

	});

	app.post('/insert',function(req,res){
		var sql ="INSERT INTO `account`(`branch_name`, `balance`) VALUES (?,?)";
		con.query(sql,[req.body.branch_name,req.body.balance],function(err){
			if (err) throw err;
			res.json({'data':'success'});
		})
	});

	app.put('/update',function(req,res){
		var sql ="UPDATE `account` SET `branch_name`=?,`balance`=? WHERE `account_number`=?";
		con.query(sql,[req.body.branch_name,req.body.balance,req.body.account_number],function(err){
			if (err) throw err;
			res.json({'data':'success'});
		})
	});

	app.delete('/delete/:id',function(req,res){
		var sql ="DELETE FROM `account` WHERE `account_number`="+req.params.id;
		con.query(sql,function(err){
			if (err) throw err;
			res.json({'data':'success'});
		})
	});
app.listen(port);