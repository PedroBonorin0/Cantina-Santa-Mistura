<template>
  <div class="geral">
    <h1>Cadastro de Lanches</h1>
    <FormPedido />
  </div>

</template>

<script>
import FormPedido from '../components/FormPedido.vue';

export default {
	components: { FormPedido },
}
</script>

<style scoped>
  .geral  {
    width: 80%;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    margin: 20px 0 10px;
  }
</style>