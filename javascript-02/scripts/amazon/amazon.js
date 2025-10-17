// Imports
import { generateAmazonHtml } from './amazon-functions/generateAmazonHtml.js';
import { handleCartButton } from './amazon-functions/addCartButton.js';

// Generates HTML
generateAmazonHtml();

// Add event listener and calls addToCart();
handleCartButton();
