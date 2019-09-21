<template>
  <div class="stocks">
    <stock-card v-for="stock in stocks" :stock="stock" :key="stock.symbol" :isPortfolio="false"></stock-card>
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
  justify-content: space-between;
}
</style>