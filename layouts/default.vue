<template>
  <div id="app">
    <app-header />
    <nuxt class="page" />
  </div>
</template>

<script>
import AppHeader from "@/components/Header";
export default {
  components: {
    "app-header": AppHeader
  }
};
</script>