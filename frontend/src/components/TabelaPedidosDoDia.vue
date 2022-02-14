<template>
<div>
    <div class="dataPedido">
      <label>Data: </label>
      <select class="dado" @change="getPedido()" name="selectData" id="selectData" v-model="dataSelecionada">
        <option disabled value="" selected="selected">Selecione a data</option>
        <option 
          v-for="pedido in allPedidosOrdered()"
          :key="pedido.data"
        > {{ pedido.data }}</option>
      </select>
    </div>
    <div class="geralTabela">
      <table class="tabelaGeral">
        <tr class="body" v-for="pedido in listaPedidosOrdenada().data === dataSelecionada" :key="pedido.id" @click="handleClickCliente(pedido)">
          <td>{{ pedido.cliente.nome }}</td>
          <td>{{ pedido.cliente.matricula }}</td>
          <td>{{ pedido.cliente.turma }}</td>
          <td>{{ pedido.produtos }} </td>
        </tr>
      </table>
    </div>
</div>
</template>



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