import AppLoader from './appLoader';
import { Callback, DataSources, DataNews } from '../types';

class AppController extends AppLoader {
    // the field keeps a link to the active button in the sources list
    private activeSource: HTMLElement | undefined;

    getSources(callback: Callback<DataSources>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: Callback<DataNews>) {
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if ((target as HTMLElement).classList.contains('source__item')) {
                // highlights the active button in Sources
                if (this.activeSource !== undefined) {
                    this.activeSource.classList.remove('active');
                }
                (target as HTMLElement).classList.add('active');
                this.activeSource = target as HTMLElement;
                // closes the list sources when one is selected
                (document.querySelector('.sources') as HTMLElement).classList.remove('active');
                const sourceBtn = document.querySelector('#sourceBtn') as HTMLElement;
                sourceBtn.classList.remove('active');
                // adds the name of the source to the filter button
                sourceBtn.textContent = `Sourses (${this.activeSource.getAttribute('data-source-id')})`;

                const sourceId = (target as HTMLElement).getAttribute('data-source-id') as string;
                if ((newsContainer as HTMLElement).getAttribute('data-source') !== sourceId) {
                    (newsContainer as HTMLElement).setAttribute('data-source', sourceId as string);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = (target as HTMLElement).parentNode;
        }
    }
}

export default AppController;
