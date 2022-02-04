interface Url {
  _id: string;
  url: string;
  status: string;
}

export interface Job {
  _id: string;
  name: string;
  status: string;
  count: number;
  urls: Url[];
  createdAt: string;
}
