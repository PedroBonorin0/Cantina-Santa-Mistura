<template>
  <div class="geral">
    <h1>Gerenciamento de Turmas</h1>
    <BarraPesquisa :infoBuscada="'Turma'"/>
  </div>

</template>

<script>
import BarraPesquisa from '../components/BarraPesquisa.vue'
export default {
	components: { BarraPesquisa },
  
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