let app1 = new Vue({
  el: ".container",
  data: {
    To: "USD",
    From: "EUR",
    currencies: {},
    amount: 0,
    result: 0,
    loading: false
  },
  mounted() {
    this.getCurrencies();
  },
  computed: {
    formattedCurrencies() {
      return Object.values(this.currencies);
    },
    calculatedResult() {
      return Number(this.amount) * this.result;
    },
    disabled() {
      return this.amount === 0 || !this.amount || this.loading;
    }
  },
  methods: {
    getCurrencies() {
      const currencies = localStorage.getItem("currencies");
      if (currencies) {
        this.currencies = JSON.parse(currencies);
        return;
      }

      axios
        .get(
          "https://free.currconv.com/api/v7/currencies?apiKey=do-not-use-this-key"
        )
        .then(res => {
          this.currencies = res.data.results;
          localStorage.setItem("currencies", JSON.stringify(res.data.results));
        });
    },
    convertCurrency() {
      const key = `${this.From}_${this.To}`;
      this.loading = true;
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/free.currconv.com/api/v7/convert?q=${key}&compact=ultra&apiKey=ec406fb78f422b22c853`
        )
        .then(res => {
          this.loading = false;
          this.result = res.data[key];
        });
    }
  },
  watch: {
    From() {
      this.result = 0;
    },
    To() {
      this.result = 0;
    }
  }
});

// timestamp 23:43
//timesatamp 50:30
