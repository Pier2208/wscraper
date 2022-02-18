import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  private visible = false;
  private currentModal: string;

  constructor() {}

  isModalOpen() {
    return this.visible;
  }

  toggleModal() {
    this.visible = !this.visible;
  }

  currentModalId(id: string) {
    this.currentModal = id;
  }

  getModalId() {
    return this.currentModal;
  }
}
