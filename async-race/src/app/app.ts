import { Header } from '../components/header/header';
import { Control } from '../components/control/control';
import { Garage } from '../components/garage/garage';
import { Footer } from '../components/footer/footer';
import { Winners } from '../components/winners/winners';

class App {
  header = new Header();
  control = new Control();
  garage = new Garage();
  footer = new Footer();
  winners = new Winners();

  start() {
    console.log('Hi!');
    this.render();
  }

  render() {
    document.body.innerHTML = `
    <main class="main">
      <div class="wrapper">
        <section class="garage-page"></section>
        <section class="winners-page"></section>
      </div>
    </main>
    `;
    this.header.render();
    this.control.render();
    this.garage.render();
    this.winners.render();
    this.footer.render();
  }
}

export default App;
