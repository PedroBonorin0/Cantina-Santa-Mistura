<template>
  <div class="card">
    <div class="card-header">
      <h1 class="card-title">{{ title }}</h1>
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: { type: String, required: true },
  },

  computed: {
    style() {
      return {
        width: this.width + "px",
      };
    },
  },
};
</script>

<style scoped>
.card {
  width: 400px;
  font-size: 16px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  position: absolute;
  right: 0;
  top: 200px;
  border: 1px solid #CC5036;
  background-color: #eee;
  padding: 8px;
}

.card h1 {
  font-size: 24px;
  margin-bottom: 8px;
}
</style>
