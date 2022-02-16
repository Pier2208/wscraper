export interface IUrl {
  _id: string;
  url: string;
  status: string;
  statusCode?: number;
  responseTime?: number;
}

export interface IJob {
  _id: string;
  name: string;
  status: string;
  count: number;
  urls: IUrl[];
  createdAt: string;
  updatedAt: string;
}

export interface IJobs {
    count: number;
    jobs: IJob[];
}
