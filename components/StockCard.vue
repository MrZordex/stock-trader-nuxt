<template>
  <div class="stock-card container">
    <div class="header">
      <span class="name">{{stock.name}}</span>
      <span class="price">${{stock.price}}</span>
    </div>
    <div class="content">
      <input class="quantity" type="text" placeholder="Quantity" />
      <div class="green-button">Buy</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stock: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables";

.stock-card {
  display: inline-block;
  padding: 0;
  margin-right: 1em;
  margin-bottom: 1em;
  transform: translateX(100vw);
  animation: goleft 0.5s linear forwards;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25em 0.75em;
  border: $border-color;
  background-color: $light-green;
  font-size: 2rem;

  .price {
    font-size: 0.6em;
  }
}
.content {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  border-top: $border;

  .quantity {
    font-size: 1em;
    width: 200px;
    padding: 0.5em 1em;
    border-style: none;
    border-radius: $border-radius;
  }

  .green-button {
    border: 0;
    border-left: $border;
  }
}

@keyframes goleft {
  100% {
    transform: translateX(0);
  }
}
</style>