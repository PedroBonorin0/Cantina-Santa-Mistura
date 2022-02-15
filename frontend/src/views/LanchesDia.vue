<template>
  <div class="geral">
    <h1>Ver Lanches do Dia</h1>
    <div id="tabelaPedidosDoDia">
      <TabelaPedidosDoDia />
    </div>
  </div>

</template>

<script>

import TabelaPedidosDoDia from '../components/TabelaPedidosDoDia.vue'

export default {
  components: { TabelaPedidosDoDia },
}
</script>

<style scoped>
  .geral{
    width: 100vw;
    margin: 10px auto;
    text-align: center;
  }

  h1 {
    margin: 20px 0 10px;
  }
</style>