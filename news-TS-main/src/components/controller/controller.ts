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
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                // highlights the active button in Sources
                if (this.activeSource !== undefined) {
                    this.activeSource.classList.remove('active');
                }
                target.classList.add('active');
                this.activeSource = target;
                // closes the list sources when one is selected
                (document.querySelector('.sources') as HTMLElement).classList.remove('active');
                const sourceBtn = document.querySelector('#sourceBtn') as HTMLElement;
                sourceBtn.classList.remove('active');
                // adds the name of the source to the filter button
                sourceBtn.textContent = `Sourses (${this.activeSource.getAttribute('data-source-id')})`;

                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId as string);
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
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
