// Imports
import { deliveryOptions } from '../../data/deliveryOptions.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
import { formatCents } from '../utils/money.js';
import { cart, saveCartLocal } from '../../data/cart.js';

// Variables

const today = dayjs();

// Generating HTML

function generateDeliveryOptions(id, container) {

  let pageHtml = '';
  const item = cart.find(cartItem => cartItem.id === id);
  const deliveryId = item.deliveryOptionId;
  
  deliveryOptions.forEach(option => {

    const deliveryDay = handleDeliveryDay(option);
    const stringDelivery = deliveryDay.format('dddd, MMMM D');
    const deliveryPrice = option.priceCents === 0 ? 'FREE' : formatCents(option.priceCents);

    pageHtml += `
                <div class="delivery-option">
                  <input type="radio" data-type="radio"
                    data-option-id="${option.id}"
                    ${deliveryId === option.id ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${id}">
                  <div>
                    <div class="delivery-option-date">
                     ${stringDelivery}
                    </div>
                    <div class="delivery-option-price">
                     ${deliveryPrice} - Shipping
                    </div>
                  </div>
                </div>
    `
  })

  return pageHtml;
}

// ================================ //

function handleRadioButton(id, click, container){

  const item = cart.find(cartItem => cartItem.id === id);
  const {optionId} = click.dataset; 

  item.deliveryOptionId = optionId;

  const checkedOption = deliveryOptions.find(option => optionId === option.id)

  const deliveryTime = today.add(checkedOption.days, 'days');
  const stringDelivery = deliveryTime.format('dddd, MMMM D');

  container.querySelector('.js-delivery-date').innerHTML = `Delivery date: ${stringDelivery}`
 
  saveCartLocal();
}

// ================================ //

function handleDeliveryDay(option) {

  let days = option.days;
  let deliveryTime = today.add(days, 'days');
  let weekDay = deliveryTime.format('dddd');

  while(weekDay === 'Saturday' || weekDay === 'Sunday') {

    days++;
    deliveryTime = today.add(days, 'days')
    weekDay = deliveryTime.format('dddd');

  }

  return deliveryTime;
}

// ================================ //

export { generateDeliveryOptions, today, handleRadioButton, handleDeliveryDay };
