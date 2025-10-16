// Imports
import { cart } from '../../data/cart.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
import { formatCurrency } from '../utils/money.js';

// Variables
const deliveryOptions = [{
  id: '1',
  days: 7,
  priceCents: 0
},
{
  id: '2',
  days: 3,
  priceCents: 499
},
{
  id: '3',
  days: 1,
  priceCents: 999
}];

let pageHtml = '';
const today = dayjs();

// Functions

export function generateDeliveryOptions(id) {

  const item = cart.cartItems.find(cartItem => cartItem.id === id);
  pageHtml = '';
  deliveryOptions.forEach((option) => {

    const deliveryId = item.deliveryOptionId;
    const deliveryTime = today.add(option.days, 'days');
    const stringDelivery = deliveryTime.format('dddd, MMMM D');
    const deliveryPrice = formatCurrency(option.priceCents);

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
                     $${deliveryPrice} - Shipping
                    </div>
                  </div>
                </div>
`
})
  return pageHtml;
}
