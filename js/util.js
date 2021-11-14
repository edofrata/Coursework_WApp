var vueapp = new Vue({
    el: '#app',
    data: {
        siteimage: 'images/After School Lessons Club-logos_transparent.png',
        show_products: true,
        search_On: false,
        descending: false,
        cart: [],
        search_lessons: '',
        searches: [],
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
            this.product[item].booking++;
        },
        //return true or false if there are still items available
        canAddToCart: function (item) {
            return canAddToCart = this.product[item].spaces > 0 ? true : false;
        },
        // show the product page
        show_checkout() {
            this.show_products = this.show_products ? false : true;
        },
        // descending order
        descending_selected: function () {
            this.descending = !this.descending ? true : false;
        },
        // sorting array function
        sort_products: function (sort) {

            for (var i = 0; i < this.product.length; i++) {
                for (var k = (i + 1); k < this.product.length; k++) {
                    let ascending = this.product[i][sort] > this.product[k][sort];
                    let descending = this.product[i][sort] < this.product[k][sort];
                    let bool = this.descending ? descending : ascending;
                    if (bool) {
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
            if (this.cart.length > 1) {
                for (var k = 0; k < this.cart.length; k++) {
                    for (var j = (k + 1); j < this.cart.length; j++) {
                        if (this.cart[k].id === this.cart[j].id) {
                            this.cart.splice(j, 1);
                        }
                    }

                }
            }
            for (var i = 0; i < this.product.length; i++) {
                if (this.cart[index].title === this.product[i].title) {
                    return this.product[i].booking;
                }
            }
        },
        //item remove and adds back the items
        item_remove(item) {
            for (var i = 0; i < this.product.length; i++) {
                if (this.product[i].id === this.cart[item].id) {
                    this.product[i].booking--;
                    this.product[i].spaces++;
                    if (this.product[i].booking <= 0) {
                        this.cart.splice(item, 1);
                        break;
                    }

                }
            }

        },
        // cart item copunt
        cartItemCount: function () {
            let sum = 0;
            for (let i = 0; i < this.product.length; i++) {

                sum += this.product[i].booking;
            }
            return sum;
        },
        // price showing function
        shopping_price() {
            let price = 0;
            for (var i = 0; i < this.product.length; i++) {
                price += (this.product[i].booking * this.product[i].price);
            }
            return price;
        },


    //  function which sets the search on
        searchOn: function () {
            this.search_On = !this.search_On ? true : false;
            console.log(this.search_On);
        },
           // function for searching the word
        search_lesson() {
            
            if(this.search_lessons !== ''){
                console.log("I AM OPERATING")
                this.search_lessons.toLowerCase();
                for (var i = 0; i < this.product.length; i++) {
                    if (this.search_lessons === this.product[i].title[i] || this.search_lessons === this.product[i].location[i]) {
                        this.searches.push(this.product[i]);
                    }
                }
            }
           
        }

    },
    computed: {

    }
});
