export interface Article {
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

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface DataSources {
    status: string;
    sources: Source[];
}

export interface DataNews {
    status: string;
    totalResults: number;
    articles: Article[];
}

export type Data = DataSources & DataNews;

export interface Options {
    apiKey: string;
    category: string;
    language: string;
    country: string;
    sources: string;
}

export type GetRespOptions = {
    endpoint: Endpoint;
    options?: Partial<Options>;
};

export type MakeUrlOptions = Record<keyof Options, string>;

export type Callback<T> = (data: T) => void;

export type Method = 'GET' | 'POST';

export type Endpoint = 'sources' | 'everything';

export enum Status {
    Unauthorized = 401,
    NotFound = 404,
}
