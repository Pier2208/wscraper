import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private currentPage: number = 1;
  private itemsPerPage: number = 5;

  /**
   * Update the current pagination settings
   * @param {number} currentPage - The current page
   * @param {number} itemsPerPage - Number of items to display per page
   */
  updatePagination(currentPage: number, itemsPerPage: number) {
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
  }

  /**
   * Getter to retrieve the current pagination settings
   */
  getCurrentPagination() {
    return {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    };
  }
}
