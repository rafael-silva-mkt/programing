// Imports
import { cart } from '../../../data/cart.js';
import { products } from '../../../data/products.js';
import { generateDeliveryOptions, deliveryOptions } from './deliveryOptions.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';

// Exports
export { generateCheckoutHtml };

// Variables
let pageHtml = '';
const htmlContainer = document.querySelector('.js-order-summary');
const today = dayjs();
const checkoutQuantity = document.querySelector('.js-checkout-quantity');

// Functions
function generateCheckoutHtml() {

  checkoutQuantity.innerHTML = `${cart.updateCartQuantity()} items`;

  cart.cartItems.forEach(cartItem => {

    const getInfo = products.find(product => product.id === cartItem.id);

    const optionId = cartItem.deliveryOptionId;
    const days = deliveryOptions.find(option => option.id === optionId);
    const deliveryTime = today.add(days.days, 'days');
    const stringDelivery = deliveryTime.format('dddd, MMMM D');

    const id = getInfo.id;
    const image = getInfo.image;
    const name = getInfo.name;
    const price = getInfo.getPrice();
    const quantity = cartItem.quantity;

    pageHtml += `
            <div class="cart-item-container js-product-container" data-id="${id}">
              <div class="delivery-date">
                Delivery date: <span class="js-delivery-date">${stringDelivery}</span>
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
                 ${generateDeliveryOptions(cartItem, id)} 
                </div>
              </div>
            </div>
  `
  })

htmlContainer.innerHTML = pageHtml;
};
