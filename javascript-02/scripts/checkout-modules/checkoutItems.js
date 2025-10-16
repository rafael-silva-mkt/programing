// Imports
import { cart } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../../scripts/utils/money.js';
import { generateDeliveryOptions } from './deliveryOptions.js';
import { buttons } from '../buttons.js';

// Variables
let pageHtml = '';
const htmlContainer = document.querySelector('.js-order-summary');

// Functions

export function generateCheckoutItems() {

cart.cartItems.forEach(cartItem => {

  const getInfo = products.find(product => product.id === cartItem.id);

  const id = getInfo.id;
  const image = getInfo.image;
  const name = getInfo.name;
  const price = formatCurrency(getInfo.priceCents);
  const quantity = cartItem.quantity;

  pageHtml += `
          <div class="cart-item-container js-product-container" data-id="${id}">
            <div class="delivery-date js-delivery-date">
              delivery date: Teste
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${name}
                </div>
                <div class="product-price">
                  $${price}
                </div>
                <div class="product-quantity">
                  <span>
                    quantity: <span class="quantity-label js-quantity-label">${quantity}</span>
                  </span>
                  <span class="update-quantity-link js-update-button link-primary" data-type="update">
                    update
                  </span>
                  <div class="js-input-container">
                    <input type="text" class="js-input-element">
                    <button type="button" data-type="save" class="js-save-button">save</button>
                  </div>
                  <span class="delete-quantity-link link-primary" data-type="delete">
                    delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  choose a delivery option:
                </div>
                ${generateDeliveryOptions(id)}
              </div>
            </div>
          </div>
`
});

htmlContainer.innerHTML = pageHtml;

}

export function getButtons() {

  document.querySelectorAll('.js-product-container').forEach(container => {

    container.addEventListener('click', (event) => {

      const {id} = container.dataset;
      const click = event.target;
      const button = click.dataset.type;
      const item = cart.cartItems.find(cartItem => cartItem.id === id);

      if(!button){
        return;
      }

      console.log(button);
      handleButtons(container, id, button, item);

    })

  });
};

function handleButtons(container, id, button, item) {

  if(button === 'update') {
    buttons.update(container);
  } else if (button === 'save') {
    buttons.save(container, item);
  } else if (button === 'delete') {

  } else if (button === 'radio') {

  }

}
