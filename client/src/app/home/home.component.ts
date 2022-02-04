import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { IJob } from '../models/job';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobs: IJob[] = [];
  totalJobs?: number;
  jobsPerPage: number = 5;
  currentPage: number = 1;
  loadingJobs: boolean = false;
  constructor(private job: JobService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  private getJobs() {
    this.loadingJobs = true;
    this.job.getJobs(this.currentPage, this.jobsPerPage).subscribe((data) => {
      this.jobs = data.jobs;
      this.totalJobs = data.count
      this.loadingJobs = false;
    });
  }

  deleteJob(jobId: string) {
    this.job.deleteJob(jobId).subscribe((res) => {
      if (res.success) {
        const updatedJobs = this.jobs.filter((job) => job._id !== jobId);
        this.jobs = updatedJobs;
      }
    });
  }
}
