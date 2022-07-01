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

export { Article, Source, DataSources, DataNews };
