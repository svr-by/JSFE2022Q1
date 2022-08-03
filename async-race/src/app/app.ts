import { header } from '../components/header/header';
import { control } from '../components/control/control';
import { footer } from '../components/footer/footer';
import { winners } from '../components/winners/winners';
import { services } from '../services/services';

class App {
  render = async () => {
    document.body.innerHTML = `
    <main class="main">
      <div class="wrapper">
        <section class="garage-page"></section>
        <section class="winners-page"></section>
      </div>
    </main>
    `;
    header.render();
    control.render();
    await services.updateGarage();
    winners.render();
    footer.render();
  };
}

export default App;
