const cartItem = {
    props: ['cartItem', 'img'],
    template: `
<!--                <div class="cart-item">-->
<!--                    <div class="product-bio">-->
<!--                        <img :src="img" alt="Some image">-->
<!--                        <div class="product-desc">-->
<!--                            <p class="product-title">{{cartItem.product_name}}</p>-->
<!--                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>-->
<!--                            <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="right-block">-->
<!--                        <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>-->
<!--                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>-->
<!--                    </div>-->
<!--                </div>-->
                
                <div class="dCartItem">
                <a href="#"><img :src="img" alt="Some image" class="dCartItem__img"></a>
                <div class="dCartItemText">
                  <a href="#" class="dCartLink">{{cartItem.product_name}}</a>
                  <p><i class="fa fa-lg fa-star"></i><i class="fa fa-lg fa-star"></i><i class="fa fa-lg fa-star"></i><i
                      class="fa fa-lg fa-star"></i><i class="fas fa-lg fa-star-half-alt"></i></p>
                  <p class="dCartItemP">{{cartItem.quantity}} x \${{cartItem.price}}</p>
                </div>
                <a href="javascript: void 0" class="dCartDelete" @click="$emit('remove', cartItem)"><i class="fas fa-times-circle"></i></a>

              </div>
    `
};

const cart = {
    components: { cartItem },
    data() {
        return {
            imgCart: 'https://placehold.it/50x100',
            cartItems: [],
            cartPrice: 0,
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;
                this.cartPrice += product.price;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                            this.cartPrice += product.price;
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
            this.cartPrice -= item.price;
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
                this.cartPrice = +data.amount;
            });
    },
    template: `
<!--        <div>-->
<!--&lt;!&ndash;            <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="cart-block" v-show="showCart">&ndash;&gt;-->
<!--&lt;!&ndash;                <p v-if="!cartItems.length">Корзина пуста</p>&ndash;&gt;-->
<!--&lt;!&ndash;                <cart-item class="cart-item" &ndash;&gt;-->
<!--&lt;!&ndash;                v-for="item of cartItems" &ndash;&gt;-->
<!--&lt;!&ndash;                :key="item.id_product"&ndash;&gt;-->
<!--&lt;!&ndash;                :cart-item="item" &ndash;&gt;-->
<!--&lt;!&ndash;                :img="imgCart"&ndash;&gt;-->
<!--&lt;!&ndash;                @remove="remove">&ndash;&gt;-->
<!--&lt;!&ndash;                </cart-item>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--        </div>-->
          <div class="cartBlock">
            <a href="#" class="cartLink" @click="showCart = !showCart"><img src="img/cart.svg" alt="" class="headerCartImg"></a>
            <div class="dropCartFlex" v-show="showCart" :class="{ dropCartFlex__active : showCart }">
              <p v-if="!cartItems.length">Корзина пуста</p>
              <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="item.product_img_url"
                @remove="remove">
                </cart-item>
<!--              <div class="dCartItem">-->
<!--                <a href="#"><img src="img/cartItem1.jpg" alt=""></a>-->
<!--                <div class="dCartItemText">-->
<!--                  <a href="#" class="dCartLink">Rebox Zane</a>-->
<!--                  <p><i class="fa fa-lg fa-star"></i><i class="fa fa-lg fa-star"></i><i class="fa fa-lg fa-star"></i><i-->
<!--                      class="fa fa-lg fa-star"></i><i class="fas fa-lg fa-star-half-alt"></i></p>-->
<!--                  <p class="dCartItemP">1 x $250</p>-->
<!--                </div>-->
<!--                <a href="#" class="dCartDelete"><i class="fas fa-times-circle"></i></a>-->

<!--              </div>-->
<!--              <div class="dCartItem">-->
<!--                <a href="#"><img src="img/cartItem2.jpg" alt=""></a>-->
<!--                <div class="dCartItemText">-->
<!--                  <a href="#" class="dCartLink">Rebox Zane</a>-->
<!--                  <p><i class="fa fa-lg fa-star"></i><i class="fa fa-lg fa-star"></i><i class="fa fa-lg fa-star"></i><i-->
<!--                      class="fa fa-lg fa-star"></i><i class="fas fa-lg fa-star-half-alt"></i></p>-->
<!--                  <p class="dCartItemP">1 x $250</p>-->
<!--                </div>-->
<!--                <a href="#" class="dCartDelete"><i class="fas fa-times-circle"></i></a>-->
<!--              </div>-->
              <div class="dCartTotal">
                <h4 class="dTotalH4">TOTAL</h4>
                <h4 class="dTotalH4">\${{ cartPrice }}</h4>
              </div>
              <a href="#" class="dCartButton">Checkout</a>
              <a href="#" class="dCartButton">Go to cart</a>
            </div>
          </div>`
    
};

export default cart;

