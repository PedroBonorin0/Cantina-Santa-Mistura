<template>
  <div class="formGeral">
    <label for="form">Buscar {{ infoBuscada }}: </label>
      <form>
        <input type="text" name="inputInfo" id="inputInfo" 
        placeholder="Digite o nome do objeto que deseja buscar" 
        v-model="textoPesquisa">
        <button type="submit">Buscar</button>
      </form>
  </div>
</template>

<script>
export default {
  name: 'BarraPesquisa',
  data() {
    return {
      textoPesquisa: ''
    }
  },
  props: {
    infoBuscada: { type: String, required: true},
  }
}
</script>

<style scoped>
  .formGeral {
    width: 60%;
    height: 30px;
    margin: 0 auto;
    padding: 10px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  label {
    height: 20px;
  }

  input {
    width: 300px;
    height: 20px;
    margin: 5px 10px;
    padding: 4px;
    border: 2px solid #969696;
    border-radius: 5px;
  }

  button {
    height: 32px;
    width: 100px;
    border: none;
    background: #CC5036;
    border-radius: 5px;
    color: #f3f3f3;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    background-color: #af442f;
  }

</style>