<template>
  <div>
    <div class="geralTabela">
      <table class="tabelaGeral">
        <tr class="header">
          <th>Nome</th>
          <th>Preco</th>
        </tr>
        <tr v-for="cliente in listaClientesOrdenada()" :key="cliente.nome" class="body" @click="handleClickCliente(cliente)">
          <td class="rowNome">
            {{ cliente.nome }}
          </td>
          <td class="rowTipo">
            {{ cliente.tipo }}
          </td>
          <td class="rowTurma">
            {{ cliente.turma }}
          </td>
          <td class="rowSaldo">
            {{ cliente.saldo }}
          </td>
        </tr>
      </table>
    </div>

    <div class="CardClientess">
      <Card :title="'Gerenciar Cliente'">
        <template #body>
          <div class="formBody">
            <form>
              <div class="form-control">
                  <label>Tipo: </label>
                  <option value="Aluno">One</option>
                  <option value="Funcionario">Two</option>
                  <input type="form-control" v-model="ClienteSelecionado.tipo" placeholder="Selecione o tipo do cliente">
              </div>
              <div class="input">
                <label>Produto: </label>
                <input type="text" v-model="clienteSelecionado.nome" placeholder="Digite o nome do cliente">
              </div>
              <div class="input">
                <label>Saldo: </label>
                <input type="text" v-model="clienteSelecionado.saldo" placeholder="Digite o saldo do cliente">
              </div>
              <div v-if="clienteSelecionado.tipo === Aluno">
                <label>Matricula: </label>
                <input type="text" v-model="clienteSelecionado.matricula" placeholder="Digite a matricula do aluno">  
              </div>
              <div v-if="clienteSelecionado.tipo === Aluno">
                <label>Responsável: </label>
                <input type="text" v-model="clienteSelecionado.nomeResponsavel" placeholder="Digite o nome do responsavel">  
              </div>
              <div v-if="clienteSelecionado.tipo === Aluno">
                <label>Telefone Responsavel: </label>
                <input type="text" v-model="clienteSelecionado.telefoneResponsavel" placeholder="Digite o telefone do responsável">  
              </div>
              <div v-if="clienteSelecionado.tipo === Aluno">
                <label>Turma: </label>
                <input type="text" v-model="clienteSelecionado.turma" placeholder="Digite a turma do aluno">  
              </div>
              <div v-if="clienteSelecionado.tipo === Funcionario">
                <label>CPF: </label>
                <input type="text" v-model="clienteSelecionado.cpf" placeholder="Digite o cpf do funcionario">  
              </div>
              <div v-if="clienteSelecionado.tipo === Funcionario">
                <label>Telefone: </label>
                <input type="text" v-model="clienteSelecionado.telefone" placeholder="Digite o telefone do funcionario">  
              </div>
              <div v-if="clienteSelecionado.tipo === Funcionario">
                <label>Tipo: </label>
                <input type="text" v-model="clienteSelecionado.tipoFuncionario" placeholder="Digite o tipo do funcionario">  
              </div>
              <div v-if="clienteSelecionado.tipo === Funcionario">
                <label>Turma: </label>
                <input type="text" v-model="clienteSelecionado.turma" placeholder="Digite a turma do funcionario">  
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
  name: "TabelaClientes",
  data() {
    return {
      requisicao: 'http://localhost:3000/clientes',
      erroForm: false,
      clienteSelecionado: {
        nome: '',
        tipo: '',
        saldo: '',
        historico: [],
        matricula: '',
        cpf: '',
        nomeResponsavel: '',
        telefoneResponsavel: '',
        telefone: '',
        turma: '',
        tipoFuncionario: '',
        id: 0
      },

      listaClientes: [],
    }
  },

  mounted() {
    this.getAllClientes();
  },

  methods: {
    async getAllClientes() {
      const req = await fetch(this.requisicao);
      const data = await req.json();

      this.listaClientes = data;
    },
    handleClickCliente(cliente) {
      this.clienteSelecionado.tipo = cliente.tipo;
      this.clienteSelecionado.nome = cliente.nome;
      this.clienteSelecionado.saldo = cliente.saldo;
      this.clienteSelecionado.historico = cliente.historico;
      this.clienteSelecionado.matricula = cliente.matricula;
      this.clienteSelecionado.cpf = cliente.cpf;
      this.clienteSelecionado.nomeResponsavel = cliente.nomeResponsavel;
      this.clienteSelecionado.telefoneResponsavel = cliente.telefoneResponsavel;
      this.clienteSelecionado.telefone = cliente.telefone;
      this.clienteSelecionado.turma = cliente.turma;
      this.clienteSelecionado.tipoFuncionario = cliente.tipoFuncionario;
      this.clienteSelecionado.id = cliente.id;
    },
    async handleConfirmar() {
      const option = {
        tipo: this.clienteSelecionado.tipo,
        nome: this.clienteSelecionado.nome,
        saldo: this.clienteSelecionado.saldo,
        historico: this.clienteSelecionado.historico,
        matricula: this.clienteSelecionado.matricula,
        cpf: this.clienteSelecionado.cpf,
        nomeResponsavel: this.clienteSelecionado.nomeResponsavel,
        telefoneResponsavel: this.clienteSelecionado.telefoneResponsavel,
        telefone: this.clienteSelecionado.telefone,
        turma: this.clienteSelecionado.turma,
        tipoFuncionario: this.clienteSelecionado.tipoFuncionario,
        turma: this.clienteSelecionado.id,
      };
      const dataJson = JSON.stringify({ tipo: option.tipo, nome: option.nome, saldo: option.saldo, historico: option.historico, matricula: option.matricula, cpf: option.cpf, nomeResponsavel: option.nomeResponsavel, telefoneResponsavel: option.telefoneResponsavel, telefone: option.telefone, tipoFuncionario: option.tipoFuncionario, turma: option.turma});

      const id = this.getIdClienteSelecionado();

      const req = await fetch(`${this.requisicao}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

      const res = await req.json();

      // Limpar os campos
      this.clienteSelecionado.tipo = '';
      this.clienteSelecionado.nome = '';
      this.clienteSelecionado.saldo = '';
      this.clienteSelecionado.historico = '';
      this.clienteSelecionado.matricula = '';
      this.clienteSelecionado.cpf = '';
      this.clienteSelecionado.nomeResponsavel = '';
      this.clienteSelecionado.telefoneResponsavel = '';
      this.clienteSelecionado.telefone = '';
      this.clienteSelecionado.turma = '';
      this.clienteSelecionado.tipoFuncionario = '';
      this.clienteSelecionado.id = '';

      this.getAllClientes();

      console.log(res);
    },
    async handleExcluir() {
      let id = this.getIdClienteSelecionado();

      const req = await fetch(`${this.requisicao}/${id}`,{
        method: 'DELETE',
      });

      const res = await req.json();

      // Limpar os campos
      this.clienteSelecionado.tipo = '';
      this.clienteSelecionado.nome = '';
      this.clienteSelecionado.saldo = '';
      this.clienteSelecionado.historico = '';
      this.clienteSelecionado.matricula = '';
      this.clienteSelecionado.cpf = '';
      this.clienteSelecionado.nomeResponsavel = '';
      this.clienteSelecionado.telefoneResponsavel = '';
      this.clienteSelecionado.telefone = '';
      this.clienteSelecionado.turma = '';
      this.clienteSelecionado.tipoFuncionario = '';
      this.clienteSelecionado.id = '';

      this.getAllClientes();

      console.log(res);
    },
    async handleCriar() {
      const clienteNovo = {
        tipo: this.clienteSelecionado.tipo,
        nome: this.clienteSelecionado.nome,
        saldo: this.clienteSelecionado.saldo,
        historico: this.clienteSelecionado.historico,
        matricula: this.clienteSelecionado.matricula,
        cpf: this.clienteSelecionado.cpf,
        nomeResponsavel: this.clienteSelecionado.nomeResponsavel,
        telefoneResponsavel: this.clienteSelecionado.telefoneResponsavel,
        telefone: this.clienteSelecionado.telefone,
        turma: this.clienteSelecionado.turma,
        tipoFuncionario: this.clienteSelecionado.tipoFuncionario,
        turma: this.clienteSelecionado.id,
      };

      const clienteJson = JSON.stringify(clienteNovo);

      const req = await fetch(this.requisicao, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: clienteJson
      });

      const res = await req.json();

      console.log(res);

      // Limpar os campos
      this.clienteSelecionado.tipo = '';
      this.clienteSelecionado.nome = '';
      this.clienteSelecionado.saldo = '';
      this.clienteSelecionado.historico = '';
      this.clienteSelecionado.matricula = '';
      this.clienteSelecionado.cpf = '';
      this.clienteSelecionado.nomeResponsavel = '';
      this.clienteSelecionado.telefoneResponsavel = '';
      this.clienteSelecionado.telefone = '';
      this.clienteSelecionado.turma = '';
      this.clienteSelecionado.tipoFuncionario = '';
      this.clienteSelecionado.id = '';

      this.getAllClientes();
    },  
    listaClientesOrdenada() {
      return orderBy(this.listaClientes, 'nome');
    },
    getIdClienteSelecionado() {
      return this.clienteSelecionado.id;
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