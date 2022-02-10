import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() totalItems?: number;
  totalPages: number;
  pages: number[];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.pageNumber();
    this.createButtons();
  }

  pageNumber() {
    if (this.totalItems)
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      console.log('tot', this.totalPages)
  }

  createButtons() {
    if (this.totalPages) {
      if (this.totalPages > 5) {
        this.pages = [1, 2, 3, this.totalPages];
      } else {
        this.pages = Array(this.totalPages)
          .fill(null)
          .map((_, i) => i + 1);
      }
    }
  }
}
