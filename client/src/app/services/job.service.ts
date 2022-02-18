import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IJobs, IJob } from '../models/job';

interface IJobForm {
  name: string;
  urls: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobs: IJob[] = [];
  private updatedJobs = new Subject<IJobs>();

  private totalJobs: number;

  private jobApi = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  getJobUpdateEvent() {
    return this.updatedJobs.asObservable();
  }
  
  getJobs(currentPage: number, jobsPerPage: number) {
    const queryParams = `?page=${currentPage}&size=${jobsPerPage}`;
    this.http
      .get<IJobs>(`${this.jobApi}/jobs${queryParams}`)
      .subscribe((data) => {
        this.jobs = data.jobs;
        this.totalJobs = data.count;
        this.updatedJobs.next({ count: this.totalJobs, jobs: this.jobs });
      });
  }

  createJob(job: IJobForm) {
    return this.http
      .post<IJob>(`${this.jobApi}/jobs`, job)
      .subscribe((data) => {
        this.jobs = [data, ...this.jobs];
        ++this.totalJobs;
        this.updatedJobs.next({ count: this.totalJobs, jobs: this.jobs });
      });
  }

  deleteJob(jobId: string) {
    this.http
      .delete<{ success: boolean }>(`${this.jobApi}/jobs/${jobId}`)
      .subscribe((res) => {
        if (res.success) {
          this.jobs = this.jobs.filter((job) => job._id !== jobId);
          this.totalJobs--;
          this.updatedJobs.next({ count: this.totalJobs, jobs: this.jobs });
        }
      });
  }

  getCurrentJob(jobId: string) {
    return this.http.get<IJob>(`${this.jobApi}/jobs/${jobId}/urls`);
  }
}
