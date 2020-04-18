const singleProduct = {
    components: {  },
    data(){
        return {
            allProducts: [],
            img: '',
            product:{},
            quantity: 1
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.allProducts.push(el);
                }
                this.product = this.allProducts.find(item => item.id_product === +this.$root.getGet('id'));
                this.img = this.product.product_img_url;
            });
    },

    template: `
        <section class="arrivalContent">
          <figure class="arrImgBox" :style="{'background-image': 'url('+img+')', 'background-size' : 'contain'}">
            <a href="#" class="arrLinkArrow"><i class="fas fa-chevron-left"></i></a>
            <a href="#" class="arrLinkArrow"><i class="fas fa-chevron-right"></i></a>
          </figure>
          <div class="arrInfo container">
            <div class="arrInfoBlock">
              <article class="arrInfoText">
                <div class="arrBlock">
                  <h4 class="arrBlockH4">MEN COLLECTION</h4>
                  <div class="arrInfoLineGr">
                    <div class="arrInfoRed"></div>
                  </div>
                </div>
                <h3 class="arrBlockH3">{{product.product_name}}</h3>
                <p class="arrBlockP">{{product.description}}
                </p>
                <div class="arrBlockDetail">
                  <p class="arrBlockDetailP">MATERIAL: <span class="spanP">COTTON</span></p>
                  <p class="arrBlockDetailP">DESIGNER: <span class="spanP">BINBURHAN</span></p>
                </div>
                <p class="arrBlockPriceP">\${{product.price}}</p>
              </article>
              <form action="#" class="arrBlockForm" @submit.prevent="$root.$refs.cart.addProduct(product,+quantity)">
                <div class="chooseArea">
                  <div class="chBlock">
                    <h4 class="chH4">CHOOSE COLOR</h4>
                    <figure class="chBlockBox">
                      <div class="chColorFlex">
                        <div class="chColorSample"></div>
                        <p class="chDescr">Red</p>
                      </div>
                      <i class="fas fa-angle-down"></i>
                    </figure>
                  </div>
                  <div class="chBlock">
                    <h4 class="chH4">CHOOSE SIZE</h4>
                    <figure class="chBlockBox">
                      <p class="chDescr">XXL</p>
                      <i class="fas fa-angle-down"></i>
                    </figure>
                  </div>
                  <div class="chBlock">
                    <h4 class="chH4">QUANTITY</h4>
                    <input type="number" class="chInput" v-model:value="quantity">
                  </div>
                </div>
                <button type="submit" class="chooseButton"><img src="img/cartPink.svg" alt="" class="chCartImg">
                  Add to Cart</button>
              </form>
            </div>
          </div>
    </section>
    `
};

export default singleProduct;