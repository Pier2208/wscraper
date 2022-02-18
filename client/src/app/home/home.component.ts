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
    // watch all jobs the user is currently on (every 5 seconds)
    this.jobsListener(() => {
      // get the current pagination settings...
      const { currentPage, itemsPerPage } = this.pagination.getCurrentPagination();
      // ...and get the corresponding jobs
      this.job.getJobs(currentPage, itemsPerPage);
    }, 5000);

    this.jobsSubscription = this.job
      .getJobUpdateEvent()
      .subscribe((data: IJobs) => {
        this.jobs = data.jobs;
        this.totalJobs = data.count;
      });
  }

  ngOnDestroy(): void {
    this.jobsSubscription?.unsubscribe();
  }

  /**
   * Run a function at regular intervals
   * @param {function} func - A function to run
   * @param {number} interval - Interval to run the func at
   */
  jobsListener(func: Function, interval: number) {
    func();
    return setInterval(func, interval);
  }
}
