const deliveryOptions = [{
  id: '1',
  days: 7,
  priceCents: 0
},
{
  id: '2',
  days: 3,
  priceCents: 499
},
{
  id: '3',
  days: 1,
  priceCents: 999
}];

    pageHtml += `
                <div class="delivery-option">
                  <input type="radio" data-type="radio"
                    data-option-id="${}"
                    ${}
                    class="delivery-option-input"
                    name="delivery-option-${}">
                  <div>
                    <div class="delivery-option-date">
                     ${}
                    </div>
                    <div class="delivery-option-price">
                     $${} - Shipping
                    </div>
                  </div>
                </div>
`
