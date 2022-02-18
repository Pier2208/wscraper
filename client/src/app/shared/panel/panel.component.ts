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
  urls: IUrl[] = [];

  constructor(private job: JobService, public modal: ModalService) {}

  openModal(id: string) {
    this.modal.toggleModal();
    this.modal.currentModalId(id)
  }

  deleteJob(jobId: string) {
    this.job.deleteJob(jobId)
  }
}
