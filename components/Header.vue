<template>
  <div id="nav">
    <router-link class="home" to="/">Stock Trader</router-link>
    <router-link to="/portfolio">Portfolio</router-link>
    <router-link to="/stocks">Stocks</router-link>
    <a class="end-day" @click="endDay">End Day</a>
    <span class="funds">Funds: ${{$store.getters.formattedFunds}}</span>
  </div>
</template>

<script>
export default {
  computed: {},
  methods: {
    endDay() {
      console.log("end day");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#nav {
  display: flex;
  height: 4rem;
  align-items: center;
  background-color: #f4f4f4;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  padding: 0 1rem;
  a {
    color: #999;
    text-decoration: none;
    margin-right: 2rem;
    &:hover {
      color: #000;
    }
  }
  font: {
    size: 1.2rem;
    family: Arial;
  }
  .home {
    font-size: 1.5rem;
  }
}

.end-day {
  cursor: pointer;
  margin-left: auto;
  margin-right: 2rem;
}
</style>
