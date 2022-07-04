import { GetRespOptions, Options, MakeUrlOptions, Callback, Data, Status, Method, Endpoint } from '../types';

class Loader {
    baseLink: string;
    options: Partial<Options>;

    constructor(baseLink: string, options: Partial<Options>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: GetRespOptions,
        callback: Callback<Data> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === Status.Unauthorized || res.status === Status.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<Options>, endpoint: Endpoint) {
        const urlOptions: Partial<MakeUrlOptions> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof MakeUrlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: Method, endpoint: Endpoint, callback: Callback<Data>, options: Partial<Options> = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: Readonly<Data>) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
