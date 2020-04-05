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
                        <a href="single.html" class="fBlockNameLink" >{{ product.product_name }}</a>
                        <p class="fBlockP">\${{ product.price }}</p>
                    </div>
            </div>
     </div>
     <!--                <img :src="img" alt="Some img">-->
<!--                <div class="desc">-->
<!--                    <h3>{{product.product_name}}</h3>-->
<!--                    <p>{{product.price}}₽</p>-->
<!--                    <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>-->
<!--&lt;!&ndash; 1                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>&ndash;&gt;-->
<!--&lt;!&ndash; 2                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>&ndash;&gt;-->
    `
};

const products = {
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
        putLocalStorage(id){
            localStorage.id_product = id;
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        if (localStorage.id_product){
            console.log(localStorage.id_product);
        }
    },
    template: `
        <div class="catalogItems">
            <product v-for="item of filtered" :key="item.id_product" :img="item.product_img_url" :product="item" @click="putLocalStorage(item.id_product)"></product>
        </div>
    `
};

export default products;
