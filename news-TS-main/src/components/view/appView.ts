import News from './news/news';
import Sources from './sources/sources';
import { DataSources, DataNews } from '../types';

export class AppView {
    news: News;
    sources: Sources;
    // the field keeps a link to the active button in the languages list
    private activeLang: HTMLElement | undefined;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: DataNews) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: DataSources) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    // filters sources by selected language
    filterSources(e: Event) {
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if ((target as HTMLElement).classList.contains('source__item')) {
                const lang = (target as HTMLElement).getAttribute('data-lang') as string;
                const sources = Array.from((document.querySelector('.sources') as HTMLElement).children);
                const langBtn = document.querySelector('#langBtn') as HTMLElement;

                // if the selected language is clicked again, the filter is reset
                if (this.activeLang === target) {
                    sources.forEach((el) => {
                        (el as HTMLElement).style.display = 'block';
                    });
                    (target as HTMLElement).classList.remove('active');
                    this.activeLang = undefined;
                    langBtn.textContent = `Language`;
                } else {
                    // hide sources with a language that does not match the selected language
                    sources.forEach((el) => {
                        if ((el as HTMLElement).getAttribute('data-lang') !== lang) {
                            (el as HTMLElement).style.display = 'none';
                        } else {
                            (el as HTMLElement).style.display = 'block';
                        }
                    });
                    if (this.activeLang !== undefined) {
                        this.activeLang.classList.remove('active');
                    }
                    (target as HTMLElement).classList.add('active');
                    this.activeLang = target as HTMLElement;
                    // adds language to the filter button
                    langBtn.textContent = `Language (${lang})`;
                }
                return;
            }
            target = (target as HTMLElement).parentNode;
        }
    }

    // open and close the lists with sources or languages
    openList(e: Event) {
        let target = e.target;
        const newsContainer = e.currentTarget;
        while (target !== newsContainer) {
            if ((target as HTMLElement).classList.contains('filter__button')) {
                switch ((target as HTMLElement).id) {
                    case 'sourceBtn':
                        (document.querySelector('.sources') as HTMLElement).classList.toggle('active');
                        (document.querySelector('.langs') as HTMLElement).classList.remove('active');
                        (document.querySelector('#langBtn') as HTMLElement).classList.remove('active');
                        break;
                    case 'langBtn':
                        (document.querySelector('.langs') as HTMLElement).classList.toggle('active');
                        (document.querySelector('.sources') as HTMLElement).classList.remove('active');
                        (document.querySelector('#sourceBtn') as HTMLElement).classList.remove('active');
                        break;
                }
                (target as HTMLElement).classList.toggle('active');
            }
            target = (target as HTMLElement).parentNode;
        }
    }
}

export default AppView;
