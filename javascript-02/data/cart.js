class Cart {

  localStorageKey;
  cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];

  constructor(localStorageKey) {
   this.localStorageKey = localStorageKey;
  }

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

    console.log(this.cartItems);
  };

  saveCartLocal() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  };
}

export const cart = new Cart('regular-cart');
