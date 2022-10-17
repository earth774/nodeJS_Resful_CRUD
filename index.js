var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );
  next();
});

var port = process.env.PORT || 3000;

var con = mysql.createConnection({
    host: "h1.host.filess.io",
    user: "banking_speakgain",
    password: "1e209559216223680a1cf0f6dc87b1a5ecaaca60",
    database: "banking_speakgain",
  });
  
  app.get("/customer", function (req, res) {
    var sql = "SELECT * FROM `customer`";
    con.query(sql, function (err, row) {
      if (err) throw err;
      res.json({
        status: "success",
        data: row,
      });
    });
  });
  
  app.get("/customer/:id", function (req, res) {
    var sql = "SELECT * FROM `customer` WHERE `id`=" + req.params.id;
    con.query(sql, function (err, row) {
      if (err) throw err;
      res.json({
        status: "success",
        data: row[0],
      });
    });
  });
  
  app.post("/customer/", function (req, res) {
    var sql = "INSERT INTO `customer`(`fullname`, `phone_number`) VALUES (?,?)";
    con.query(sql, [req.body.fullname, req.body.phone_number], function (err) {
      if (err) throw err;
      res.json({
        status: "success",
        data: "Add data success",
      });
    });
  });
  
  app.put("/customer/:id", function (req, res) {
    var sql =
      "UPDATE `customer` SET `fullname`=?,`phone_number`=? WHERE `id`=" +
      req.params.id;
    con.query(sql, [req.body.fullname, req.body.phone_number], function (err) {
      if (err) throw err;
      res.json({
        status: "success",
        data: "Update data success",
      });
    });
  });
  
  app.delete("/customer/:id", function (req, res) {
    var sql = "DELETE FROM `customer` WHERE `id`=" + req.params.id;
    con.query(sql, function (err) {
      if (err) throw err;
      res.json({
        status: "success",
        data: "Delete data success",
      });
    });
  });

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
