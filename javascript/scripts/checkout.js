// Imports
import { cart, saveCartLocal, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCents } from './utils/money.js';
import { generateDeliveryOptions, handleRadioButton } from '../scripts/checkout-modules/deliveryTime.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { calcOrderSummary } from '../scripts/checkout-modules/orderSummary.js';

//  Variables

const today = dayjs();
let pageHtml = '';
const htmlContainer = document.querySelector('.js-order-summary');
const checkoutQuantity = document.querySelector('.js-checkout-quantity');

// Generating HTML
calcOrderSummary();

checkoutQuantity.innerHTML = `${updateCartQuantity()} items`;

cart.forEach(cartItem => {

  const getInfo = products.find(product => cartItem.id === product.id);

  const id = getInfo.id  
  const image = getInfo.image
  const name = getInfo.name
  const price = formatCents(getInfo.priceCents);
  const quantity = cartItem.quantity;

  const deliveryOption = deliveryOptions.find(option => cartItem.deliveryOptionId === option.id);
  const deliveryDate = today.add(deliveryOption.days, 'days');
  const deliveryString = deliveryDate.format('dddd, MMMM D');

  pageHtml += `
          <div class="cart-item-container js-product-container" data-id="${id}">
            <div class="delivery-date js-delivery-date">
              Delivery date: ${deliveryString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${name}
                </div>
                <div class="product-price">
                  ${price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label">${quantity}</span>
                  </span>
                  <span class="update-quantity-link js-update-button link-primary" data-type="update">
                    Update
                  </span>
                  <div class="js-input-container">
                    <input type="text" class="js-input-element">
                    <button type="button" data-type="save" class="js-save-button">Save</button>
                  </div>
                  <span class="delete-quantity-link link-primary" data-type="delete">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${generateDeliveryOptions(id)}
              </div>
            </div>
          </div>

` 
htmlContainer.innerHTML = pageHtml;
})

// ================================ //

document.querySelectorAll('.js-product-container').forEach(container => {

  container.addEventListener('click', (event) => {

    const {id} = container.dataset;
    const click = event.target;
    const button = click.dataset.type;

    if(!button){
      return;
    } else if(button === 'radio'){
      handleRadioButton(id, click, container);
      calcOrderSummary();
    }

    handleButtonEvent(button, id, container);

  })

})

// ================================ //

function handleButtonEvent(button, id, container) {

  const updateButton = container.querySelector('.js-update-button');
  const inputContainer = container.querySelector('.js-input-container');
  const item = cart.find(cartItem => cartItem.id === id);
 
  if(button === 'update') {

    updateButton.classList.add('hidden');
    inputContainer.classList.add('show');

  } else if(button === 'save') {

    const inputElement = container.querySelector('.js-input-element');
    const newQuantity = Number(inputElement.value);
    
    if(newQuantity <= 0){
      return;
    }

    item.quantity = newQuantity
     
    container.querySelector('.js-quantity-label').innerHTML = item.quantity;

    updateButton.classList.remove('hidden');
    inputContainer.classList.remove('show');

  } else if(button === 'delete') {
    
    cart.splice(cart.indexOf(item), 1);
    container.remove();

  }
  calcOrderSummary()
  saveCartLocal();
  checkoutQuantity.innerHTML = `${updateCartQuantity()} items`;
}
