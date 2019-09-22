import Vuex from "vuex";
import seedrandom from "seedrandom";
import Cookie from "js-cookie";
import SimpleCrypto from "simple-crypto-js";

const simpleCrypto = new SimpleCrypto("no_free_stocks!");

const getStocks = async (context, options) => {
    let { amount, minPrice, maxPrice } = options;
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

        if (symbol && symbol.name && tops[i].price >= minPrice && tops[i].price < maxPrice) {
            stocks.push({
                symbol: symbol.symbol,
                name: symbol.name,
                price: tops[i].price,
                deviation: 0
            });
        }
    }

    return stocks;
};

const GetCookies = (context) => {
    const rawCookie = context.req.headers.cookie;
    if (!rawCookie)
        return new Object();

    const cookiePairs = rawCookie.split(';').map(s => s.trim().split('='));
    let cookies = new Object();
    cookiePairs.forEach(cp => {
        cookies[cp[0]] = unescape(cp[1]);
    })
    return cookies;
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
        loadState(state, newState) {
            Object.assign(state, newState);
        },
        saveState(state) {
            Cookie.set("state", simpleCrypto.encrypt(state));
        },
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
        },
        setMarketDeviation(state, options) {
            let random = seedrandom(+new Date());
            state.allStocks.forEach(stock => {
                stock.deviation = stock.deviation || 0;
                let devDelta = random() * options.delta * 2 - options.delta;
                stock.deviation += devDelta;
                if (stock.deviation > options.threshold) stock.deviation = options.threshold;
                if (stock.deviation < -options.threshold) stock.deviation = -options.threshold;
            });
        },
        setBoughtDeviation(state) {
            for (let i = 0; i < state.boughtStocks.length; i++) {
                let stock = state.boughtStocks[i];
                stock.deviation = state.allStocks.find(s => s.symbol == stock.symbol).deviation;
            }
        }
    },
    actions: {
        async nuxtServerInit(vuexContext, context) {
            const cookies = GetCookies(context);

            if (cookies.state) {
                vuexContext.commit("loadState", JSON.parse(simpleCrypto.decrypt(cookies.state)));
                return;
            }

            let lowStocks = await getStocks(context, {
                amount: 8,
                minPrice: 80,
                maxPrice: 300
            });
            let midStocks = await getStocks(context, {
                amount: 8,
                minPrice: 300,
                maxPrice: 1200
            });
            let highStocks = await getStocks(context, {
                amount: 8,
                minPrice: 1200,
                maxPrice: Infinity
            });
            vuexContext.commit("loadStocks", [...lowStocks, ...midStocks, ...highStocks]);
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
            vuexContext.commit("setMarketDeviation", { delta: 10, threshold: 60 });
            vuexContext.commit("setBoughtDeviation");
            vuexContext.commit("saveState");
        }
    },
});
