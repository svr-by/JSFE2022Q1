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

    const sort = document.querySelector("#sortParams") as HTMLSelectElement;
    sort.addEventListener("change", (e) => {
      const sortParams = (e.target as HTMLOptionElement).value;
      this.view.sortProducts(data, sortParams);
    });
  }
}

export default App;
