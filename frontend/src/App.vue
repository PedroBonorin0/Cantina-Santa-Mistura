<template>
<div>
  <NavBar />
  <div>
    <router-view/>
  </div>
</div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {  
  components: {
    NavBar
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
