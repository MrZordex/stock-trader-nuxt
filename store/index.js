import Vuex from "vuex";

export default () => new Vuex.Store({
    state: {
        funds: 10000,
        day: 1,
        stocks: []
    },
    getters: {
        funds: state => state.funds,
        day: state => state.day,
        stocks: state => [...state.stocks]
    },
    mutations: {
        loadStocks(state, stocks) {
            state.stocks = [...stocks];
        }
    },
    actions: {
        async nuxtServerInit(vuexContext, context) {
            let symbols, tops, stocks;

            await context.app.$axios
                .$get(process.env.stockBaseUrl + "/ref-data/symbols")
                .then(data => {
                    symbols = data;
                })
                .catch(e => context.error(e));

            // tops = await context.app.$axios
            //     .$get(process.env.stockBaseUrl + "/1.0/tops")
            //     .then(data => {
            //         return data;
            //     })
            //     .catch(e => context.error(e));



            // stocks = tops.map((t) => {
            //     const name = symbols.find(s => s.symbol == t.symbol).name;
            //     return name;
            // });

            vuexContext.commit("loadStocks", symbols.slice(0, 20));
        },
        endDay(vuexContext) {
            vuexContext.state.day++;
            console.log(vuexContext.state.funds + " end day");
        }
    }
});
