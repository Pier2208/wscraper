import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';
import { IJob } from 'src/app/models/job';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.scss'],
})
export class UrlsComponent implements OnInit {
  currentJob: IJob;

  constructor(private job: JobService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.job
      .getCurrentJob(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.currentJob = data;
        console.log('currentJob', data)
      });
  }
}
