import { Button } from '../button/button';

export class Pagination {
  elem: HTMLDivElement;
  btnPrev: Button;
  btnNext: Button;

  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('pagination');
    this.btnPrev = new Button('Prev', undefined, ['button']);
    this.btnPrev.elem.disabled = true;
    this.elem.append(this.btnPrev.elem);
    this.btnNext = new Button('Next', undefined, ['button']);
    this.btnNext.elem.disabled = true;
    this.elem.append(this.btnNext.elem);
  }
}
