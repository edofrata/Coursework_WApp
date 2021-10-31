// this will generate the lessons
function lessons() {

    let lesson = document.getElementsByClassName("lessons");
    for (var i = 0; i < lesson.length; i++) {
        lesson[i].innerHTML += ` 
    <img v-bind:src="product.image">
    <h2 class="product_title" v-text="product.title"></h2>
    <p class="product_location">Location:{{product.location}}</p>
    <p class="product_price"> Price: £{{product.price}}</p>
    <p class="product_space" >Spaces: {{product.spaces}}</p>
    <button type="button" class="btn btn-primary" v-text="product.btn" v-on:click="AddToCart" v-if="canAddToCart"></button>
    <button type="button" class="btn btn-primary" disabled="disabled" v-text="product.btn" v-else></button>`;
    }
}
lessons();

var vueapp = new Vue({
    el: '#app',
    data: {
        siteimage: 'images/After School Lessons Club-logos_transparent.png',
        cart:[],
        product: {
            id: 3377,
            title: 'Math',
            location: 'London',
            price: 100,
            image: "images/maths.png",
            btn: 'Add To Cart',
            spaces: 5,

        }
    },
    methods:{
        AddToCart: function(){
             this.cart.push(this.product.id); 
             this.product.spaces--;
            }
    },

    computed:{
        cartItemCount: function(){
            return this.cart.length || '';
        },
        canAddToCart: function(){
            return this.product.spaces > 0;
        } 
    }
});
// class Lessons {

//     /**
//      * @param {string} siteimage,
//      * @param {string} product_id
//      * @param {string} title
//      * @param {string} location
//      * @param {int} price
//      * @param {string} image
//     */

//     constructor(siteimage, product_id, title, location, price, image) {

//         this.siteimage = siteimage;
//         this.product.id = product_id;
//         this.title = title;
//         this.location = location;
//         this.price = price;
//         this.image = width;

//     }

//     get siteimage(){
//         return this.siteimage;
//     }

//     get product_id(){
//         return this.product_id;
//     }

//     get title(){
//         return this.title;
//     }
//     get location(){
//         return this.location;
//     }
//     get price(){
//         return this.price;
//     }
//     get image(){
//         return this.image;
//     }
// }

// const math = new Lessons('images/After School Lessons Club-logos_transparent.png','3377','Math','London', 100,"images/maths.png");



// let vueapp = new Vue({
//     el: '#app',  
//     data: {
//         siteimage: lesson.siteimage,
//         product: {
//             id: lesson.product_id,
//             title: lesson.title,
//             location: lesson.location,
//             price: lesson.price,
//             image: lesson.image,
//             btn_shop: "Add to Cart"

//         }
//     }
// });


