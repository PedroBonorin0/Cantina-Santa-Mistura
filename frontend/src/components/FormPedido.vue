<template>
<div class="formPedido" >
  <form @submit.prevent="onSubmit">
    <div class="infoPedido">
      <label>Cliente: </label>
      <select class="dado" @change="getCliente()" name="selectCliente" id="selectCliente" v-model="nomeClienteSelecionado">
        <option disabled value="" selected="selected">Selecione o cliente</option>
        <option 
          v-for="cliente in allClientesOrdered()"
          :key="cliente.id"
          :value="cliente.nome"
        > {{ cliente.nome }}</option>
      </select>
    </div>
    <div class="infoPedido">
      <label>Data: </label>
      <input class="dado" type="date" v-model="dataSelecionada">
    </div>
    <div class="infoPedido">
      <label>Produto: </label>
      <select class="dado" @change="getProduto()" name="selectProduto" id="selectProduto" v-model="nomeProdutoSelecionado">
        <option disabled value="" selected="selected">Selecione o produto</option>
        <option 
          v-for="produto in allProdutosOrdered()"
          :key="produto.id"
          :value="produto.nome"
        > {{ produto.nome }}</option>
      </select>
      <button class="adicionaProduto" @click.stop="adicionaProduto()">+</button>
    </div>
    <div class="infoPedido">
      <table class="produtosSelecionados">
        <tr>
          <th>Produtos</th>
          <th>Preço</th>
          <th></th>
        </tr>
        <tr v-if="!listaPedido.length">
          <td>Escolha um produto acima</td>
          <td>0.00</td>
          <td></td>
        </tr>
        <tr v-for="(produto, index) in listaPedido" :key="produto.id + index">
          <td class="tdNome">{{ produto.nome }}</td>
          <td class="tdPreco">{{ produto.preco }}</td>
          <td class="tdRemove"><button class="apagarProduto" @click="removeProduto(index)">&#10060;</button></td>
        </tr>
      </table>
    </div>
    <div class="infoPedido">
      <label>Pedido pago: </label>
      <input type="checkbox" class="checkPagamento dado" v-model="isPedidoPago">
    </div>
    <div class="infoPedido">
      <label>Saldo cliente: </label>
      <span class="textoSaldo" v-bind:class="{ saldoNegativo }" v-if="clienteSelecionado !== null">{{ clienteSelecionado.saldo }}</span>
      <span class="textoSaldo" v-else>0.00</span>
    </div>
    <div class="infoPedido">
      <button class="cadastrarPedido" @click="finalizarPedido()">Finalizar</button>
    </div>
  </form>
</div>
</template>

<script>
import { orderBy } from 'lodash-es';

export default {
  data() {
    return {
      requisicaoProdutos: 'http://localhost:3000/produtos',
      requisicaoClientes: 'http://localhost:3000/clientes',
      requisicaoPedidos: 'http://localhost:3000/pedidos',

      saldoNegativo: false,
      
      listaProdutos: [],
      listaClientes: [],
      clienteSelecionado: null,
      produtoSelecionado: null,
      dataSelecionada: null,

      isPedidoPago: false,

      precoTotalCalculado: 0,

      nomeClienteSelecionado: '',
      nomeProdutoSelecionado: '',

      listaPedido: [],
      temErro: false,
    }
  },

  mounted() {
    this.getAllInfos();
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
    getAllInfos() {
      this.getAllProdutos();
      this.getAllClientes();
    },
    async getAllProdutos() {
      const req = await fetch(this.requisicaoProdutos);
      const data = await req.json();

      this.listaProdutos = data;
    },
    async getAllClientes() {
      const req = await fetch(this.requisicaoClientes);
      const data = await req.json();

      this.listaClientes = data;
    },
    allClientesOrdered() {
      return orderBy(this.listaClientes, 'nome');
    },
    allProdutosOrdered() {
      return orderBy(this.listaProdutos, 'nome');
    },
    getCliente() {
      this.listaClientes.forEach(cliente => {
        if(cliente.nome === this.nomeClienteSelecionado) {
          this.clienteSelecionado = cliente;
        }
      });
      if(this.clienteSelecionado.saldo < 0)
        this.saldoNegativo = true;
      else 
        this.saldoNegativo = false;
    },
    getProduto() {
      this.listaProdutos.forEach(produto => {
        if(produto.nome === this.nomeProdutoSelecionado) {
          this.produtoSelecionado = produto;
        }
      });
    },
    adicionaProduto() {
      if(this.produtoSelecionado)
        this.listaPedido.push(this.produtoSelecionado);
    },
    removeProduto(index) {
      this.listaPedido.splice(index, 1);
    },
    async finalizarPedido() {
      this.calculaPreco();
      this.calculaSaldo();

      const pedidoNovo = {
        cliente: this.clienteSelecionado.id,
        produtos: this.listaPedido,
        data: this.dataSelecionada,
        pago: this.isPedidoPago,
        precoTotal: this.precoTotalCalculado,
      };

      const produtoJson = JSON.stringify(pedidoNovo);

      const req = await fetch(this.requisicaoPedidos, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: produtoJson
      });

      const res = await req.json();

      console.log(res);

      // Limpar os campos
      this.clienteSelecionado = null,
      this.produtoSelecionado = null

      this.listaPedido = [],

      this.precoTotalCalculado = 0;

      this.nomeClienteSelecionado = '';
      this.nomeProdutoSelecionado = '';

      this.isPedidoPago = false;

      this.getAllInfos();
      this.getDiaAtual();
    },
    calculaPreco() {
      this.precoTotalCalculado = 0;

      for(let produto of this.listaPedido)
        this.precoTotalCalculado += Number(produto.preco);
    },
    calculaSaldo() {
      if(this.isPedidoPago) return;
      let saldoCliente = Number(this.clienteSelecionado.saldo);
      saldoCliente -= this.precoTotalCalculado;

      this.atualizaSaldo(saldoCliente);
    },
    async atualizaSaldo(saldoCliente) {
      const option = {
        saldo: saldoCliente,
      };
      const dataJson = JSON.stringify({ saldo: option.saldo });

      const id = this.clienteSelecionado.id;

      const req = await fetch(`${this.requisicaoClientes}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

      const res = await req.json();

      console.log(res);
    }
  },
}
</script>

<style scoped>
  .formPedido {
    width: 70%;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .infoPedido {
    margin: 10px;
    display: flex;
    align-items: center;
  }

  .infoPedido span {
    width: 50px;
    margin-left: 5px;
    text-align: center;
    padding-top: 3px;
    border: 2px solid #6d9b6d;
  }

  .formPedido label {
    height: 24px;
    font-size: 20px;
  }

  .formPedido .dado {
    height: 20px;
    font-size: 16px;
    margin-left: 8px;
    border: 1px solid #CC5036;
  }

  .formPedido .saldoNegativo {
    border-color: #CC5036;
  }

  .formPedido .checkPagamento {
    width: 20px;
    height: 20px;
  }

  .adicionaProduto {
    width: 24px;
    height: 24px;
    font-size: 16px;
    font-weight: bold;
    background-color: #7cb17c;
    border: none;
    border-radius: 4px;
    margin: 8px;
    cursor: pointer;
  }

  .adicionaProduto:hover {
    background-color: #6d9b6d;
  }

  .formPedido .cadastrarPedido {
    width: 100px;
    height: 30px;
    background-color: #7cb17c;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }

  .formPedido .cadastrarPedido:hover {
    background-color: #6d9b6d;
  }

  .produtosSelecionados tr:nth-child(even){background-color: #f2f2f2;}

  .produtosSelecionados tr:hover {background-color: #ddd;}

  .produtosSelecionados th {
    padding: 8px 5px;
    text-align: left;
    background-color: #CC5036;
    color: white;
  }

  .produtosSelecionados td {
    padding-top: 2px;
    padding-left: 5px;
  }

  .produtosSelecionados .tdRemove {
    width: 30px;
    display: flex;
  }

  .produtosSelecionados {
    margin: 8px 0;
    width: 300px;
    border: 1px solid #ddd;
    border-collapse: collapse;
  }
</style>