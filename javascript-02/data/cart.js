// Imports

// Exports
export { cart };

// Variables and class
class Cart {

  constructor(key) {
    this.storageKey = key;
    this.cartItems = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  addToCart(container, id) {

    const sameItem = this.cartItems.find(cartItem => cartItem.id === id);

    const selectElement = container.querySelector('.js-select-quantity');
    const quantity = Number(selectElement.value);

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
  }

  saveCartLocal() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  updateCartQuantity() {

    let cartQuantity = 0;

    this.cartItems.forEach(cartItem => cartQuantity += cartItem.quantity);

    return cartQuantity;

  }

}

const cart = new Cart('regular-cart');

