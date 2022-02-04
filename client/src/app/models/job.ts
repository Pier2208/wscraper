interface IUrl {
  _id: string;
  url: string;
  status: string;
}

export interface IJob {
  _id: string;
  name: string;
  status: string;
  count: number;
  urls: IUrl[];
  createdAt: string;
}

export interface IJobs {
    count: number;
    jobs: IJob[];
}
