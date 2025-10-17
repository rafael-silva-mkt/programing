// Imports
import { products } from '../../../data/products.js';
import { cart } from '../../../data/cart.js';

// Exports
export { generateAmazonHtml };

// Variables
let pageHtml = '';
const htmlContainer = document.querySelector('.js-html-container');
const cartQuantity = document.querySelector('.js-cart-quantity');


// Functions
function generateAmazonHtml() {

  cartQuantity.innerHTML = cart.updateCartQuantity();

  products.forEach(product => {

    const id = product.id;
    const image = product.image;
    const name = product.name;
    const stars = product.getStarsUrl();
    const count = product.rating.count;
    const price = product.getPrice();

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
                  src="${stars}">
                <div class="product-rating-count link-primary">
                  ${count}
                </div>
              </div>

              <div class="product-price">
                $${price}
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
  });
  htmlContainer.innerHTML = pageHtml;
};

