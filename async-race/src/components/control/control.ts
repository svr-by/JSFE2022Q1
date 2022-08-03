import { Button } from '../button/button';
import { Input } from '../input/input';

export class Control {
  elem: HTMLElement;
  inpTextCreate: Input;
  inpColorCreate: Input;
  btnCreate: Button;
  inpTextUpdate: Input;
  inpColorUpdate: Input;
  btnUpdate: Button;
  btnRace: Button;
  btnReset: Button;
  btnGenerate: Button;

  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('control');
    this.elem.innerHTML = `
      <h3 class="control__title">Control panel</h3>
      <div class="control__row" id="controlCreate"></div>
      <div class="control__row" id="controlUpdate"></div>
      <div class="control__row" id="controlRace"></div>
    `;
    this.inpTextCreate = new Input('text', 'inpTextCreate', ['control__input']);
    this.inpColorCreate = new Input('color', 'inpColorCreate', ['control__color']);
    this.btnCreate = new Button('Create', 'btnCreate', ['button', 'control__btn']);
    this.inpTextUpdate = new Input('text', 'inpTextUpdate', ['control__input']);
    this.inpColorUpdate = new Input('color', 'inpColorUpdate', ['control__color']);
    this.btnUpdate = new Button('Update', 'btnUpdate', ['button', 'control__btn']);
    this.btnRace = new Button('Race', 'btnRace', ['button', 'control__btn']);
    this.btnReset = new Button('Reset', 'btnReset', ['button', 'control__btn']);
    this.btnGenerate = new Button('Generate Cars', 'btnGenerate', ['button', 'control__btn']);
  }

  render = () => {
    const gargePage = document.querySelector('.garage-page');
    if (gargePage) gargePage.append(this.elem);
    this.inpTextCreate.appendToParent('#controlCreate');
    this.inpTextCreate.elem.placeholder = `Car's name`;
    this.inpColorCreate.appendToParent('#controlCreate');
    this.btnCreate.appendToParent('#controlCreate');
    this.inpTextUpdate.appendToParent('#controlUpdate');
    this.inpTextUpdate.elem.disabled = true;
    this.inpColorUpdate.appendToParent('#controlUpdate');
    this.inpColorUpdate.elem.disabled = true;
    this.btnUpdate.appendToParent('#controlUpdate');
    this.btnUpdate.elem.disabled = true;
    this.btnRace.appendToParent('#controlRace');
    this.btnRace.appendToParent('#controlRace');
    this.btnReset.appendToParent('#controlRace');
    this.btnReset.elem.disabled = true;
    this.btnGenerate.appendToParent('#controlRace');
  };
}
