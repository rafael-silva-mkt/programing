import { generateDeliveryOptions, today, handleRadioButton, handleDeliveryDay } from '../../../scripts/checkout-modules/deliveryTime.js';
import { cart } from '../../../data/cart.js';

describe('Test: generateDeliveryOptions', () => {

  beforeEach(() => {
    cart.splice(0, cart.length);
  });

  it('handles de delivery day that will appear to the customer', () => {

    const option = {
      id: '2',
      days: 3,
      priceCents: 499
    };

   expect(handleDeliveryDay(option)).toEqual(123);

  })

})
