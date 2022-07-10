// import AppController from "../controller/controller";
import { AppView } from "../view/appView";
import { data } from "../data";

class App {
  view: AppView = new AppView();

  start() {
    this.view.drawPage(data);
  }
}

export default App;
