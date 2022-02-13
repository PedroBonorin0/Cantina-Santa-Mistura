const Produto = require("../models/produto.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Sem conteúdo!"
    });
  }

  const produto = new Produto({
    nome: req.body.nome,
    preco: req.body.preco
  });

  Produto.create(produto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo de errado aconteceu."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  Produto.getAll(nome, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo de errado aconteceu."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Produto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Produto com id ${req.params.id} não encontrado.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao recuperar Produto com id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
 
  if (!req.body) {
    res.status(400).send({
      message: "Sem conteúdo!"
    });
  }
  console.log(req.body);
  Produto.updateById(
    req.params.id,
    new Produto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Produto com id ${req.params.id} não encontrado.`
          });
        } else {
          res.status(500).send({
            message: "Erro ao atualizar Produto com id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Produto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Produto com id ${req.params.id} não encontrado.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao deletar Produto com id " + req.params.id
        });
      }
    } else res.send({ message: `Produto foi deletado com sucesso!` });
  });
};

exports.deleteAll = (req, res) => {
  Produto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao deletar todos os Produtos."
      });
    else res.send({ message: `Todos os Produtos foram deletados com sucesso!` });
  });
};