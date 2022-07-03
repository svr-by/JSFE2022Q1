import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'c81c583ce72c4eb68ecb94dc0a5ddaa1',
        });
    }
}

export default AppLoader;
