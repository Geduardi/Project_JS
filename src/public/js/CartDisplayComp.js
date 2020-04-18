const cartDisplayItem = {
    props: ['cartItem', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },
    computed: {
        itemSum(){
            return this.cartItem.quantity*this.cartItem.price;
        }
    },
    template: `
        <div class="cartList">
              <div class="cartList__element cartList__main">
                <div class="cartList__product">
                  <a href="#" class="cartList__link"><img :src="img" alt="" class="cartList__img"></a>
                  <div class="cartList__info">
                    <a :href="'single.html?id='+cartItem.id_product" class="cartList__link">
                      <h1 class="cartList__h1 cartList__info__padding">{{cartItem.product_name}}</h1>
                    </a>
                    <p class="cartList__p">Color:<span class="cartList__span">Red</span></p>
                    <p class="cartList__p">Size:<span class="cartList__span">Xll</span></p>
                  </div>
                </div>
              </div>
              <div class="cartList__element">
                <p class="cartList__p">\${{cartItem.price}}</p>
              </div>
              <div class="cartList__element">
                <p type="number" class="cartList__count">{{cartItem.quantity}}</p>
              </div>
              <div class="cartList__element">
                <p class="cartList__p">FREE</p>
              </div>
              <div class="cartList__element">
                <p class="cartList__p">{{ cartItem.quantity*cartItem.price }}</p>
              </div>
              <a href="javascript: void 0" class="cartList__element cartList__link__close" @click="cartAPI.remove(cartItem)"><i
                  class="fas fa-times-circle cartList__element__close"></i></a>
        </div>          
    `
};

const cartDisplay = {
    components: { cartDisplayItem },
    data() {
        return {
            imgCart: 'https://placehold.it/50x100',
            cartAPI: this.$root.$refs.cart,
            showCart: false,
        }
    },
    computed: {
        totalSum(){
            return this.cartAPI.cartPrice;
        }
    },
    template: `
        <form action="#" class="cartForm">
          <section class="orderList">
            <div class="cartList">
              <div class="cartList__element cartList__main">
                <h1 class="cartList__h1">Product Details</h1>
              </div>
              <div class="cartList__element">
                <h1 class="cartList__h1">unite Price</h1>
              </div>
              <div class="cartList__element">
                <h1 class="cartList__h1">quantity</h1>
              </div>
              <div class="cartList__element">
                <h1 class="cartList__h1">shipping</h1>
              </div>
              <div class="cartList__element">
                <h1 class="cartList__h1">subtotal</h1>
              </div>
              <div class="cartList__element">
                <h1 class="cartList__h1">action</h1>
              </div>
            </div>
            <cartDisplayItem
                v-for="item of cartAPI.cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="item.product_img_url"></cartDisplayItem> 
          </section>
          <div class="cartForm__actions">
            <button class="cartButton cartForm__button" @click="cartAPI.clearCart()">cLEAR SHOPPING CART</button>
            <a href="catalog.html" class="cartButton cartForm__button">cONTINUE sHOPPING</a>
          </div>
          <div class="cartForm__bottom">
            <div class="cartForm__block">
              <h1 class="cartForm__h1">Shipping Adress</h1>
              <select class="cartForm__input cartForm__select">
                <option value="" class="cartForm__input">Bangladesh</option>
                <option value="" class="cartForm__input">Bangladesh</option>
                <option value="" class="cartForm__input">Bangladesh</option>
              </select>
              <input type="text" class="cartForm__input" placeholder="State">
              <input type="text" class="cartForm__input" placeholder="Postcode / Zip">
              <button class="cartButton cartForm__button cartForm__button__mini">get a quote</button>
            </div>
            <div class="cartForm__block cartForm__block__margin">
              <h1 class="cartForm__h1">Shipping Adress</h1>
              <h4 class="cartForm__h4">Enter your coupon code if you have one</h4>
              <input type="text" class="cartForm__input" placeholder="Postcode / Zip">
              <button class="cartButton cartForm__button cartForm__button__mini">Apply coupon</button>
            </div>
            <div class="cartForm__block ">
              <div class="cartForm__block__final">
                <p class="cartForm__p">Sub total&emsp;&emsp;{{totalSum}}</p>
                <h1 class="cartForm__h1">GRAND TOTAL&emsp;
                  <span class="logoLetter">{{totalSum}}</span>
                </h1>
                <div class="cartForm__buttonBlock">
                  <a href="checkout.html" class="cartButton cartForm__button cartForm__button__final">proceed to checkout</a>
                </div>
              </div>
            </div>
          </div>
        </form>
         `

};

export default cartDisplay;