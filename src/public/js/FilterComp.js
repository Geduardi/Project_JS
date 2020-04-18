const search = {
    data(){
        return {
            userSearch: '',
            catalogPage: false
        }
    },
    mounted(){
        if (this.$root.getGet('search')){
            this.userSearch = this.$root.getGet('search');
        }
        if (document.location.pathname === '/catalog.html'){
            this.catalogPage = true;
        }
    },
    template: `
<!--            <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">-->
<!--                <input type="text" class="search-field" v-model="userSearch">-->
<!--                <button class="btn-search" type="submit">-->
<!--                    <i class="fas fa-search"></i>-->
<!--                </button>-->
<!--            </form>-->
                <form action="#" class="headerForm" @submit.prevent="$parent.$refs.products.filter(userSearch)" v-if="catalogPage">
                    <div class="browseFlex">
                        <div class="browse arrowLeft">Browse</div>
                        <div class="drop">
                            <div class="dropFlex">
                                <h3 class="dropH3">Women</h3>
                                <ul class="dropUl browsePadding">
                                    <li class="dropList"><a href="#" class="dropLink">Dresses</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Tops</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Sweaters/Knits</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Jackets/Coats</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Blazers</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Denim</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Leggings/Pants</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Skirts/Shorts</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Accessories </a></li>
                                </ul>
                                <h3 class="dropH3">Men</h3>
                                <ul class="dropUl">
                                    <li class="dropList"><a href="#" class="dropLink">Tees/Tank tops</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Shirts/Polos</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Sweaters</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Sweatshirts/Hoodies</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Blazers</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Jackets/vests</a></li>

                                </ul>
                            </div>

                        </div>
                    </div>
                    <input name="search" type="text" placeholder="Search for Item..." class="headerInput" v-model="userSearch">
                    <button type="submit" class="headerSearch"><i class="fas fa-search"></i></button>
                </form>
                <form :action="'catalog.html?search=' + $root.getGet('search')" class="headerForm" v-else>
                    <div class="browseFlex">
                        <div class="browse arrowLeft">Browse</div>
                        <div class="drop">
                            <div class="dropFlex">
                                <h3 class="dropH3">Women</h3>
                                <ul class="dropUl browsePadding">
                                    <li class="dropList"><a href="#" class="dropLink">Dresses</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Tops</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Sweaters/Knits</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Jackets/Coats</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Blazers</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Denim</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Leggings/Pants</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Skirts/Shorts</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Accessories </a></li>
                                </ul>
                                <h3 class="dropH3">Men</h3>
                                <ul class="dropUl">
                                    <li class="dropList"><a href="#" class="dropLink">Tees/Tank tops</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Shirts/Polos</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Sweaters</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Sweatshirts/Hoodies</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Blazers</a></li>
                                    <li class="dropList"><a href="#" class="dropLink">Jackets/vests</a></li>

                                </ul>
                            </div>

                        </div>
                    </div>
                    <input name="search" type="text" placeholder="Search for Item..." class="headerInput" v-model="userSearch">
                    <button type="submit" class="headerSearch"><i class="fas fa-search"></i></button>
                </form>
    `
};

export default search;