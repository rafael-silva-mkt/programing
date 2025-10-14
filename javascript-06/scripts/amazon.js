//  Imports 
import { products } from '../data/products.js';
import { addToCart, updateCartQuantity } from '../data/cart.js';

//  Variables
let pageHtml = '';
const htmlContainer = document.querySelector('.js-html-container');
const cartQuantity = document.querySelector('.js-cart-quantity');

//  Generating HTML

cartQuantity.innerHTML = updateCartQuantity();

products.forEach(product => {

  const id = product.id;
  const name = product.name;
  const image = product.image;
  const price = `$${(product.priceCents / 100)}`
  const stars = product.rating.stars * 10;
  const count = product.rating.count;

  pageHtml += `
        <div class="product-container js-product-container" data-id="${id}">
          <div class="product-image-container">
            <img class="product-image"
              src="${image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${stars}.png">
            <div class="product-rating-count link-primary">
              87
            </div>
          </div>

          <div class="product-price">
            ${price}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-quantity">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-container-message">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary"
            data-type="add-button">
            Add to Cart
          </button>
        </div>
`
htmlContainer.innerHTML = pageHtml;
})

//  Functions and Event Listeners

document.querySelectorAll('.js-product-container').forEach(container => {

  container.addEventListener('click', (event) => {

    const {id} = container.dataset;
    const click = event.target;
    const button = click.dataset.type;

    if(!button){
      return;
    }

    const selectElement = container.querySelector('.js-select-quantity');
    const quantity = Number(selectElement.value);

    addToCart(id, quantity);
    cartQuantity.innerHTML = updateCartQuantity();
    popUpMessage(container, id);
  })

})

const timercheck = new Map();

function popUpMessage(container, id) {

  const messageContainer = container.querySelector('.js-container-message');

  const timer = timercheck.get(id);

  if(timer) {
    clearTimeout(timer);
  } else {
    messageContainer.classList.add('show');
  }

  const newTimer = setTimeout(() => {
    messageContainer.classList.remove('show');
    timercheck.delete(id);
  }, 2000)

  timercheck.set(id, newTimer);
}
