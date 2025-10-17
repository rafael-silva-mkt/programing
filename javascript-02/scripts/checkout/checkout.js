// Imports
import { generateCheckoutHtml } from './checkout-functions/checkoutItems.js';
import { handleButtons } from './checkout-functions/buttons.js';
import { generatePaymentSummary } from './order-summary/generateOrderSummary.js';

generateCheckoutHtml();
handleButtons();
generatePaymentSummary();
