import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobs: Job[] = [];
  loadingJobs: boolean = false;
  constructor(private job: JobService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  private getJobs() {
    this.loadingJobs = true;
    this.job.getJobs().subscribe((jobs) => {
      console.log('jobs', jobs);
      this.jobs = jobs;
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
