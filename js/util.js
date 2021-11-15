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
        orders_submitted: [],
        order: {
            full_name: '',
            phone_number: '',
            price: '',
            lessons_booked: [],
        }
    },
    methods: {
        // adds the product to the cart
        AddToCart: function (item) {
            if (this.search_On) {
                for (var i = 0; i < this.product.length; i++) {
                    if (this.searches[item].id === this.product[i].id) {
                        this.cart.push(this.product[i]);
                        this.product[i].spaces--;
                        this.product[i].booking++;
                    }
                }
            } else {
                this.cart.push(this.product[item]);
                this.product[item].spaces--;
                this.product[item].booking++;
            }

        },
        //return true or false if there are still items available
        canAddToCart: function (item) {
            if (this.search_On) {
                return canAddToCart = this.searches[item].spaces > 0 ? true : false;
            } else {
                return canAddToCart = this.product[item].spaces > 0 ? true : false;
            }

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
        check_doubles(array) {
            if (array.length > 1) {
                for (var k = 0; k < array.length; k++) {
                    for (var j = (k + 1); j < array.length; j++) {
                        if (array[k].id === array[j].id) {
                            array.splice(j, 1);
                        }
                    }
                }
            }
        },
        // retrieves number of bookings for the lesson
        bookings(index) {
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
                    if (this.product[i].booking < 1) {
                        this.cart.splice(item, 1);
                        break;
                    }

                }
            }

        },
        // cart item count
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


        // function which sets the search on
        searchOn: function () {
            this.search_On = !this.search_On ? true : false;
            console.log(this.search_On);
        },
        //submit order function 
        submit_order() {

            if (login_check()) {
                
                this.order.lessons_booked.push(this.cart);
                this.order.price = this.shopping_price();
                this.orders_submitted.push(JSON.stringify(this.order));
                alert('SUCCESS! Your Order went through');
                // clearing up all variables
                this.order.full_name = '';
                this.order.phone_number = '';
                this.order.price = '';
                this.order.lessons_booked = [];
                this.cart = [];
                this.show_checkout();
            } else {

                alert('ERROR! Something went wrong');

            }
        }
    },
    computed: {

    }
});

function search_lesson() {

    vueapp.searches = [];
    if (vueapp.search_lessons !== '' && vueapp.search_lessons !== " ") {
        for (var i = 0; i < vueapp.product.length; i++) {
            console.log("I AM Operating")

            if (vueapp.search_lessons.length < 2) {
                for (var k = 0; k < (vueapp.product[i].title.length + vueapp.product[i].location.length); k++) {
                    if (vueapp.search_lessons.toLowerCase() === vueapp.product[i].title.charAt(k).toLowerCase() ||
                        vueapp.search_lessons.toLowerCase() === vueapp.product[i].location.charAt(k).toLowerCase()) {
                        vueapp.searches.push(vueapp.product[i]);
                    }

                }

            }
            else {
                if (vueapp.search_lessons.toLowerCase() === vueapp.product[i].title.substr(0, vueapp.search_lessons.length).toLowerCase() ||
                    vueapp.search_lessons.toLowerCase() === vueapp.product[i].location.substr(0, vueapp.search_lessons.length).toLowerCase()) {
                    vueapp.searches.push(vueapp.product[i]);
                }
            }
        }
    }
}