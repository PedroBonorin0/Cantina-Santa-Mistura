<template>
  <div class="geral">
    <h1>Gerenciamento de Clientes</h1>
    <div id="tabelaClientes">
      <TabelaClientes />
    </div>
  </div>

</template>

<script>
import TabelaClientes from '../components/TabelaClientes.vue';

export default {
	components: { TabelaClientes  },
  
}
</script>

<style scoped>
  .geral{
    width: 80%;
    margin: 10px auto;
    text-align: center;
  }

  h1 {
    margin: 20px 0 10px;
  }
</style>