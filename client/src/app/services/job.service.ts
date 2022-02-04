import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job';

interface IJobForm {
  name: string;
  urls: string;
}


@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobApi = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  createJob(job: IJobForm) {
    return this.http.post<Job>(`${this.jobApi}/jobs`, job).subscribe({
      next: (data) => console.log('data', data),
      error: (err) => console.error('erreur', err),
    });
  }

  getJobs() {
    return this.http.get<Job[]>(`${this.jobApi}/jobs`);
  }

  deleteJob(jobId: string) {
    return this.http.delete<{ success: boolean }>(
      `${this.jobApi}/jobs/${jobId}`
    );
  }
}
