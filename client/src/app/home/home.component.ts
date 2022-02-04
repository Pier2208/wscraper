import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private job: JobService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  private getJobs() {
    this.job.getJobs().subscribe((jobs) => console.log(jobs));
  }
}
