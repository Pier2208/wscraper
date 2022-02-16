import { Component, Input } from '@angular/core';
import { IJob, IUrl } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  @Input() data: IJob;
  isOpen = false;
  urls: IUrl[] = [];

  constructor(private job: JobService) {}

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.job.getOpenedJob(this.data._id).subscribe((data) => {
        console.log('data', data);
        this.urls = [...this.urls, ...data.urls];
      });
    }
  }

  onScroll() {
    console.log('Scrolling');
  }
}
