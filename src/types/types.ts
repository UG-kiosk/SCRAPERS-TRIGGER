export interface EventPayload {
  name: string;
  url: string;
  content: string;
}

export interface NewsPayload {
  leadingPhoto: string;
  photos: string[];
  link: string;
  datetime: string;
  newsDetails: {
    title: string;
    shortBody: string;
    body: string;
  };
  source: string;
  category: string;
  sourceLanguage: string;
}
