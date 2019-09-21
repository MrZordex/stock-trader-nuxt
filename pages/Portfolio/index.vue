<template>
  <div v-if="stocks.length" class="stocks">
    <stock-card
      v-for="(stock,i) in stocks"
      :stock="stock"
      :key="stock.symbol"
      :isPortfolio="true"
      :animationDelay="i*0.015"
    ></stock-card>
  </div>
  <div v-else class="empty container">
    <div class="title">Your Portfolio is empty.</div>
    <p class="info">
      You can
      <nuxt-link to="/stocks">buy some stocks</nuxt-link>
      <span>or</span>
      <a href="#" @click.prevent="endDay">end the day</a>
    </p>
    <div class="hr"></div>
    <h2>Your Funds: ${{$store.getters.funds | money}}</h2>
    {{$store.symbols}}
  </div>
</template>


<script>
export default {
  computed: {
    stocks() {
      return this.$store.getters.boughtStocks;
    }
  },
  methods: {
    endDay() {
      this.$store.dispatch("endDay");
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

.title {
  font-size: 4rem;
  display: inline-block;
}

.info {
  font-size: 1.2rem;
}
</style>