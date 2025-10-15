import { calcOrderSummary, calcTax, calcItemPlusShip, calcItemQuantity, calcItemTotal, calcShipping } from '../../scripts/checkout-modules/orderSummary.js';
import { cart } from '../../data/cart.js';

describe('Test Suite: CalcItemQuantity', () => {

  beforeEach(() => {
    cart.splice(0, cart.length);

  })

  it('Returns zero if the cart is empty', () => {

    expect(calcItemQuantity()).toEqual(0);

  })

  it('Calculates the total quantity of items in the cart', () => {

    cart.push({
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 5,
      deliveryOptionId: '1'
    }, {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 10,
        deliveryOptionId: '1'
    })

    expect(calcItemQuantity()).toEqual(15);

  })

  afterEach(() => {
    cart.splice(0, cart.length);
  });

})

describe('Test Suite: calcItemTotal', () => {

  beforeEach(() => {
    cart.splice(0, cart.length);
  })

  it('Calculates the price of all items in the cart', () => {

    cart.push({
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }, {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
    })

    expect(calcItemTotal()).toEqual(3185);
  })

})

describe('Test Suite: calcShipping', () => {

  beforeEach(() => {
    cart.splice(0, cart.length);
  }) 

  it('Calculate the shipping price according to the DeliveryOptionId', () => {

    cart.push({
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }, {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
    })

    expect(calcShipping()).toEqual(499);
    
  })

})

describe('Test Suite: CalcItemPlusShip', () => {

  beforeEach(() => {
    cart.splice(0, cart.length);
  }) 

  it('Calculates the total amount items + shipping', () => {

    cart.push({
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }, {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
    })

  expect(calcItemPlusShip()).toEqual(3684);

  }) 

})

describe('Test Suite: CalcTax', () => {

  beforeEach(() => {
    cart.splice(0, cart.length);
  })

  it('Calculate de tax based in the calcItemPlusShip function', () => {

    cart.push({
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }, {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
    })

    expect(calcTax().toFixed(2)).toBeCloseTo(368.40, 2);

  })

})


