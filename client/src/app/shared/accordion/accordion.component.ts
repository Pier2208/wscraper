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
        if (!panel.isOpen) {
          this.job.getOpenedJob(jobId).subscribe((data) => {
            this.togglePanel(panel);
            this.fetchUrls(panel, data);
          });
        } else {
          this.togglePanel(panel);
        }
      });
    }
  }

  togglePanel(panel: PanelComponent) {
    panel.isOpen = !panel.isOpen;
  }

  fetchUrls(panel: PanelComponent, data: any) {
    panel.urls = data.job.urls;
  }
}
