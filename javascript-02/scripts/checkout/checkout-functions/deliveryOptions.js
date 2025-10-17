// Imports
import { cart } from '../../../data/cart.js';
import { formatCurrency } from '../../utils/money.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';

// Exports
export { generateDeliveryOptions, deliveryOptions };

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
function generateDeliveryOptions(cartItem, id) {

  pageHtml = '';
  const checked = cartItem.deliveryOptionId;

  deliveryOptions.forEach(option => {

    const deliveryTime = today.add(option.days, 'days');
    const stringDelivery = deliveryTime.format('dddd, MMMM D');
    const deliveryPrice = formatCurrency(option.priceCents);

    pageHtml += `
            <div class="delivery-option">
              <input type="radio" data-type="radio"
                data-option-id="${option.id}"
                ${checked === option.id ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${id}">
              <div>
                <div class="delivery-option-date js-string-delivery">
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
};
