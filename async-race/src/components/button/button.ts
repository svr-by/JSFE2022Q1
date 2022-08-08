export class Button {
  elem: HTMLButtonElement;

  constructor(text: string, id?: string, classes?: string[]) {
    this.elem = document.createElement('button');
    this.elem.innerText = `${text}`;
    if (id) this.elem.id = id;
    if (classes) this.elem.classList.add(...classes);
  }

  appendToParent(selector: string) {
    const parent = document.querySelector(selector);
    if (parent) parent.appendChild(this.elem);
  }
}
