// import AppController from "../controller/controller";
import { AppView } from "../view/appView";
import { data } from "../data";

class App {
  // controller: AppController;
  view: AppView;

  constructor() {
    // this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    this.view.drawProducts(data);

    this.view.drawFilters(data);

    this.view.drawSorting(data);
  }
}

export default App;
