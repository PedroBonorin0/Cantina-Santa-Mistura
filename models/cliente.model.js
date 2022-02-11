const sql = require("./db.js");

const Cliente = function(cliente) {
    this.id = cliente.id;
    this.nome = cliente.nome;
    this.saldo = cliente.saldo;
    this.historico = cliente.historico;
};

Cliente.create = (newCliente, result) => {
    sql.query("INSERT INTO clientes SET ?", newCliente, (err, res) => {
        if (err){
            console.log(" error: ", err);
            result(err, null);
            return;
        }
        console.log("created cliente: ", {id: res.insertId, ...newCliente});
        result(null, {id: res.insertId, ...newCliente});
    });
};

Cliente.findById = (id, result) => {
    sql.query(`SELECT * FROM clentes WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found cliente: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Cliente.getAll = (nome, result) => {
    let query = "SELECT * FROM clientes";
    if (nome) {
      query += ` WHERE nome LIKE '%${nome}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("clientes: ", res);
      result(null, res);
    });
  };

  Cliente.updateById = (id, cliente, nome, result) => {
    sql.query(
      "UPDATE clientes SET nome = ?, WHERE id = ?",
      [cliente.nome, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated cliente: ", { id: id, ...produto });
        result(null, { id: id, ...produto });
      }
    );
  };

  Produto.remove = (id, result) => {
    sql.query("DELETE FROM clientes WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted cliente with id: ", id);
      result(null, res);
    });
  };

  Produto.removeAll = result => {
    sql.query("DELETE FROM clientes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} clientes`);
      result(null, res);
    });
  };

  module.exports = Cliente;