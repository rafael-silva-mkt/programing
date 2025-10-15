import  { addToCart, cart } from '../../data/cart.js';

describe('Teste Suite: addToCart', () => {

  console.log(cart);
 
  it('adds a new product to the cart', () => {


    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);

    expect(cart.length).toEqual(1);

  })
})
