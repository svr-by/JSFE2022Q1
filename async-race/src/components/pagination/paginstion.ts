export class Pagination {
  elem: HTMLDivElement;

  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('pagination');
    this.elem.innerHTML = `
      <button class="button" disabled>Prev</button>
      <button class="button" disabled>Next</button>
    `;
  }
}
