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
  scrolled = 15;
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

  openModal(id: string) {
    this.modal.toggleModal();
    this.modal.currentModalId(id);
  }

  openLink(link: string){
    window.open(link)
  }

  onScroll() {
    this.loading = true;
    this.scrolled = this.scrolled + 15;
    this.job
      .getCurrentJobUrls(this.route.snapshot.params['id'], this.scrolled)
      .subscribe((data) => {
        this.currentJob = {
          ...this.currentJob,
          urls: [...this.currentJob.urls, ...data.urls],
        };
      });
    this.loading = false;
  }
}
