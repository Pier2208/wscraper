import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { PanelComponent } from './panel/panel.component';

@Component({
  selector: 'app-accordion',
  template: '<ng-content></ng-content>',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  constructor(private job: JobService) {}

  ngAfterContentInit() {
    for (let panel of this.panels) {
      panel.toggle.subscribe((jobId) => {
        this.job.getOpenedJob(jobId).subscribe((data) => {
          console.log('urls', data.job.urls);
          this.openPanel(panel, data.job.urls);
        });
      });
    }
  }

  openPanel(panel: PanelComponent, data: any) {
    for (let panel of this.panels) {
      panel.isOpen = false;
    }
    panel.isOpen = true;
    panel.urls = data;
  }
}
