import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Url {
  _id: string;
  url: string;
  status: string;
}

interface IJobForm {
  name: string;
  urls: string;
}

interface Job {
  _id: string;
  name: string;
  status: string;
  count: number;
  urls: Url[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobApi = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  createJob(job: IJobForm) {
    return this.http.post<Job>(`${this.jobApi}/jobs`, job);
  }

  getJobs() {
    return this.http.get<Job[]>(`${this.jobApi}/jobs`);
  }
}
