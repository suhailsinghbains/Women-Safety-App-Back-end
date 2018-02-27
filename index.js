var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
const { Client } = require('pg');
//DB Connect String
var connect = "postgres://postgres:suhail98@localhost/NeedHelp";
const client = new Client({
   user: 'postgres',
   database: 'NeedHelp',
   password: 'suhail98',
   port: 5432,
 });
 app.post('/:imei/:lat/:long/:time/:comments',function(req, res){
   client.connect();
   var last_insert;
     client.query('SELECT MAX("Sno") FROM "NeedyTable";',(err, res) => {
       last_insert=res.rows[0].max;
       last_insert++;
       client.query('INSERT INTO "NeedyTable" VALUES ('+last_insert+","+req.params.imei+","+req.params.lat+","+req.params.long+",'"+req.params.time+"','"+req.params.comments+"');", (err, res) => {
         err ? err.stack : End_of_this_part_1()
       });
     });
     function End_of_this_part_1(){
         res.sendStatus(200);
         res.end();
       }
 })
 .get('/:imei', function(req, res){
   var response = "";
   client.connect();
   client.query('SELECT * FROM "NeedyTable" WHERE "IMEI" = ' + req.params.imei + ';',(err, res) => {
     if(res==undefined){
       response = "No Details of IMEI Number: " + req.params.imei + " were ever entered";
     }
     else if(res.rows[0]==undefined){
       response = "No Details of IMEI Number: " + req.params.imei + " were ever entered";
     }
     else {
       response = res.rows;
     }
     err ? err.stack : End_of_this_part_2()
   });
   function End_of_this_part_2() {
     res.send(response);
     res.end();
   }
 })
 .listen(300);
