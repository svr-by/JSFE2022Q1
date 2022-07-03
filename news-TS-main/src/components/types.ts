interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

interface DataSources {
    status: string;
    sources: Source[];
}

interface DataNews {
    status: string;
    totalResults: number;
    articles: Article[];
}

interface Data extends DataSources, DataNews {}

interface Options {
    apiKey: string;
    category: string;
    language: string;
    country: string;
    sources: string;
}

type LoaderOptions = Pick<Options, 'apiKey'>;

type PartialOptions = Partial<Options>;

type GetRespOptions = {
    endpoint: Endpoint;
    options?: PartialOptions;
};

type MakeUrlOptions = { [key: string]: string };

type Callback<T> = (data: T) => void;

type Method = 'GET' | 'POST';

type Endpoint = 'sources' | 'everything';

enum Status {
    Unauthorized = 401,
    NotFound = 404,
}

export {
    Article,
    Source,
    DataSources,
    DataNews,
    LoaderOptions,
    GetRespOptions,
    PartialOptions,
    MakeUrlOptions,
    Callback,
    Data,
    Status,
    Method,
    Endpoint,
};
