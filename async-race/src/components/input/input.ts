export class Input {
  elem: HTMLInputElement;

  constructor(type?: string, classes?: string[]) {
    this.elem = document.createElement('input');
    if (type) this.elem.setAttribute('type', `${type}`);
    if (classes) this.elem.classList.add(...classes);
  }

  appendToParent(selector: string) {
    const parent = document.querySelector(selector);
    if (parent) parent.appendChild(this.elem);
  }
}
