<template>
  <div>
    <div class="geralTabela">
      <table class="tabelaGeral">
        <tr class="header">
          <th>Nome</th>
          <th>Preco</th>
        </tr>
        <tr v-for="produto in listaProdutosOrdenada()" :key="produto.nome" class="body" @click="handleClickProduto(produto)">
          <td class="rowNome">
            {{ produto.nome }}
          </td>
          <td class="rowPreco">
            {{ produto.preco }}
          </td>
        </tr>
      </table>
    </div>

    <div class="CardProdutos">
      <Card :title="'Gerenciar Produto'">
        <template #body>
          <div class="formBody">
            <form>
              <div class="input">
                <label>Produto: </label>
                <input type="text" v-model="produtoSelecionado.nome" placeholder="Digite o nome do produto">
              </div>
              <div class="input">
                <label>Preco: </label>
                <input type="text" v-model="produtoSelecionado.preco" placeholder="Digite o preço do produto">  
              </div>
            </form>
            <button @click="handleConfirmar">Confirmar</button>
            <button @click="handleExcluir">Excluir</button>
            <button @click="handleCriar">Criar</button>
          </div>
        </template>
      </Card>
    </div>

  </div>
</template>

<script>
import Card from './Card.vue';
import { orderBy } from 'lodash-es';

export default {
	components: { Card },
  name: "TabelaProdutos",
  data() {
    return {
      requisicao: 'http://localhost:3000/produtos',
      erroForm: false,
      produtoSelecionado: {
        nome: '',
        preco: '',
        id: 0
      },

      listaProdutos: [],
      temErro: false,
    }
  },

  mounted() {
    this.getAllProdutos();
  },

  methods: {
    async getAllProdutos() {
      const req = await fetch(this.requisicao);
      const data = await req.json();

      this.listaProdutos = data;
    },
    handleClickProduto(produto) {
      this.produtoSelecionado.nome = produto.nome;
      this.produtoSelecionado.preco = produto.preco;
      this.produtoSelecionado.id = produto.id;
    },
    async handleConfirmar() {
      this.temErro = this.verificaCampos();

      // EXIBIR MENSAGEM
      if(this.temErro) return;
      
      const option = {
        nome: this.produtoSelecionado.nome,
        preco: this.produtoSelecionado.preco,
      };
      const dataJson = JSON.stringify({ nome: option.nome, preco: option.preco });

      const id = this.getIdProdutoSelecionado();

      const req = await fetch(`${this.requisicao}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

      const res = await req.json();

      // Limpar os campos
      this.produtoSelecionado.nome = '';
      this.produtoSelecionado.preco = '';

      this.getAllProdutos();

      console.log(res);
    },
    async handleExcluir() {
      this.temErro = this.verificaCampos();

      // EXIBIR MENSAGEM
      if(this.temErro) return;
      
      let id = this.getIdProdutoSelecionado();

      const req = await fetch(`${this.requisicao}/${id}`,{
        method: 'DELETE',
      });

      const res = await req.json();

      // Limpar os campos
      this.produtoSelecionado.nome = '';
      this.produtoSelecionado.preco = '';

      this.getAllProdutos();

      console.log(res);
    },
    async handleCriar() {
      this.temErro = this.verificaCampos();

      // EXIBIR MENSAGEM
      if(this.temErro) return;
      
      const produtoNovo = {
        nome: this.produtoSelecionado.nome,
        preco: Number(this.produtoSelecionado.preco).toFixed(2),
      };

      const produtoJson = JSON.stringify(produtoNovo);

      const req = await fetch(this.requisicao, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: produtoJson
      });

      const res = await req.json();

      console.log(res);

      // Limpar os campos
      this.produtoSelecionado.nome = '';
      this.produtoSelecionado.preco = '';

      this.getAllProdutos();
    },  
    listaProdutosOrdenada() {
      return orderBy(this.listaProdutos, 'nome');
    },
    getIdProdutoSelecionado() {
      return this.produtoSelecionado.id;
    },
    verificaCampos() {
      if(this.produtoSelecionado.preco === '' ||
         this.produtoSelecionado.preco === '')
          this.temErro = true;
      else 
        this.temErro = false;
    },
    verificaCampos() {
      if(this.produtoSelecionado.nome === '' ||
         this.produtoSelecionado.preco === '')
          this.temErro = true;
      else 
        this.temErro = false;
    }
  }
}
</script>

<style scoped>
.tabelaGeral {
  margin: 25px 0;
  width: 400px;
  border: 1px solid #ddd;
  border-collapse: collapse;
}

.header, .body {
  border: 1px solid #ddd;
  padding: 50px;
}

.body td {
  cursor: pointer;
  height: 30px;
  padding-left: 5px;
}

.tabelaGeral tr:nth-child(even){background-color: #f2f2f2;}

.tabelaGeral tr:hover {background-color: #ddd;}

.tabelaGeral th {
  padding: 12px 5px;
  text-align: left;
  background-color: #CC5036;
  color: white;
}

.input {
  margin: 5px 0;
}

.input input {
  margin: 0 4px;
  padding: 2px;
  height: 20px;
  border-radius: 4px;
  width: 200px;
}

.formBody button {
  margin: 5px 10px;
  height: 24px;
  border: none;
  background: #CC5036;
  color: #fff;
  width: 100px;
  font-weight: bold;
  cursor: pointer;
}

.formBody button:hover {
  background-color: #b64630;
}


</style>