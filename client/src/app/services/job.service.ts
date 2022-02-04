import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJobs, IJob } from '../models/job';

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
    return this.http.post<IJob>(`${this.jobApi}/jobs`, job).subscribe({
      next: (data) => console.log('data', data),
      error: (err) => console.error('erreur', err),
    });
  }

  getJobs(currentPage: number, jobsPerPage: number) {
    const queryParams = `?page=${currentPage}&size=${jobsPerPage}`;
    return this.http.get<IJobs>(`${this.jobApi}/jobs${queryParams}`);
  }

  deleteJob(jobId: string) {
    return this.http.delete<{ success: boolean }>(
      `${this.jobApi}/jobs/${jobId}`
    );
  }
}
