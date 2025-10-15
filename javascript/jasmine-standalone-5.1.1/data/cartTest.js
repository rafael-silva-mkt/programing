import { addToCart, saveCartLocal, cart, updateCartQuantity } from '../../data/cart.js';

describe('Test: addToCart', () => {

  beforeEach(() => {

    cart.splice(0, cart.length);
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([])
    });
    spyOn(localStorage, 'setItem');

  })

  it('incrases the quantity of a existing product in the cart', () => {

    cart.push({
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '1'
    }) 

    addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d", 1);
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  })

  it('adds a product to the cart', () => {

    addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d", 1);
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  })

})

describe('Test: updateCartQuantity', () => {

  beforeEach(() => {
    cart.splice(0, cart.length);
  })

  it('updates the total amount of items in the cart', () => {

    cart.push({
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '1'
    },
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
      quantity: 3,
      deliveryOptionId: '1'
    });

    expect(updateCartQuantity()).toEqual(4);

  })

})

describe('Test: saveCartLocal', () => {

  beforeEach(() => {
    cart.splice(0, cart.length);
    spyOn(localStorage, 'setItem');
  })

  it('saves the cart in local storage', () => {

    saveCartLocal();

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  })

})
