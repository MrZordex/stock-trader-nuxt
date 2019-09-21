import Vue from 'vue'

const moneyFilter = value => {
  return value.toLocaleString();
};

Vue.filter('money', moneyFilter)