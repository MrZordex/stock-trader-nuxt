    <template>
  <div class="stock-card container" :style="{'animation-delay':animationDelay +'s'}">
    <div class="header">
      <span class="name">{{stock.name}}</span>
      <div class="details">
        <div>Bought: {{boughtStocksCount}}</div>
        <div>Price: ${{stockDeviationPrice | money}}</div>
      </div>
    </div>
    <div class="content">
      <input
        class="quantity"
        type="text"
        placeholder="Quantity"
        v-model="quantityInput"
        :class="{'invalid':quantity==0}"
      />
      <div
        v-if="!isPortfolio"
        class="green-button"
        @click="buyStocks"
        :class="{'disabled':!canBuy}"
      >Buy</div>

      <div v-else class="blue-button" @click="sellStocks" :class="{'disabled':!canSell}">Sell</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: null
    };
  },
  computed: {
    stockDeviationPrice() {
      return Math.round(
        (1 + (this.stock.deviation || 0) / 100) * this.stock.price
      );
    },
    quantityInput: {
      get() {
        return this.quantity || null;
      },
      set(val) {
        this.quantity = Number(val) || 0;
      }
    },
    boughtStocksCount() {
      return this.$store.getters.boughtStocksCount(this.stock.symbol);
    },
    canBuy() {
      return (
        this.quantity &&
        this.quantity * this.stockDeviationPrice < this.$store.getters.funds
      );
    },
    canSell() {
      return this.quantity && this.quantity <= this.boughtStocksCount;
    }
  },
  props: {
    isPortfolio: {
      type: Boolean,
      required: true
    },
    stock: {
      type: Object,
      required: true
    },
    animationDelay: {
      type: Number,
      required: false,
      default: 0
    }
  },
  methods: {
    buyStocks() {
      if (!this.canBuy) return;

      this.$store.dispatch("buyStocks", {
        ...this.stock,
        quantity: this.quantity
      });
      this.quantity = null;
    },
    sellStocks() {
      if (!this.canSell) return;

      this.$store.dispatch("sellStocks", {
        ...this.stock,
        quantity: this.quantity
      });
    }
  }
};
</script>

    <style lang="scss" scoped>
@import "@/assets/styles/variables";

.stock-card {
  display: inline-block;
  padding: 0;
  margin: 1em 0.3em;
  opacity: 0;
  //transform: translateX(100vw);
  animation: fadein 0.4s linear forwards;
  width: 400px;

  &:hover {
    .name {
      white-space: initial;
    }
  }
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25em 0.75em;
  border: $border-color;
  background-color: $light-green;
  font-size: 1.5rem;

  .name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 250px;
  }

  .details {
    font-size: 0.5em;
    align-self: flex-start;
  }
}
.content {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  border-top: $border;

  .quantity {
    font-size: 1em;
    width: 100%;
    padding: 0.5em 1em;
    border-style: none;
    border-bottom-left-radius: $border-radius;

    &.invalid {
      border-color: $error;
      border-width: 1px;
      border-style: inset;
    }

    &:focus {
      outline: 0;
    }
  }

  .green-button {
    border: 0;
    border-left: $border;
  }
}

@keyframes fadein {
  100% {
    opacity: 1;
  }
}

@keyframes goleft {
  100% {
    transform: translateX(0);
  }
}
</style>