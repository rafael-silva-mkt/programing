class Cart {

  constructor(key) {
    this.storageKey = key;
    this.cartItems = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    this.timechecker = new Map();
  };

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
  };

  saveCartLocal() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  };

  updateCartQuantity() {

    let cartQuantity = 0;

    this.cartItems.forEach(cartItem => cartQuantity += cartItem.quantity);

    return cartQuantity;

  };

  popUpMessage(container, id) {

    const messageContainer = container.querySelector('.js-container-message');

    const timer = this.timechecker.get(id);

    if(timer) {
      clearTimeout(timer);
    } else {
      messageContainer.classList.add('show');
    }

    const newTimer = setTimeout(() => {
      messageContainer.classList.remove('show');
      this.timechecker.delete(id);
    }, 2000)

    this.timechecker.set(id, newTimer);

  };

}

export const cart = new Cart('regular-cart');
