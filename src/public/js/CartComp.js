const cartItem = {
    props: ['cartItem', 'img'],
    template: `                
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
        addProduct(product, productQuantity = 1) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: productQuantity});
                find.quantity+=productQuantity;
                this.cartPrice += product.price;
            } else {
                let prod = Object.assign({quantity: productQuantity}, product);
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
        clearCart(){
            if (this.cartItems.length != 0){
                this.$parent.deleteJson(`/api/cart/`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.length = 0;
                        }

                    })
            }
        }
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
              <div class="dCartTotal">
                <h4 class="dTotalH4">TOTAL</h4>
                <h4 class="dTotalH4">\${{ cartPrice }}</h4>
              </div>
              <a href="checkout.html" class="dCartButton">Checkout</a>
              <a href="cart.html" class="dCartButton">Go to cart</a>
            </div>
          </div>`
    
};

export default cart;

