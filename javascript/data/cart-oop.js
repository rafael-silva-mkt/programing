function Cart(localStorageKey) {

  const cart = {

    cartItems: JSON.parse(localStorage.getItem(localStorageKey)) || [],

    addToCart(id, quantity) {

      const sameItem = this.cartItems.find(cartItem => cartItem.id === id);

      if(sameItem) {
        sameItem.quantity += quantity;
      } else {
        this.cartItems.push({
          id,
          quantity,
          deliveryOptionId: '1'
        })
      }
      this.saveCartLocal();
    },

    saveCartLocal() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    updateCartQuantity() {

      let cartQuantity = 0;

      this.cartItems.forEach(cartItem => cartQuantity += cartItem.quantity);

      return cartQuantity;
    },

  }

  return cart;
}

const cart = Cart('cart-oop');
const businesCart = Cart('cart-business');

console.log(cart);
console.log(businesCart);
