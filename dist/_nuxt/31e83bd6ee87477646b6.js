(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{242:function(t,e,n){var content=n(247);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(32).default)("7f55a176",content,!0,{sourceMap:!1})},246:function(t,e,n){"use strict";var o=n(242);n.n(o).a},247:function(t,e,n){(t.exports=n(31)(!1)).push([t.i,".stocks[data-v-20a7bf55]{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start}.title[data-v-20a7bf55]{font-size:4rem;display:inline-block}.info[data-v-20a7bf55]{font-size:1.2rem}",""])},256:function(t,e,n){"use strict";n.r(e);var o={computed:{stocks:function(){return this.$store.getters.boughtStocks}},methods:{endDay:function(){this.$store.dispatch("endDay")}}},r=(n(246),n(16)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.stocks.length?n("div",{staticClass:"stocks"},t._l(t.stocks,(function(t,i){return n("stock-card",{key:t.symbol,attrs:{stock:t,isPortfolio:!0,animationDelay:.015*i}})})),1):n("div",{staticClass:"empty container"},[n("div",{staticClass:"title"},[t._v("Your Portfolio is empty.")]),t._v(" "),n("p",{staticClass:"info"},[t._v("\n    You can\n    "),n("nuxt-link",{attrs:{to:"/stocks"}},[t._v("buy some stocks")]),t._v(" "),n("span",[t._v("or")]),t._v(" "),n("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.endDay(e)}}},[t._v("end the day")])],1),t._v(" "),n("div",{staticClass:"hr"}),t._v(" "),n("h2",[t._v("Your Funds: $"+t._s(t._f("money")(t.$store.getters.funds)))]),t._v("\n  "+t._s(t.$store.symbols)+"\n")])}),[],!1,null,"20a7bf55",null);e.default=component.exports}}]);