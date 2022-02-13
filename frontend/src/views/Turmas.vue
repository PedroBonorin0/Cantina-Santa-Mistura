<template>
  <div class="geral">
    <h1>Gerenciamento de Turmas</h1>
    <!-- <BarraPesquisa :infoBuscada="'Turma'"/> -->
    <div id="tabelaTurmas">
      <TabelaTurmas />
    </div>
  </div>

</template>

<script>
// import BarraPesquisa from '../components/BarraPesquisa.vue'
import TabelaTurmas from '../components/TabelaTurmas.vue'

export default {
	components: { /*BarraPesquisa,*/  TabelaTurmas},
  
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