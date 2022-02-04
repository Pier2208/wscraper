import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

interface Url {
  _id: string;
  url: string;
  status: string;
}

interface Job {
  _id: string;
  name: string;
  status: string;
  count: number;
  urls: Url[];
  createdAt: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobs: Job[] = [];
  constructor(private job: JobService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  private getJobs() {
    this.job.getJobs().subscribe((jobs) => console.log(jobs));
  }
}
