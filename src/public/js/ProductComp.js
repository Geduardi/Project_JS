const product = {
    props: ['product', 'img'],
    data() {
        return {

            cartAPI: this.$root.$refs.cart,
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

const products = {
    components: { product },
    data(){
        return {
            products: [],
            filtered: [],
            imgCatalog: 'https://placehold.it/200x150',
            countDisplay: 0
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
        },

    },

    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
                if (this.$root.getGet('search')){
                    this.filter(this.getGet('search'));
                }
                if (document.location.pathname === '/single.html'){
                    this.countDisplay = 4;
                }
                if (document.location.pathname === '/index.html'){
                    this.countDisplay = 8;
                }
                if (this.countDisplay){
                    this.filtered.length = 0;
                    let array = [...this.products];
                    for (let i=0; i < this.countDisplay; i++){
                        let rand = Math.floor(Math.random() * array.length);
                        this.filtered.push(array[rand]);
                        array.splice(rand, 1);
                    }
                }
            });

    },
    template: `
        <div>
            <product v-for="item of filtered" :key="item.id_product" :img="item.product_img_url" :product="item"></product>
        </div>
    `
};

export default products;
