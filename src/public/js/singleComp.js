const product = {
    props: ['product', 'img'],
    data() {
        return {
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */
            cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
        };
    },
    template: `
    <div class="feturedBlock">                
            <div class="fBlockImg">
                        <div href="#" class="fBlockImgLink"><img :src="img" alt="" class="fImg"></div>
                        <a href="javascript: void 0" class="fBlockCart" @click="cartAPI.addProduct(product)">
                            <img src="img/CartW.svg" alt="">
                            <p class="fCartText">Add to Cart</p>
                        </a>
                    </div>
                    <div class="fBlockText">
                        <a :href="'single.html?id=' + product.id_product" class="fBlockNameLink">{{ product.product_name }}</a>
                        <p class="fBlockP">\${{ product.price }}</p>
                    </div>
            </div>
     </div>
    `
};

const singleProduct = {
    components: { product },
    data(){
        return {
            products: [],
            filtered: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));

        },
        getGet(name) {
            let s = window.location.search;
            s = s.match(new RegExp(name + '=([^&=]+)'));
            return s ? s[1] : false;
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
                if (this.getGet('search')){
                    this.filter(this.getGet('search'));
                }
            });
    },
    template: `
        <div class="catalogItems">
            <product v-for="item of filtered" :key="item.id_product" :img="item.product_img_url" :product="item"></product>
        </div>
    `
};

export default singleProduct;