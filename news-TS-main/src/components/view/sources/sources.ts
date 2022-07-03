import './sources.css';
import { Source } from '../../types';

class Sources {
    // draw source buttons and language buttons
    draw(data: Source[]) {
        const fragmentSources = document.createDocumentFragment();
        const fragmentLangs = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        const languages: Set<string> = new Set();

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const langClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-lang', item.language);

            fragmentSources.append(sourceClone);

            if (!languages.has(item.language)) {
                (langClone.querySelector(
                    '.source__item-name'
                ) as HTMLElement).textContent = item.language.toLocaleUpperCase();
                (langClone.querySelector('.source__item') as HTMLElement).setAttribute('data-lang', item.language);
                languages.add(item.language);
                fragmentLangs.append(langClone);
            }
        });
        (document.querySelector('.sources') as HTMLElement).append(fragmentSources);
        (document.querySelector('.langs') as HTMLElement).append(fragmentLangs);
    }
}

export default Sources;
