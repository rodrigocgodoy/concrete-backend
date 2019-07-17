var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Produto = require('./app/models/produto');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://glemos:glau123@ds062448.mlab.com:62448/node-crud-api', {
    useMongoClient: true
});

//Maneira Local: MongoDb:
/*mongoose.connect('mongodb://localhost:27017/node-crud-api', {
    useMongoClient: true
});*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.port || 8000;

var router = express.Router();

router.use(function (req, res, next) {
    console.log('Algo está acontecendo aqui....');
    next();
});

router.get('/', function (req, res) {
    res.json({ message: 'Beleza! Bem vindo(a) a nossa Loja XYZ' })
});

router.route('/produtos')
    .post(function (req, res) {
        var produto = new Produto();

        //Aqui vamos setar os campos do produto (via request):
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;

        produto.save(function (error) {
            if (error)
                res.send('Erro ao tentar salvar o Produto....: ' + error);

            res.json({ message: 'Produto Cadastrado com Sucesso!' });
        });
    })
    .get(function (req, res) {
        Produto.find(function (error, produtos) {
            if (error)
                res.send('Erro ao tentar Selecionar Todos os produtos...: ' + error);

            res.json(produtos);
        });
    });

router.route('/produtos/:produto_id')
    .get(function (req, res) {
        Produto.findById(req.params.produto_id, function (error, produto) {
            if (error)
                res.send('Id do Produto não encontrado....: ' + error);

            res.json(produto);
        });
    })
    .put(function (req, res) {
        Produto.findById(req.params.produto_id, function (error, produto) {
            if (error)
                res.send("Id do Produto não encontrado....: " + error);

            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;

            produto.save(function (error) {
                if (error)
                    res.send('Erro ao atualizar o produto....: ' + error);

                res.json({ message: 'Produto atualizado com sucesso!' });
            });
        });
    })
    .delete(function (req, res) {

        Produto.remove({
            _id: req.params.produto_id
        }, function (error) {
            if (error)
                res.send("Id do Produto não encontrado....: " + error);

            res.json({ message: 'Produto Excluído com Sucesso!' });
        });
    });


app.use('/api', router);

app.listen(port);
console.log("Starting an application on the port " + port);