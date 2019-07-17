var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var guid = require('guid')

var Users = require('./app/models/users');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@cluster0-zzwsc.mongodb.net/concrete-backend', {
    useNewUrlParser: true
}).then(() => {
    console.log("MongoBD conectado com sucesso")
}).catch((error) => {
    console.log(`Hove um erro ao se conectar ao mongoDB: ${error}`)
})

//https://www.youtube.com/watch?v=LLqq6FemMNQ&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
var port = process.env.port || 8000;

router.use(function (req, res, next) {
    console.log('Algo está acontecendo aqui....');
    next();
});

router.get('/', function (req, res) {
    res.json({ message: 'Hello World!', guid: guid.create() })
});

router.route('/users')
    .post(function (req, res) {
        var users = new Users();

        users.id_guid = guid.create()
        users.nome = req.body.nome;
        users.email = req.body.email;
        users.senha = req.body.senha;
        // users.telefones.numero = req.body.telefones;
        // users.telefones.ddd = req.body.telefones;

        users.save().then(() => {
            res.json({ mensagem: 'User Cadastrado com Sucesso!' });
        }).catch((err) => {
            res.json({ mensagem: `Hove um erro ao tentar cadastrar um user: ${err}`})
        })
    })

router.route('/users/:user_id')
    .get(function (req, res) {
        var users = new Users();

        // users.findById(req.params.user_id, function (error, users) {
        //     if (error)
        //         res.send('Id do User não encontrado....: ' + error);

        //     res.json(users);
        // });

        users.findById(req.params.user_id).then(() => {
            res.json(users);
        }).catch((err) => {
            res.json({ mensagem: `Id do User não encontrado: ${err}`})
        })
    })

app.use('/api', router);

app.listen(port);
console.log("Starting an application on the port " + port);