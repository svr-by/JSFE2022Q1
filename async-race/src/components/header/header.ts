import { Button } from '../button/button';
import { state } from '../../state/state';
import { layoutService } from '../../services/layoutService';

class Header {
  elem: HTMLElement;
  btnGarage: Button;
  btnWinners: Button;

  constructor() {
    this.elem = document.createElement('header');
    this.elem.classList.add('header');
    this.btnGarage = new Button('To garage', ['button']);
    this.btnWinners = new Button('To winners', ['button']);
  }

  render() {
    this.elem.innerHTML = `
      <div class="wrapper header__wrapper">
        <a href="javascript:void(0)">
          <div class="logo">
            <img src="assets/img/logo.png" alt="Logo" class="logo__img">
          </div>
        </a>
        <nav class="nav"></nav>
      </div>
    `;
    document.body.prepend(this.elem);
    this.btnGarage.appendToParent('.nav');
    this.btnWinners.appendToParent('.nav');
    this.addListeners();
  }

  private addListeners() {
    const garagePage = document.querySelector('.garage-page') as HTMLElement;
    const winnersPage = document.querySelector('.winners-page') as HTMLElement;

    this.btnGarage.elem.addEventListener('click', () => {
      state.view = 'garage';
      winnersPage.style.display = 'none';
      garagePage.style.display = 'block';
    });

    this.btnWinners.elem.addEventListener('click', async () => {
      state.view = 'winners';
      await layoutService.updateWinners();
      winnersPage.style.display = 'block';
      garagePage.style.display = 'none';
    });
  }
}

export const header = new Header();
