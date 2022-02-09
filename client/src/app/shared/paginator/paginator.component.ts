import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() totalPages: number = 1;
  pages: number[] = [];
  currentPage: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.createButtons();
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
}
