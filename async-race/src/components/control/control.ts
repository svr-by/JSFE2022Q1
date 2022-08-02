import { Button } from '../button/button';

export class Control {
  elem: HTMLElement;
  btnCreate: Button;
  btnUpdate: Button;
  btnRace: Button;
  btnReset: Button;
  btnGenerate: Button;

  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('control');
    this.elem.innerHTML = `
      <h3 class="control__title">Control panel</h3>
      <div class="control__row" id="controlCreate">
        <input type="text" class="control__input" placeholder="car's name">
        <input type="color" class="control__color">
      </div>
      <div class="control__row" id="controlUpdate">
        <input type="text" class="control__input" disabled>
        <input type="color" class="control__color" disabled>
      </div>
      <div class="control__row" id="controlRace">
      </div>
    `;
    this.btnCreate = new Button('Create', 'btnCreate', ['button', 'control__btn']);
    this.btnUpdate = new Button('Update', 'btnUpdate', ['button', 'control__btn']);
    this.btnUpdate.elem.disabled = true;
    this.btnRace = new Button('Race', 'btnRace', ['button', 'control__btn']);
    this.btnReset = new Button('Reset', 'btnReset', ['button', 'control__btn']);
    this.btnReset.elem.disabled = true;
    this.btnGenerate = new Button('Generate Cars', 'btnGenerate', ['button', 'control__btn']);
  }

  render = () => {
    const gargePage = document.querySelector('.garage-page');
    if (gargePage) gargePage.append(this.elem);
    this.btnCreate.appendToParent('#controlCreate');
    this.btnUpdate.appendToParent('#controlUpdate');
    this.btnRace.appendToParent('#controlRace');
    this.btnRace.appendToParent('#controlRace');
    this.btnReset.appendToParent('#controlRace');
    this.btnGenerate.appendToParent('#controlRace');
  };
}
