import { Component, OnInit, Input } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() totalItems: number;
  totalPages: number;
  pages: number[];
  steps: number[];
  itemsPerPage: number;
  currentPage: number;

  constructor(private Job: JobService, private pagination: PaginationService) {}

  ngOnInit(): void {
    const { itemsPerPage, currentPage } = this.pagination.getCurrentPagination();
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
    this.pageNumber();
    this.createButtons();
  }

  pageNumber() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  createButtons() {
    if (this.totalPages > 10) {
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
      this.pagination.updatePagination(this.currentPage, this.itemsPerPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
    this.Job.getJobs(this.currentPage, this.itemsPerPage);
    this.pagination.updatePagination(this.currentPage, this.itemsPerPage);
  }

  getCurrentPage(page: number) {
    this.currentPage = page;
    this.Job.getJobs(page, this.itemsPerPage);
    this.pagination.updatePagination(page, this.itemsPerPage);
  }

  selectItemsPerPage(n: string) {
    this.itemsPerPage = parseInt(n, 10);
    this.currentPage = 1;
    this.Job.getJobs(this.currentPage, this.itemsPerPage);
    this.pagination.updatePagination(this.currentPage, this.itemsPerPage);
    this.pageNumber();
    this.createButtons();
  }
}
