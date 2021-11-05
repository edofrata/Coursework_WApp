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
        order: {
            full_name: '',
            phone_number: '',
        }
    },
    methods: {
        // adds the product to the cart
        AddToCart: function (item) {
            this.cart.push(this.product[item]);
            this.product[item].spaces--;
        },
        //return true or false if there are still items available
        canAddToCart: function (item) {
            return canAddToCart = this.product[item].spaces > 0 ? true : false;
        },
        // show the product page
        show_checkout() {
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
        },
        // function that counts the same item in the cart
        item_count(index) {
            count = 1;
            for (var i = 0; i < this.cart.length; i++) {
                for (var k = (i + 1); k < this.cart.length; k++) {
                    if (this.cart[i].title === this.cart[k].title) {
                        count++;
                    }
                }
            }
            return count;
        },
        //item remove and adds back the items
        item_remove(item) {
            console.log(item);
            for (var i = 0; i < this.product.length; i++) {
                if (this.product[i].id === this.cart[item].id ) {
                    this.product[i].spaces++;
                }
            }
            this.cart.splice(item, 1);
        }
    },
    computed: {
        cartItemCount: function () {
            return this.cart.length || 0;
        }
    }
});

// function that removes an item from an array
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};