var express    = require("express");
var mysql      = require('mysql');
var bodyParser  = require('body-parser');

var connection = mysql.createConnection({
    host     : '54.233.161.95',
    user     : 'root',
    password : '4linux',
    database : 'Pessoas'
});
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
var erroPadrao = {'message': 'Parâmetros do EndPoint com erro!', 'status' : 403};

connection.connect(function(err){
    if(!err) {
        console.log("Database conectado ... \n\n");
    } else {
        console.log("Erro ao conectar ... \n\n");
    }
});

// Pessoas
app.get("/pessoas",function(req,res){
    connection.query('SELECT * FROM Pessoas.pessoa;', function(err, rows, fields) {
        res.json(rows);
    });
});

app.get("listar/pessoas",function(req,res){
    connection.query('SELECT * FROM Pessoas.pessoa;', function(err, rows, fields) {
        res.json(rows);
    });
});

// insere pessoas
app.post('/inserir/pessoa', function(req,res){

    var data = req.body;
    var nome = data.nome;

      if (nome != "") {

         var sql = 'INSERT INTO `Pessoas`.`pessoa` (`nome`) VALUES (\''+nome+'\');';
         connection.query(sql ,
         function(err, rows, fields) {

            if(err) {
            res.json({'erro': 'Erro ao inserir os dados na tabela de usuarios', 'sql': sql});
                  } else {
                      res.json(rows);
                    }
            });

            } else {
                console.log("ERROR");
            }
});

app.listen(4000);
