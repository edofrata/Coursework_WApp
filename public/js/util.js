var vueapp = new Vue({
    el: '#app',
    data: {
        siteimage: '/../images/logo.png',
        show_products: true,
        search_On: false,
        ascending: true,
        descending: false,
        cart: [],
        search_lessons: '',
        searches: [],
        product: {},
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
    created: 
    // retrieving all the products and storing them to the array
    function(){
        fetch("https://cst3145-edo.herokuapp.com/collection/lessons", {
        method: 'GET'
        }).then(function(response){
                response.json().then(
                    function(json){
                        vueapp.product = json;
                        console.log(json);
                    });
            })
    },
    methods: {
         // adding a product
    Order: function(collection, order){
        fetch("https://cst3145-edo.herokuapp.com/collection/" + collection, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
        .then(response => response.json())
        .then(responseJSON => {
            console.log('Success: ', responseJSON);
        })
    },
        // adds the product to the cart
        AddToCart: function (item) {
            if (this.search_On) {
                for (var i = 0; i < this.product.length; i++) {
                    if (this.searches[item]._id === this.product[i]._id) { this.no_double(i); }
                }
            } else { this.no_double(item); }

        },
        // no_double for the cart
        no_double(item) {

            let count = 0;
            // check the length of the cart, if 0 emans that it is empty
            if (this.cart.length > 0) {
                for (let i = 0; i < this.cart.length; i++) {
                    // if the in the cart is equqal to the product sent means that it is already in the cart
                    if (this.cart[i]._id === this.product[item]._id) {
                        count++;
                        this.product[item].spaces--;
                        this.product[item].booking++;
                    }
                }
                // if the count is still 0 means no double was found and can add to the cart
                if (count == 0) {
                    this.cart.push(this.product[item]);
                    this.product[item].spaces--;
                    this.product[item].booking++;
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
        // ascending order
        ascending_selected() {
            if (!this.ascending) {
                this.ascending = true;
                this.descending = false;
                this.sort_products('title')
            }

        },
        // descending order
        descending_selected: function () {
            if (!this.descending) {
                this.descending = true;
                this.ascending = false;
                this.sort_products('title')
            }

        },
        // sorting array function
        sort_products: function (sort) {
            let array = !this.search_On ? this.product : this.searches;
                for (var i = 0; i < array.length; i++) {
                    for (var k = (i + 1); k < array.length; k++) {
                        let ascending = array[i][sort] > array[k][sort];
                        let descending = array[i][sort] < array[k][sort];
                        let bool = this.descending ? descending : ascending;
                        if (bool) {
                            var holder = array[i];
                            array[i] = array[k];
                            array[k] = holder;
                        }
                    }
                }
            // reloads root of vue
            vueapp.$forceUpdate();
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
                if (this.product[i]._id === this.cart[item]._id) {
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
            if (this.cart.length > 0) {
                for (let i = 0; i < this.product.length; i++) {
                    sum += this.product[i].booking;
                }
                return sum;

            } else { return sum; }

        },
        // price showing function
        shopping_price() {
            let price = 0;
            for (var i = 0; i < this.product.length; i++) {
                price += (this.product[i].booking * this.product[i].price);
            }
            return price;
        },

        // checks the name to be only letters
        check_name(name) {
            var letters = new RegExp(/^[A-Za-z]+ [A-Za-z]+$/);
            return letters.test(name);
        },

        // checks the phone number to be only numbers
        check_phone(phone) {
            var digits = new RegExp(/^\d+$/);
            return digits.test(phone) && phone.length == 11;
        },
        //submit order function 
        submit_order() {

            if (this.check_name(this.order.full_name) && this.check_phone(this.order.phone_number)) {
                this.order.lessons_booked.push(this.cart);
                this.order.price = this.shopping_price();
                this.Order("orders", this.order);
                alert('SUCCESS! Your Order went through');
                
                // clearing up all variables
                this.order.full_name = '';
                this.order.phone_number = '';
                this.order.price = '';
                this.order.lessons_booked = [];
                this.cart = [];
                // setting bookings back to 0
                for (var i = 0; i < this.product.length; i++) {
                    this.product[i].booking = 0;
                }
                this.show_checkout();
            } else { alert('ERROR! Something went wrong'); }
        }
    }
});

// function for searching 
function search_lesson() {
    vueapp.searches = [];
    // in case the user inputs a space the search won't start
    if (!(/^\s*$/.test(vueapp.search_lessons))) {
        vueapp.search_On = true;
        for (var i = 0; i < vueapp.product.length; i++) {
            //counter for lessons found
            let counter = 0;
            //condition for searching just characters in a word
            if (vueapp.search_lessons.length < 2) {
                for (var k = 0; k < (vueapp.product[i].title.length + vueapp.product[i].location.length); k++) {
                    if (vueapp.search_lessons.toLowerCase() === vueapp.product[i].title.charAt(k).toLowerCase() ||
                        vueapp.search_lessons.toLowerCase() === vueapp.product[i].location.charAt(k).toLowerCase()) {
                        //checking for double lessons
                        for (var j = 0; j < vueapp.searches.length; j++) {
                            if (vueapp.product[i]._id === vueapp.searches[j]._id) {
                                counter++;
                            }
                        }
                        //if counter greater than 0 means that it has found duplicates
                        if (counter == 0) {
                            vueapp.searches.push(vueapp.product[i]);
                        }

                    }
                }
            } else {
                // searching lesson by the amount of characters input from the user
                if (vueapp.search_lessons.toLowerCase() === vueapp.product[i].title.substr(0, vueapp.search_lessons.length).toLowerCase() ||
                    vueapp.search_lessons.toLowerCase() === vueapp.product[i].location.substr(0, vueapp.search_lessons.length).toLowerCase()) {
                    vueapp.searches.push(vueapp.product[i]);
                }
            }
        }
    }else {vueapp.search_On = false;}
}