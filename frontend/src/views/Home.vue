<template>
<div>
  <div class="container-botoes">
    <router-link to="/lanches" class="item">Cadastrar Lanches</router-link>
    <router-link to="/lanchesdia" class="item">Ver Lanches do Dia</router-link>
    <router-link to="/clientes" class="item">Gerenciar Clientes</router-link>
    <router-link to="/produtos" class="item">Gerenciar Produtos</router-link>
    <router-link to="/turmas" class="item centralizado">Gerenciar Turmas</router-link>

  </div>
</div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
}

.container-botoes {
  width: 40%;
  margin: 10% auto;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 1fr 1fr;
  border: 1px solid #2b2b2b;
  border-radius: 5px;
}

.item {
  text-align: center;
  height: 20px;
  font-size: 20px;
  margin: 16px;
  text-decoration: none;
  color: #ffffff;
  padding: 20px;
  background-color: #CC5036;
  width: 200px;
  transition: 0.3s;
  cursor: pointer;


}

.item:hover {
  background-color: #b84831;
}

.centralizado {
  grid-column-start: 1;
  grid-column-end: 3;
}


</style>
