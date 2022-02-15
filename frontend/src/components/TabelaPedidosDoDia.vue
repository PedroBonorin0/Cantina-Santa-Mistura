<template>
<div class="geralPedido">
  <Message :msg="msg" :msgErro="temErro" v-show="msg"/>
    <div class="dataPedido">
      <label>Data: </label>
      <input type="date" id="dataSelecionada" v-model="dataSelecionada" @change="filtraClientes()">
    </div>
    <div class="geralTabela">
      <table class="tabelaGeral">
        <tr>
          <th>Cliente</th>
          <th>Turma</th>
        </tr>
        <tr v-for="cliente in getClientesPorTurma()" :key="cliente.id" @click="exibeInfosPedido(cliente)">
          <td>{{ cliente.nome }}</td>
          <td v-if="cliente.turma === ''"> - </td>
          <td v-else>{{ cliente.turma }}</td>
        </tr>
      </table>
    </div>
    <div>
      <Card :title="'Vizualizar Pedido'">
        <template #body>
          <div class="formProdutos">
            <form @submit.prevent="submit">
              <div class="inputNomePedido">
                <label>Cliente: </label>
                <input type="text" v-model="clienteSelecionado.nome" disabled>
              </div>
              <div>
                <label style="text-align: center;">Produtos: </label>
                <table class="tabelaProdutosPedido">
                  <tr>
                    <th>Produto</th>
                    <th>Preco</th>
                  </tr>
                  <tr v-for="(produto, index) in listaProdutosDoPedido" :key="index">
                    <td>{{ produto.nome }}</td>
                    <td>{{ produto.preco }}</td>
                  </tr>
                </table>
              </div>
              <button @click="deletaPedido()" class="botaoCancelar">Cancelar Pedido</button>
            </form>
          </div>
        </template>
      </Card>
    </div>
</div>
</template>

<script>
import { orderBy } from 'lodash-es';
import Card from './Card.vue';
import Message from './Message.vue';

export default {
	components: { Card, Message },
  name: "TabelaPedidosDoDia",
  data() {
    return {
      requisicaoClientes: 'http://localhost:3000/clientes',
      requisicaoPedidos: 'http://localhost:3000/pedidos',

      dataSelecionada: '',
      listaClientes: [],
      listaClientesFiltrada: [],
      listaPedidos: [],

      listaProdutosDoPedido: [],

      clienteSelecionado: {},
      pedidoSelecionado: {},

      msg: '',
      temErro: false,
    }
  },

  mounted() {
    this.fetchAll();
    this.getDiaAtual();
  },

  methods: {
    getDiaAtual() {
      const data = new Date();
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();

      const dataAtual = ano + '-' + mes + '-' + dia;

      this.dataSelecionada = dataAtual;
    },
    async fetchAll() {
      const reqPedidos = await fetch(this.requisicaoPedidos);
      const dataPedidos = await reqPedidos.json();

      this.listaPedidos = dataPedidos; 
      this.listaProdutosDoPedido = [];

      const reqClientes = await fetch(this.requisicaoClientes);
      const dataClientes = await reqClientes.json();

      this.listaClientes = dataClientes;

      this.filtraClientes();
    },
    filtraClientes() {
      this.listaClientesFiltrada = [];

      for (const cliente of this.listaClientes) {
        for(const pedido of this.listaPedidos) {
          if(pedido.cliente === cliente.id)
            if(pedido.data === this.dataSelecionada)
              this.listaClientesFiltrada.push(cliente);
        }
      }
    },
    getClientesPorTurma() {
      return orderBy(this.listaClientesFiltrada, 'turma');
    },
    exibeInfosPedido(cliente) {
      this.clienteSelecionado = cliente;

      this.listaProdutosDoPedido = [];

      this.listaPedidos.forEach(pedido => {
        if(pedido.cliente === cliente.id)
          if(pedido.data === this.dataSelecionada) {
            this.pedidoSelecionado = pedido;
            this.listaProdutosDoPedido = pedido.produtos;
          }
      });
    },
    async deletaPedido() {
      this.verificaCampos();

      if(this.temErro) {
        this.msg = 'ERRO! Confira se todos os campos foram preenchidos corretamente.';
        setTimeout(() => this.msg = '', 3000);
        return;
      }
      
      let id = this.pedidoSelecionado.id;

      this.acertaSaldoCliente(this.pedidoSelecionado.cliente, this.pedidoSelecionado);

      const req = await fetch(`${this.requisicaoPedidos}/${id}`,{
        method: 'DELETE',
      });

      const res = await req.json();

      //Mensagem de confimação
      this.msg = "Pedido excluído com sucesso.";
      this.temErro = false;
      //Limpar Mensagem
      setTimeout(() => this.msg = '', 3000);

      // Limpar os campos
      this.clienteSelecionado = {};
      this.pedidoSelecionado = {}
      
      this.listaProdutosDoPedido = [];

      this.fetchAll();

      console.log(res);
    },
    async acertaSaldoCliente(clienteId, pedido) {
      let clienteSelecionado = {};

      this.listaClientesFiltrada.forEach(clienteArray => {
        if(clienteArray.id === clienteId) clienteSelecionado = clienteArray;
      });

      console.log(clienteSelecionado);
      
      clienteSelecionado.saldo += pedido.precoTotal;

      const option = {
        saldo: clienteSelecionado.saldo,
      };
      const dataJson = JSON.stringify({ saldo: option.saldo });

      const id = this.getIdClienteSelecionado();

      const req = await fetch(`${this.requisicaoClientes}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

      const res = await req.json();

      // Limpar os campos
      this.clienteSelecionado = {};

      this.fetchAll();

      console.log(res);
    },
    verificaCampos() {
      if(this.pedidoSelecionado === '' )
        this.temErro = true;
      else 
        this.temErro = false;
    },
    getIdClienteSelecionado() {
      let idCliente;
      this.listaClientes.forEach(cliente => {
        if(this.clienteSelecionado.tipo === 'Aluno')
          if(this.clienteSelecionado.matricula === cliente.matricula)
            idCliente = cliente.id;
        
        if(this.clienteSelecionado.tipo === 'Funcionario')
          if(this.clienteSelecionado.cpf === cliente.cpf)
            idCliente = cliente.id;
        
      });
      return idCliente;
    },
  },
}
</script>

<style scoped>
.geralPedido {
  margin: 0 auto;
  text-align: center;
}

.formProdutos {
  margin: 5px auto;
  width: 200px;
  min-height: 40px;
}

.inputNomePedido {
  display: flex;
  align-items: center;
  justify-content: center;
}

.inputNomePedido input {
  margin: 0 8px;
}

.tabelaProdutosPedido {
  width: 100%;
  border: 1px solid #ddd;
  text-align: left;
  border-collapse: collapse;
}

.tabelaProdutosPedido tr:nth-child(even){ background-color: #f2f2f2;}

.tabelaProdutosPedido th {
  padding: 2px;
  background: #CC5036;
  color: white;
  font-weight: normal;
}

.tabelaProdutosPedido td {
  padding: 2px;
}

.tabelaGeral {
  margin: 25px auto;
  width: 350px;
  border: 1px solid #ddd;
  border-collapse: collapse;
}

.tabelaGeral tr {
  cursor: pointer;
}

.tabelaGeral tr:nth-child(even){ background-color: #f2f2f2;}

.tabelaGeral tr:hover {background-color: #ddd;}

.tabelaGeral th {
  padding: 5px;
  text-align: left;
  background-color: #CC5036;
  color: white;
}

.tabelaGeral td {
  padding: 4px;
  text-align: left;
}

.formProdutos {
  margin: 0 auto;
  text-align: center;
}

.botaoCancelar {
  margin: 15px auto 0;
  background: #cc3636;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  height: 20px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.botaoCancelar:hover {
  background-color: #802929;
}

</style>