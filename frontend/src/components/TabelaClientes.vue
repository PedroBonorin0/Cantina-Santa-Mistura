<template>
  <div>
    <Message :msg="msg" v-show="msg"/>
    <div class="geralTabela">
      <table class="tabelaGeral">
        <tr class="headerTipo">
          <td>Alunos</td>
        </tr>
        <tr class="headerCampos">
          <td>Nome</td>
          <td>Turma</td>
          <td>Nome do Responsável</td>
        </tr>
        <tr class="body" v-for="aluno in listaAlunosOrdenada()" :key="aluno.id" @click="handleClickCliente(aluno)">
          <td>{{ aluno.nome }}</td>
          <td>{{ aluno.turma }}</td>
          <td>{{ aluno.nomeResponsavel }} </td>
        </tr>
        <tr class="headerTipo">
          <td>Funcionários</td>
        </tr>
        <tr class="headerCampos">
          <th>Nome</th>
          <th>Telefone</th>
          <th>Tipo</th>
        </tr>
        <tr class="body" v-for="funcionario in listaFuncionariosOrdenada()" :key="funcionario.id" @click="handleClickCliente(funcionario)">
          <td>{{ funcionario.nome }}</td>
          <td>{{ funcionario.telefone }}</td>
          <td>{{ funcionario.tipoFuncionario }}</td>
        </tr>
      </table>
    </div>

    <div class="CardClientes">
      <Card :title="'Gerenciar Cliente'">
        <template #body>
          <div class="formBody">
            <form>
              <label>Tipo: </label>
              <select class="select Tipo" v-model="tipoSelecionado">
                <option disabled="disabled" value="" selected>Selecione o tipo</option>
                <option value="Aluno">Aluno</option>
                <option value="Funcionario">Funcionario</option>
              </select>
              <div v-if="tipoSelecionado === 'Aluno'">
                <div class="input">
                  <label>Nome: </label>
                  <input type="text" v-model="this.clienteSelecionado.nome">
                </div>
                <div class="input">
                  <label>Saldo: </label>
                  <input type="text" v-model="this.clienteSelecionado.saldo">
                </div>
                <div class="input">
                  <label>Matrícula: </label>
                  <input type="text" v-model="this.clienteSelecionado.matricula">
                </div>
                <div class="input">
                  <label>Nome do Responsável: </label>
                  <input type="text" v-model="this.clienteSelecionado.nomeResponsavel">
                </div>
                <div class="input">
                  <label>Telefone do Responsável: </label>
                  <input type="text" v-model="this.clienteSelecionado.telefoneResponsavel">
                </div>
                <div class="input">
                  <label>Turma: </label>
                  <input type="text" v-model="this.clienteSelecionado.turma">
                </div>
              </div>
              <div v-else>
                <div class="input">
                  <label>Nome: </label>
                  <input type="text" v-model="this.clienteSelecionado.nome">
                </div>
                <div class="input">
                  <label>Saldo: </label>
                  <input type="text" v-model="this.clienteSelecionado.saldo">
                </div>
                <div class="input">
                  <label>CPF: </label>
                  <input type="text" v-model="this.clienteSelecionado.cpf">
                </div>
                <div class="input">
                  <label>Telefone: </label>
                  <input type="text" v-model="this.clienteSelecionado.telefone">
                </div>
                <div class="input">
                  <label>Tipo Funcionário: </label>
                  <select class="selectTipoFuncionario" v-model="this.clienteSelecionado.tipoFuncionario">
                    <option disabled="disabled" value="" selected>Selecione um tipo</option>
                    <option value="Professor">Professor</option>
                    <option value="SG">Serviços Gerais</option>
                    <option value="Recepcao">Recepção</option>
                  </select>
                </div>
                <div class="input" v-if="this.clienteSelecionado.tipoFuncionario === 'Professor'">
                  <label>Turma: </label>
                  <input type="text" v-model="this.clienteSelecionado.turma">
                </div>
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

import Message from './Message.vue';

export default {
	components: { Card, Message },
  name: "TabelaClientes",
  data() {
    return {
      requisicaoClientes: 'http://localhost:3000/clientes',
      tipoSelecionado: 'Aluno',
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

      listaAlunos: [],
      listaFuncionarios: [],
      listaClientes: [],
    }
  },

  mounted() {
    this.getAllClientes();
  },

  methods: {
    async getAllClientes() {
      const req = await fetch(this.requisicaoClientes);
      const data = await req.json();

      this.listaClientes = data;

      this.listaClientes.forEach(cliente => {
        if(cliente.tipo === 'Aluno') this.listaAlunos.push(cliente);

        if(cliente.tipo === 'Funcionario') this.listaFuncionarios.push(cliente);
      });
    },
    handleClickCliente(cliente) {
      this.tipoSelecionado = cliente.tipo;
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
      };
      const dataJson = JSON.stringify({ tipo: option.tipo, nome: option.nome, saldo: option.saldo, historico: option.historico, matricula: option.matricula, cpf: option.cpf, nomeResponsavel: option.nomeResponsavel, telefoneResponsavel: option.telefoneResponsavel, telefone: option.telefone, tipoFuncionario: option.tipoFuncionario, turma: option.turma});

      const id = this.getIdClienteSelecionado();

      const req = await fetch(`${this.requisicaoClientes}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

      const res = await req.json();

      //Mensagem de confimação
      this.msg = "Cliente editado com sucesso.";

      //Limpar Mensagem
      setTimeout(() => this.msg = "", 3000);

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

      const req = await fetch(`${this.requisicaoClientes}/${id}`,{
        method: 'DELETE',
      });

      const res = await req.json();

      //Mensagem de confimação
      this.msg = "Cliente excluído com sucesso.";

      //Limpar Mensagem
      setTimeout(() => this.msg = "", 3000);

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
      };

      const clienteJson = JSON.stringify(clienteNovo);

      const req = await fetch(this.requisicaoClientes, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: clienteJson
      });

      const res = await req.json();

      //Mensagem de confimação
      this.msg = "Cliente cadastrado com sucesso.";

      //Limpar Mensagem
      setTimeout(() => this.msg = "", 3000);

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
    listaAlunosOrdenada() {
      return orderBy(this.listaAlunos, 'nome');
    },
    listaFuncionariosOrdenada() {
      return orderBy(this.listaFuncionarios, 'nome');
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