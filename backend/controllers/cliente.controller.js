const Cliente = require("../models/cliente.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Sem conteúdo!"
    });
  }

  const cliente = new Cliente({
    nome: req.body.nome,
    saldo: req.body.saldo
  });

  Cliente.create(cliente, (err, data) => {
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
  Cliente.getAll(nome, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo de errado aconteceu."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Cliente.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cliente com id ${req.params.id} não encontrado.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao recuperar Cliente com id " + req.params.id
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
  Cliente.updateById(
    req.params.id,
    new Cliente(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Cliente com id ${req.params.id} não encontrado.`
          });
        } else {
          res.status(500).send({
            message: "Erro ao atualizar Cliente com id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Cliente.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cliente com id ${req.params.id} não encontrado.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao deletar Cliente com id " + req.params.id
        });
      }
    } else res.send({ message: `Cliente foi deletado com sucesso!` });
  });
};

exports.deleteAll = (req, res) => {
  Cliente.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao deletar todos os Clientes."
      });
    else res.send({ message: `Todos os Clientes foram deletados com sucesso!` });
  });
};