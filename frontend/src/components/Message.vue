<template>
  <div>
    <div v-if="msg !== '' && msgErro" id="message-container-erro">
    <p>{{ msg }}</p>
    </div>
    <div v-if="msg !== '' && !msgErro" id="message-container">
    <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    msg: {type: String, required: true},
    msgErro: {type: Boolean, required: true}
  },
}
</script>

<style scoped>
#message-container {
  color: #004085;
  background-color: #CCE5FF;
  border: 2px solid #B8DAFF;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 10px auto;
}

#message-container-erro {
  color: #850000;
  background-color: #ffcccc;
  border: 2px solid #ffb8b8;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 10px auto;
}
</style>