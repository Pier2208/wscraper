import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Url {
  _id: string;
  url: string;
  status: string;
}

interface IJobForm {
  title: string;
  urls: string;
}

interface JobResponse {
  _id: string;
  title: string;
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
    console.log('job', job)
    return this.http.post<JobResponse>(`${this.jobApi}/jobs`, job);
  }
}
