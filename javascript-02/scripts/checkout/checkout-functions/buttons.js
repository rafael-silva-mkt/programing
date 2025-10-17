//Imports
import { cart } from '../../../data/cart.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
import { deliveryOptions } from './deliveryOptions.js';
import { generatePaymentSummary } from '../order-summary/generateOrderSummary.js';

// Exports
export { handleButtons };

// Class
class Button {

  update(container){

    const updateButton = container.querySelector('.js-update-button');
    const inputContainer = container.querySelector('.js-input-container');

    updateButton.classList.add('hidden');
    inputContainer.classList.add('show');

  };

  save(container, item) {

    const updateButton = container.querySelector('.js-update-button');
    const inputContainer = container.querySelector('.js-input-container');
    const inputElement = container.querySelector('.js-input-element');
    const quantity = Number(inputElement.value);

    if(quantity <= 0) {
      return;
    }

    item.quantity = quantity;
    container.querySelector('.js-quantity-label').innerHTML = item.quantity;
    cart.saveCartLocal();
    generatePaymentSummary();
    checkoutQuantity.innerHTML = `${cart.updateCartQuantity()} items`;
    updateButton.classList.remove('hidden');
    inputContainer.classList.remove('show');
  };

  remove(container, item){

    cart.cartItems.splice(cart.cartItems.indexOf(item), 1);
    container.remove();

    generatePaymentSummary();
    checkoutQuantity.innerHTML = `${cart.updateCartQuantity()} items`;
    cart.saveCartLocal();
  }

  radio(container, item, click) {

    const {optionId} = click.dataset;
    const deliveryOption = deliveryOptions.find(option => optionId === option.id);
    const deliveryTime = today.add(deliveryOption.days, 'days');
    const stringDelivery = deliveryTime.format('dddd, MMMM D');
    const refDelivery = container.querySelector('.js-delivery-date');

    item.deliveryOptionId = optionId;

    cart.saveCartLocal();
    refDelivery.innerHTML = stringDelivery;
    generatePaymentSummary();
  }

};

// Variables
const buttons = new Button();
const today = dayjs();
const checkoutQuantity = document.querySelector('.js-checkout-quantity');

// Functions
function handleButtons() {

  document.querySelectorAll('.js-product-container').forEach(container => {

    container.addEventListener('click', (event) => {

      const {id} = container.dataset;
      const click = event.target;
      const button = click.dataset.type;
      const item = cart.cartItems.find(cartItem => cartItem.id === id);

      if(!button){
        return;
      }

      if(button === 'update') {

        buttons.update(container);

      } else if(button === 'save') {

        buttons.save(container, item);

      } else if(button === 'delete') {

        buttons.remove(container, item);

      } else if(button === 'radio') {

        buttons.radio(container, item, click);

      };

    })

  })

}

