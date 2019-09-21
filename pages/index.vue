<template>
  <div class="home container">
    <vue-logo :size="64" />
    <div class="title">Trade or view your Portfolio.</div>
    <p class="info">Your progress will be saved automatically after the end of each day</p>
    <div class="hr"></div>
    <h2>Your Funds: ${{$store.getters.funds | money}}</h2>
    {{$store.symbols}}
  </div>
</template>

<script>
import VueLogo from "@/components/logo.vue";
export default {
  components: {
    "vue-logo": VueLogo
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 4rem;
  display: inline-block;
  margin-left: 2rem;
}

.info {
  font-size: 1.2rem;
}
</style>
