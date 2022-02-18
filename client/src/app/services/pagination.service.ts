import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  itemsPerPage: number = 5;
  currentPage: number = 1;

  update(currentPage: number, itemsPerPage: number) {
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
  }

  getCurrentPagination() {
    return {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    };
  }
}
