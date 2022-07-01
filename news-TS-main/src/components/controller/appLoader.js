import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'bba3a4b205b04fac85cd330751b08cbb',
        });
    }
}

export default AppLoader;
