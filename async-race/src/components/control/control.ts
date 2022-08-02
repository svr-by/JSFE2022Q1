export class Control {
  elem = document.createElement('div');

  render = () => {
    this.elem.classList.add('control');
    this.elem.innerHTML = `
      <h3 class="control__title">Control panel</h3>
      <div class="control__row">
        <input type="text" class="control__input" placeholder="car's name">
        <input type="color" class="control__color">
        <button class="button control__btn">Create</button>
      </div>
      <div class="control__row">
        <input type="text" class="control__input" disabled>
        <input type="color" class="control__color" disabled>
        <button class="button control__btn" disabled>Update</button>
      </div>
      <div class="control__row">
        <button class="button control__btn">Race</button>
        <button class="button control__btn" disabled>Reset</button>
        <button class="button control__btn">Generate Cars</button>
      </div>
    `;
    const gargePage = document.querySelector('.garage-page');
    if (gargePage) gargePage.append(this.elem);
  };
}
