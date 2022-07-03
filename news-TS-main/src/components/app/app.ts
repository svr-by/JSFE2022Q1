import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );
        (document.querySelector('.langs') as HTMLElement).addEventListener('click', (e) => this.view.filterSources(e));
        (document.querySelector('.filter') as HTMLElement).addEventListener('click', (e) => this.view.openList(e));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
