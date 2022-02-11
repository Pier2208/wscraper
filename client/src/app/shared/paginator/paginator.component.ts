import { Component, OnInit, Input } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() totalItems: number;
  totalPages: number;
  pages: number[];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(private Job: JobService) {}

  ngOnInit(): void {
    this.pageNumber();
    this.createButtons();
  }

  pageNumber() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  createButtons() {
    if (this.totalPages > 5) {
      this.pages = [1, 2, 3, this.totalPages];
    } else {
      this.pages = Array(this.totalPages)
        .fill(null)
        .map((_, i) => i + 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.Job.getJobs(this.currentPage, this.itemsPerPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
    this.Job.getJobs(this.currentPage, this.itemsPerPage);
  }

  getCurrentPage(page: number) {
    this.currentPage = page;
    this.Job.getJobs(page, this.itemsPerPage);
  }

  selectItemsPerPage(n: string) {
    this.itemsPerPage = parseInt(n, 10);
    this.currentPage = 1;
    this.Job.getJobs(this.currentPage, this.itemsPerPage);
    this.pageNumber();
    this.createButtons();
  }
}
