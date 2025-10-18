// Imports
import { cart } from '../../data/cart.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
import { formatCurrency } from '../utils/money.js';

// Export
export { deliveryData, generateDeliveryHtml };

// Class
class Delivery {

  constructor(data) {
    this.id = data.id;
    this.days = data.days;
    this.priceCents = data.priceCents;
  };

  stringDelivery() {

    const deliveryTime = today.add(this.days, 'days');
    const stringDelivery = deliveryTime.format('dddd, MMMM D');

    return stringDelivery;

  };

  formatPrice(price) {

    return (formatCurrency(this.priceCents));

  };

  handleRadio(container, id) {

    const delivery = container.querySelector('.js-delivery-string');
    delivery.innerHTML = this.stringDelivery();

  }

}

// Variables
const today = dayjs();
let pageHtml = '';
const deliveryData = [{
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
}].map(data => new Delivery(data));

// Functions
function generateDeliveryHtml(id) {

  pageHtml = '';
  const item = cart.cartItems.find(cartItem => cartItem.id === id);
  const checked = item.deliveryOptionsId;

  deliveryData.forEach(option => {

    const stringDelivery = option.stringDelivery();
    const shippingPrice = option.priceCents === 0 ? 'FREE' : '$' + option.formatPrice();

    pageHtml += `
                    <div class="delivery-option">
                      <input type="radio" data-type="radio"
                        data-radio-id="${option.id}"
                        ${checked === option.id ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${id}">
                      <div>
                        <div class="delivery-option-date">
                         ${stringDelivery}
                        </div>
                        <div class="delivery-option-price">
                          ${shippingPrice} Shipping
                        </div>
                      </div>
                    </div>
    `
  })
  return pageHtml;
}

