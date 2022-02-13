<template>
  <div class="geral">
    <h1>Gerenciamento de Clientes</h1>
    <BarraPesquisa :infoBuscada="'Cliente'"/>
    <div id="tabelaClientes">
      <TabelaClientes />
    </div>
  </div>

</template>

<script>

// import BarraPesquisa from '../components/BarraPesquisa.vue'
import TabelaClientes from '../components/TabelaClientes.vue'

// import BarraPesquisa from '../components/BarraPesquisa.vue'
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