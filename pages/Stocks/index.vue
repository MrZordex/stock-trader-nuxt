<template>
  <div class="stocks container">
    <h1>This is a stocks page</h1>
    <div class="stocks">
      <stock-card v-for="(stock,i) in stocks" :stock="stock" :key="i"></stock-card>
    </div>
  </div>
</template>


<script>
export default {
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    }
  }
};
</script>

<style lang="scss" scoped>
.stocks {
  display: flex;
  flex-wrap: wrap;
}
</style>