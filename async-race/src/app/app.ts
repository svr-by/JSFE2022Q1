import { header } from '../components/header/header';
import { control } from '../components/control/control';
import { footer } from '../components/footer/footer';
import { layoutService } from '../services/layoutService';

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
    await layoutService.updateGarage();
    footer.render();
    await layoutService.updateWinners();
  };
}

export default App;
