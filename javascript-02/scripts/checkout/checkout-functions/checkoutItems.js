
  pageHtml += `
          <div class="cart-item-container js-product-container" data-id="${id}">
            <div class="delivery-date js-delivery-date">
              delivery date: Teste
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${}
                </div>
                <div class="product-price">
                  $${}
                </div>
                <div class="product-quantity">
                  <span>
                    quantity: <span class="quantity-label js-quantity-label">${}</span>
                  </span>
                  <span class="update-quantity-link js-update-button link-primary" data-type="update">
                    update
                  </span>
                  <div class="js-input-container">
                    <input type="text" class="js-input-element">
                    <button type="button" data-type="save" class="js-save-button">save</button>
                  </div>
                  <span class="delete-quantity-link link-primary" data-type="delete">
                    delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  choose a delivery option:
                </div>
              </div>
            </div>
          </div>
`
});

