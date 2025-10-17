// Imports
import { cart } from '../../../data/cart.js';

// Exports
export { handleCartButton };

// Variables
const cartQuantity = document.querySelector('.js-cart-quantity');

// Functions
function handleCartButton() {

  document.querySelectorAll('.js-product-container').forEach(container => {

    container.addEventListener('click', (event) => {

      const {id} = container.dataset;
      const click = event.target;
      const button = click.dataset.type;

      if(!button) {
        return;
      }

      cart.addToCart(container, id);
      cartQuantity.innerHTML = cart.updateCartQuantity();
      cart.popUpMessage(container, id);

    })

  })

}
