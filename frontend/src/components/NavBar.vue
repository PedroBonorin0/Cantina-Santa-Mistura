<template>
  <nav>
    <router-link id="logo" to="/">
      <img :src="logo" alt="Logo Santa Mistura">
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      logo: '/img/logo.png',
    }
  },
};
</script>

<style scoped>
 nav {
   background-color: #CC5036;
   height: 100px;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
 }
  img {
    max-width: 150px;
  }
</style>
