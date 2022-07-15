// import AppController from "../controller/controller";
import { AppView } from '../view/appView';
import { data } from '../data/data';

class App {
  view: AppView = new AppView();

  start() {
    this.view.createCatalog(data);
  }
}

export default App;
