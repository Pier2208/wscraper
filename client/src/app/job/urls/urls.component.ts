import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute } from '@angular/router';
import { IJob } from 'src/app/models/job';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.scss'],
})
export class UrlsComponent implements OnInit {
  currentJob: IJob;
  urlsPerPage: number = 5;
  page: number = 0;
  scrolled = 10;
  loading = false;

  constructor(
    private job: JobService,
    private modal: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.job
      .getCurrentJobUrls(this.route.snapshot.params['id'], this.scrolled)
      .subscribe((data) => {
        this.currentJob = data;
      });
  }

  openModal() {
    this.modal.toggleModal();
  }

  onScroll() {
    this.loading = true;
    this.scrolled = this.scrolled + 10;
    this.job
      .getCurrentJobUrls(this.route.snapshot.params['id'], this.scrolled)
      .subscribe((data) => {
        this.currentJob = data;
      });
    this.loading = false;
  }
}
