<template>
  <div class="geral">
    <h1>Gerenciamento de Produtos</h1>
    <BarraPesquisa :infoBuscada="'Produto'"/>
    <div id="tabelaProdutos">
      <TabelaProdutos />
    </div>
  </div>

</template>

<script>
import BarraPesquisa from '../components/BarraPesquisa.vue'
import TabelaProdutos from '../components/TabelaProdutos.vue'

export default {
	components: { BarraPesquisa, TabelaProdutos },
  
}
</script>

<style scoped>
  .geral{
    width: 100vw;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    margin: 20px 0 10px;
  }
</style>