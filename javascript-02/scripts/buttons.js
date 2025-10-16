class Button {

  update(container) {
 
    const updateButton = container.querySelector('.js-update-button');
    const inputContainer = container.querySelector('.js-input-container');

    updateButton.classList.add('hidden');
    inputContainer.classList.add('show');
  };

  save(container, item) {

    const updateButton = container.querySelector('.js-update-button');
    const inputContainer = container.querySelector('.js-input-container');
    const inputElement = container.querySelector('.js-input-element');
    const quantity = Number(inputElement.value);

    if(quantity === 0) {
      return;
    }

    item.quantity = quantity;
    inputElement.value = '';
    updateButton.classList.remove('hidden');
    inputContainer.classList.remove('show');

    // Falta atualizar a quantidade dentro do container e salvar no localStorage;
  }

};

export const buttons = new Button();
