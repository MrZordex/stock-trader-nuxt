<template>
  <div id="nav" class="container">
    <nuxt-link class="home" to="/">Stock Trader</nuxt-link>
    <nuxt-link to="/portfolio">Portfolio</nuxt-link>
    <nuxt-link to="/stocks">Stocks</nuxt-link>
    <a class="end-day" @click="endDay">End Day</a>
    <span class="bold">Funds: ${{$store.getters.funds | money}}</span>
    <span class="bold">Day: {{$store.getters.day}}</span>
  </div>
</template>

<script>
export default {
  computed: {},
  methods: {
    endDay() {
      this.$store.dispatch("endDay");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#nav {
  display: flex;
  height: 4em;
  align-items: center;
  background-color: #f4f4f4;
  margin: 1em;

  a {
    color: #999;
    text-decoration: none;
    margin-right: 2rem;
    &:hover,
    &.home,
    &.nuxt-link-active {
      color: #000;
    }
  }
  font: {
    size: 1.3rem;
  }
  .home {
    font-size: 1.4em;
  }
}

.end-day {
  cursor: pointer;
  margin-left: auto;
  margin-right: 2rem;
}

.bold {
  margin-right: 2rem;
  &:last-child {
    margin: 0;
  }
}
</style>
