// Imports
import { cart } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCents } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';

// Functions

function calcOrderSummary() {

  const orderSummary = document.querySelector('.js-payment-summary');

  const itemQuantity = orderSummary.querySelector('.js-items-quantity');
  const totalItems = orderSummary.querySelector('.js-total-items');
  const totalShipping = orderSummary.querySelector('.js-total-shipping');
  const totalItemPlusShip = orderSummary.querySelector('.js-total-item-plus-ship');
  const totalTax = orderSummary.querySelector('.js-total-tax');
  const totalOrder = orderSummary.querySelector('.js-total-order');

  itemQuantity.innerHTML = calcItemQuantity();
  totalItems.innerHTML = formatCents(calcItemTotal());
  totalShipping.innerHTML = formatCents(calcShipping());
  totalItemPlusShip.innerHTML = formatCents(calcItemPlusShip());
  totalTax.innerHTML = formatCents(calcTax());
  totalOrder.innerHTML = formatCents(calcItemPlusShip() + calcTax());

}

// ================================ //

function calcItemQuantity() {

  let total = 0;

  cart.forEach(cartItem => total += cartItem.quantity);

  return total;

}

// ================================ //

function calcItemTotal() {

  let total = 0;

  cart.forEach(cartItem => {

    const item = products.find(product => cartItem.id === product.id);
    const totalItem = item.priceCents * cartItem.quantity;

    total += totalItem;
  })

  return total;

}

// ================================ //

function calcShipping() {

  let total = 0;

  cart.forEach(cartItem => {

    const deliveryOption = deliveryOptions.find(option => cartItem.deliveryOptionId === option.id);

    total += deliveryOption.priceCents;

  }) 

  return total;
}

// ================================ //

function calcItemPlusShip() {

  return calcItemTotal() + calcShipping();

}

// ================================ //

function calcTax() {

  const total = calcItemPlusShip();

  return total * 0.10;

}

// ================================ //

export { calcOrderSummary, calcItemQuantity, calcItemTotal, calcShipping };
