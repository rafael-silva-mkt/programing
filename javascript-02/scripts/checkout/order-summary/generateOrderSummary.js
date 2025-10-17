// Imports
import { cart } from '../../../data/cart.js';
import { products } from '../../../data/products.js';
import { formatCurrency } from '../../utils/money.js';
import { deliveryOptions } from '../checkout-functions/deliveryOptions.js';

// Exports
export { generatePaymentSummary };

// Classes
class Calc {

  totalItems(){

    let total = 0;

    cart.cartItems.forEach(cartItem => {

      const getInfo = products.find(product => product.id === cartItem.id);
      const price = getInfo.priceCents;

      const totalItem = price * cartItem.quantity;

      total += totalItem;
    })
    return `${formatCurrency(total)}`;
  };

  totalShipping(){

    let total = 0;

    cart.cartItems.forEach(cartItem => {

      const optionId = cartItem.deliveryOptionId;
      const delivery = deliveryOptions.find(option => option.id === optionId);
      const deliveryPrice = delivery.priceCents;

      total += deliveryPrice;

    });
    return `${formatCurrency(total)}`;
  };

  totalItemsPlusShip(){

    const items = this.totalItems();
    const shipping = this.totalShipping();
    let total = Number(items) + Number(shipping);

    return total.toFixed(2);
  }

  totalTax() {

    const total = this.totalItemsPlusShip() * 0.10;

    return total.toFixed(2);
  }

  totalOrder() {

    const items = this.totalItemsPlusShip();
    const tax = items * 0.10;

    let total = Number(items) + Number(tax);

    return total.toFixed(2);
  }

}

// Variables
const container = document.querySelector('.js-payment-summary');

const itemsQuantity = container.querySelector('.js-items-quantity');
const itemsTotal = container.querySelector('.js-items-total');
const shippingTotal = container.querySelector('.js-shipping-total');
const itemsPlusShip = container.querySelector('.js-items-plus-shipping');
const totalTax = container.querySelector('.js-tax-total');
const totalOrder = container.querySelector('.js-order-total');
const calc = new Calc();

// Functions

function generatePaymentSummary() {

  itemsQuantity.innerHTML = cart.updateCartQuantity();
  itemsTotal.innerHTML = `$${calc.totalItems()}`;
  shippingTotal.innerHTML = `$${calc.totalShipping()}`;
  itemsPlusShip.innerHTML = `$${calc.totalItemsPlusShip()}`;
  totalTax.innerHTML = `$${calc.totalTax()}`;

  totalOrder.innerHTML = `$${calc.totalOrder()}`;

}
