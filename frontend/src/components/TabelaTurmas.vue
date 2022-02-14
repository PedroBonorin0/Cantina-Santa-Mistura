<template>
  <div>
    <div class="geralTabela">
      <select @change="calculaId()" name="selectTurma" id="selectTurma" v-model="turmaSelecionadaNome">
        <option disabled value="" selected>Selecione a Turma</option>
        <option 
          v-for="turma in allTurmasOrdered()"
          :key="turma.nome"
          :value="turma.nome"
        > {{ turma.nome }}</option>
      </select>
      <table class="tabelaGeral">
        <tr class="header">
          <th>
            Professores
          </th>
        </tr>
        <tr v-for="professor in listaProfsTurma" :key="professor.id">{{ professor.nome }}</tr>
        <tr class="header">
          <th>Alunos</th>
        </tr>
        <tr v-for="aluno in listaAlunosTurma" :key="aluno.id">{{ aluno.nome }}</tr>
      </table>
    </div>

    <div class="CardTurmas">
      <Card :title="'Gerenciar Turma'">
        <template #body>
          <div class="formBody">
          <form>
            <div class="input">
              <label>Nome: </label>
              <input type="text" v-model="turmaSelecionadaNome" placeholder="Digite o nome da turma">
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
  name: "TabelaTurmas",
  data() {
    return {
      requisicaoTurmas: 'http://localhost:3000/turmas',
      requisicaoClientes: 'http://localhost:3000/clientes',
      turmaSelecionadaNome: '',
      turmaSelecionadaId: -1,

      listaTurmas: [],
      listaAlunosTurma: [],
      listaProfsTurma: [],
    }
  },

  mounted() {
    this.getAllTurmas();
    this.setAllPessoasDaTurma();
  },

  methods: {
    async getAllTurmas() {
      const req = await fetch(this.requisicaoTurmas);
      const data = await req.json();

      this.listaTurmas = data;
    },
    allTurmasOrdered() {
      return orderBy(this.listaTurmas, 'nome');
    },
    getProfessoresDaTurma(){
      return [];
    },
    getAlunosDaTurma(){
      return [];
    },
    async handleConfirmar() {
      const id = this.turmaSelecionadaId;

      const option = {
        nome: this.turmaSelecionadaNome
      };
      const dataJson = JSON.stringify({ nome: option.nome });

      const req = await fetch(`${this.requisicaoTurmas}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

      const res = await req.json();

      // Limpar os campos
      this.turmaSelecionadaNome = '';

      this.getAllTurmas();

      console.log(res);
    },
    async handleExcluir() {
      let id = this.getIdTurmaSelecionada();

      const req = await fetch(`${this.requisicaoTurmas}/${id}`,{
        method: 'DELETE',
      });

      const res = await req.json();

      // Limpar os campos
      this.turmaSelecionadaNome = '';

      this.getAllTurmas();

      console.log(res);
    },
    async handleCriar() {
      const novaTurma = {
        nome: this.turmaSelecionadaNome,
      };

      const turmaJson = JSON.stringify(novaTurma);

      const req = await fetch(this.requisicaoTurmas, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: turmaJson
      });

      const res = await req.json();

      console.log(res);

      // Limpar os campos
      this.turmaSelecionadaNome = '';

      this.getAllTurmas();
    },
    getIdTurmaSelecionada() {
      let id = 0;
      this.listaTurmas.forEach(turma => {
        if(turma.nome === this.turmaSelecionadaNome) id = turma.id;
      });

      return id;
    },
    calculaId() {
      let id = 0;
      this.listaTurmas.forEach(turma => {
        if(turma.nome === this.turmaSelecionadaNome) id = turma.id;
      });

      this.turmaSelecionadaId = id;

      this.setAllPessoasDaTurma();
    },
    async setAllPessoasDaTurma() {
      this.listaAlunosTurma = [];
      this.listaProfsTurma = [];
      const turma = this.turmaSelecionadaNome;

      const req = await fetch(this.requisicaoClientes);
      const data = await req.json();
      
      data.forEach(cliente => {
        if(cliente.turma === turma){
          if(cliente.tipo === 'Aluno')
            this.listaAlunosTurma.push(cliente);
          if(cliente.tipo === 'Funcionario')
            this.listaProfsTurma.push(cliente);
        }
      });
    }
  },
  
}
</script>

<style scoped>

select {
  width: 80%;
  margin: 10px 0;
}

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

.header {
  height: 15px;
  font-size: 12px;
}

.body tr {
  height: 30px;
  padding-left: 5px;
}


.tabelaGeral tr:nth-child(even){background-color: #f2f2f2;}

.tabelaGeral tr:hover {background-color: #ddd;}

.tabelaGeral th {
  padding: 8px 5px;
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