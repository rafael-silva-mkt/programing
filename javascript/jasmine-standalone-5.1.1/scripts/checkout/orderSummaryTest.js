import { calcOrderSummary, calcItemQuantity, calcItemTotal, calcShipping, calcTax,  } from '../../../scripts/checkout-modules/orderSummary.js';
import { cart } from '../../../data/cart.js';

describe('Test: calcOrderSummary', () => {

  beforeEach(() => {

    cart.splice(0, cart.length);

    cart.push({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      deliveryOptionId: '2'
    },
    {
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 2,
      deliveryOptionId: '3'
    });

  });

  it('calculates the total amount of items in the cart', () => {

    expect(calcItemQuantity()).toEqual(6);

  });

  it('calculate the total price of items in the cart', () => {

    expect(calcItemTotal()).toEqual(7968);
  });

  it('calculates the shipping based in the option the customer choosed', () => {

    expect(calcShipping()).toEqual(499 + 999);

  });

  it('calculates the total amount of tax to be paid based in the total order items + shipping', () => {

    expect(calcTax()).toEqual(946.60);

  })

})
