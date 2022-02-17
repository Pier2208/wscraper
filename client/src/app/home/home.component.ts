import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobService } from '../services/job.service';
import { IJobs, IJob } from '../models/job';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private jobsPerPage: number = 5;
  private currentPage: number = 1;
  private jobsSubscription?: Subscription;
  private realTimeSubscription?: Subscription;
  jobs: IJob[];
  totalJobs: number;
  loadingJobs: boolean = false;

  constructor(private job: JobService) {}

  ngOnInit(): void {
    this.job.getJobs(this.currentPage, this.jobsPerPage);
    this.jobsSubscription = this.job
      .getJobUpdateEvent()
      .subscribe((data: IJobs) => {
        this.jobs = data.jobs;
        this.totalJobs = data.count;
      });
    this.realTimeSubscription = this.job.getRealTimeUpdate();
  }

  ngOnDestroy(): void {
    this.jobsSubscription?.unsubscribe();
    this.realTimeSubscription?.unsubscribe();
  }

  deleteJob(jobId: string) {
    this.job.deleteJob(jobId);
  }
}
