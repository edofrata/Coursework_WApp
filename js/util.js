var vueapp = new Vue({
    el: '#app',
    data: {
        siteimage: 'images/After School Lessons Club-logos_transparent.png',
        show_products: true,
        cart: [],
        product: [math, english, computer_science,
            music, italian, spanish,
            geography, chemistry, biology, physics],
        sortOptions: [
            { title: "Subject" },
            { location: "Location" },
            { price: "Price" },
            { spaces: "Availability" }],
        order:{
            full_name: '',
            phone_number:'',
        }
    },
    methods: {
        // adds the product to the cart
        AddToCart: function (item) {
            this.cart.push(this.product[item].id);
            this.product[item].spaces--;
        },
        //return true or false if there are still items available
        canAddToCart: function (item) {
            return canAddToCart = this.product[item].spaces > 0 ? true : false;
        },
        // show the product page
        show_checkout(){
            this.show_products = this.show_products ? false : true;
        },
        // sorting array function
        sort_products: function (sort) {
            for (var i = 0; i < this.product.length; i++) {
                for (var k = (i + 1); k < this.product.length; k++) {
                    if (this.product[i][sort] > this.product[k][sort]) {
                        var holder = this.product[i];
                        this.product[i] = this.product[k];
                        this.product[k] = holder;
                    }
                }
            }
            // reloads root of vue
            vueapp.$forceUpdate();
        }
    },
    computed: {
        cartItemCount: function () {
            return this.cart.length || 0;
        }
    }
});