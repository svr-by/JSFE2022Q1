export class Header {
  elem = document.createElement('header');

  render = () => {
    this.elem.classList.add('header');
    this.elem.innerHTML = `
      <div class="wrapper header__wrapper">
        <a href="javascript:void(0)">
          <div class="logo">
            <img src="assets/img/logo.png" alt="Logo" class="logo__img">
          </div>
        </a>
        <nav class="nav">
          <button class="button">To garage</button>
          <button class="button">To winners</button>
        </nav>
      </div>
    `;
    document.body.prepend(this.elem);
  };
}
