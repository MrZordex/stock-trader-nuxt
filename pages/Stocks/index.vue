<template>
  <div class="stocks">
    <stock-card
      v-for="(stock,i) in stocks"
      :stock="stock"
      :key="stock.symbol"
      :isPortfolio="false"
      :animationDelay="i*0.015"
    ></stock-card>
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
  align-items: flex-start;
}
</style>