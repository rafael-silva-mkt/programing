class Cart{

  #localStorageKey;
  cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
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
  };

  saveCartLocal() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  };

  updateCartQuantity() {

    let cartQuantity = 0;

    this.cartItems.forEach(cartItem => cartQuantity += cartItem.quantity);

    return cartQuantity;
  };

}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
