import { Component, Input } from '@angular/core';
import { IJob, IUrl } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  @Input() data: IJob;
  isOpen = false;
  urls: IUrl[] = [];
  totalUrls: number;

  constructor(private job: JobService, public modal: ModalService) {}

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.job.getOpenedJob(this.data._id).subscribe((data) => {
        this.totalUrls = data.count;
        this.urls = data.urls;
      });
    } else {
      this.urls = [];
    }
  }

  onScroll() {
    console.log('Scrolling');
  }

  openModal() {
    this.modal.toggleModal();
  }
}
