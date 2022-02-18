import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobService } from '../services/job.service';
import { PaginationService } from '../services/pagination.service';
import { IJobs, IJob } from '../models/job';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private jobsSubscription?: Subscription;
  jobs: IJob[];
  totalJobs: number;
  loadingJobs: boolean = false;

  constructor(private job: JobService, private pagination: PaginationService) {}

  ngOnInit(): void {
    this.jobsListener(() => {
      const { currentPage, itemsPerPage } = this.pagination.getCurrentPagination();
      this.job.getJobs(currentPage, itemsPerPage);
    }, 5000);
    this.jobsSubscription = this.job
      .getJobUpdateEvent()
      .subscribe((data: IJobs) => {
        this.jobs = data.jobs;
        this.totalJobs = data.count;
      });
  }

  jobsListener(func: Function, interval: number) {
    func();
    return setInterval(func, interval);
  }

  ngOnDestroy(): void {
    this.jobsSubscription?.unsubscribe();
  }

  deleteJob(jobId: string) {
    this.job.deleteJob(jobId);
  }
}
