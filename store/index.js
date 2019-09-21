import Vuex from "vuex";
import seedrandom from "seedrandom";

const getStocks = async (context, amount, minValue) => {
    let random = seedrandom("random_stocks_4");

    let symbols = await context.app.$axios
        .$get(process.env.stockBaseUrl + "/ref-data/symbols")
        .then(data => data)
        .catch(e => context.error(e));

    let tops = await context.app.$axios
        .$get(process.env.stockBaseUrl + "/tops/last")
        .then(data => data)
        .catch(e => context.error(e));

    for (let i = 0; i < tops.length; i++) {
        let index = Math.floor(random() * tops.length);
        let temp = tops[i];
        tops[i] = tops[index];
        tops[index] = temp;
    }

    let stocks = [];

    for (let i = 0; i < tops.length && stocks.length < amount; i++) {
        let symbol = symbols.find(s => s.symbol == tops[i].symbol);

        if (symbol && symbol.name && tops[i].price >= minValue) {
            stocks.push({
                symbol: symbol.symbol,
                name: symbol.name,
                price: tops[i].price
            });
        }
    }

    return stocks;
};

export default () => new Vuex.Store({
    state: {
        funds: 10000,
        day: 1,
        allStocks: [],
        boughtStocks: []
    },
    getters: {
        funds: state => state.funds,
        day: state => state.day,
        stocks: state => [...state.allStocks],
        boughtStocks: state => [...state.boughtStocks],
        boughtStocksCount: state => symbol => {
            let existing = state.boughtStocks.find(s => s.symbol == symbol);
            return existing ? existing.quantity : 0;
        }
    },
    mutations: {
        loadStocks(state, stocks) {
            state.allStocks = [...stocks];
        },
        updateFunds(state, delta) {
            state.funds += delta;
        },
        updateStocks(state, stocks) {
            let existing = state.boughtStocks.find(s => s.symbol == stocks.symbol);
            if (existing) {
                existing.quantity += stocks.quantity;
            }
            else
                state.boughtStocks.push(stocks);
        },
        updateBoughtStocks(state, stocks) {
            state.boughtStocks = [...stocks];
        }
    },
    actions: {
        async nuxtServerInit(vuexContext, context) {
            let stocks = await getStocks(context, 24, 90);
            vuexContext.commit("loadStocks", stocks);
        },
        buyStocks(vuexContext, stocks) {
            if (vuexContext.state.funds - stocks.quantity * stocks.price < 0)
                return;

            vuexContext.commit("updateFunds", -stocks.quantity * stocks.price);
            vuexContext.commit("updateStocks", { ...stocks, quantity: stocks.quantity });
        },
        sellStocks(vuexContext, stocks) {
            if (stocks.quantity > vuexContext.getters.boughtStocksCount(stocks.symbol))
                return;

            vuexContext.commit("updateFunds", stocks.quantity * stocks.price);

            if (stocks.quantity < vuexContext.getters.boughtStocksCount(stocks.symbol))
                vuexContext.commit("updateStocks", { ...stocks, quantity: -stocks.quantity });
            else {
                let boughtStocks = [...vuexContext.state.boughtStocks];
                let stockToRemove = boughtStocks.find(s => s.symbol == stocks.symbol);
                boughtStocks.splice(boughtStocks.indexOf(stockToRemove), 1)
                vuexContext.commit("updateBoughtStocks", boughtStocks);
            }
        },
        endDay(vuexContext) {
            vuexContext.state.day++;
            console.log(vuexContext.state.funds + " end day");
        }
    },
});
