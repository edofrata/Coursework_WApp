var vueapp = new Vue({
    el: '#app',
    data: {
        siteimage: 'images/After School Lessons Club-logos_transparent.png',
        cart:[],
        product: [  math, english, computer_science,
                    music, italian, spanish,
                    geography,chemistry,biology,physics]
    },
    methods:{
        AddToCart: function(item){
             this.cart.push(this.product[item].id); 
             this.product[item].spaces--;
            },
            
            canAddToCart: function(item){
                return canAddToCart = this.product[item].spaces > 0 ? true : false;
            } 
    },

    computed:{
        cartItemCount: function(){
            return this.cart.length || '';
        }
    }
});