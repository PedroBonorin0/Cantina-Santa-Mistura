<template>
  <div class="historicoGeral">
    <h1 v-if="!clienteNome">
      Selecione um Cliente
    </h1>
    <h1 v-else>
      Histórico de {{ clienteNome }}
    </h1>
    <div class="tabelaHistorico">
      <table v-if="clienteNome" id="tabelaGeral">
        <thead>
          <tr>
            <th id="thData">Data</th>
            <th id="thLanche">Lanche</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in historicoCLiente" :key="pedido.id">
            <td class="tdData">{{ getDataConvertida(pedido) }}</td>
            <td class="tdLista">
              <ul>
                <li v-for="(produto, index) in pedido.produtos" :key="index">{{ produto.nome }}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Historico',
  props: {
    clienteNome: { type: String },
    clienteId: { type: Number },
    historicoCLiente: { type: Array }
  },
  data() {
    return {
      requisicaoClientes: 'http://localhost:3000/clientes',
      listaPedidos: [],
    }
  },
  
  methods: {
    getDataConvertida(pedido) {
      let dataGeral = pedido.data;
      let dataArray = dataGeral.split('-');
      let dataString = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;

      return dataString;
    },
  },
}
</script>

<style scoped>
.historicoGeral {
  width: 400px;
  font-size: 16px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  position: absolute;
  left: 0px;
  top: 150px;
  border: 1px solid #CC5036;
  background-color: #eee;
  padding: 8px;
}

.historicoGeral h1 {
  font-size: 24px;
  margin-bottom: 8px;
}

.tabelaHistorico {
  margin: 10px auto;
  width: 250px;
  border: 1px solid #ddd;
  border-collapse: collapse;
}

.tabelaHistorico tr {
  text-align: left;
  width: 100%;
  padding: 5px;
}

.tabelaHistorico td {
  text-align: left;
  padding: 5px;
}

.tabelaHistorico tr:nth-child(even){background-color: #e2e2e2;}

.tabelaHistorico th {
  padding: 2px;
  height: 10px;
  width: 100%;
  background-color: #CC5036;
  color: white;
  font-weight: normal;
}

#thData {
  width: 70px;
}

#thLanche {
  width: 180px;
}

.tdData {
  width: 70px;
}

.tdLista {
  width: 180px;
}

li {
  list-style-type: none;
}

</style>