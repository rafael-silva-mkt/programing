// Exports
export { cart };

// Classe
class Cart {

  constructor(key){
    this.storageKey = key;
    this.cartItems = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  };

  addToCart(id, quantity){

    const sameItem = this.cartItems.find(cartItem => cartItem.id === id);

    if(sameItem) {
      sameItem.quantity += quantity;
    } else {
      this.cartItems.push({
        id,
        quantity,
        deliveryOptionsId: '1'
      })
    }
    this.saveCartLocal();
  };

  saveCartLocal() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  updateCartQuantity() {

    let cartQuantity = 0;

    this.cartItems.forEach(cartItem => cartQuantity += cartItem.quantity);

    return cartQuantity;

  };

};

// Variables
const cart = new Cart('regular-cart');
