import cart from './CartComp'
import cartDisplay from './CartDisplayComp'
import products from './ProductComp'
import search from './FilterComp'
import error from './ErrorComp'

const app = {
    el: '#app',
    components: {
        cart,
        products,
        error,
        search,
        cartDisplay,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        getGet(name) {
            let s = window.location.search;
            s = s.match(new RegExp(name + '=([^&=]+)'));
            return s ? s[1] : false;
        }
    },
};

export default app;