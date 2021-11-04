var vueapp = new Vue({
    el: '#app',
    data: {
        siteimage: 'images/After School Lessons Club-logos_transparent.png',
        cart: [],
        product: [math, english, computer_science,
            music, italian, spanish,
            geography, chemistry, biology, physics],
        sortOptions: [
            { title: "Subject" },
            { location: "Location" },
            { price: "Price" },
            { spaces: "Availability" }]
    },
    methods: {
        AddToCart: function (item) {
            this.cart.push(this.product[item].id);
            this.product[item].spaces--;
        },

        canAddToCart: function (item) {
            return canAddToCart = this.product[item].spaces > 0 ? true : false;
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
        }
    },

    computed: {
        cartItemCount: function () {
            return this.cart.length || '';
        }
    }
});