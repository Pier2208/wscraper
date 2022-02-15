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
  // get all the children components within the current accordion view
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  constructor(private job: JobService) {}

  ngAfterContentInit() {
    // listen to any view changes because the QueryList might change with the pagination
    this.panels.changes.subscribe((panels: QueryList<PanelComponent>) => {
      // for each panel listen to a click event that emits the jobId
      for (let panel of panels) {
        panel.toggle.subscribe((jobId: string) => {
          if (!panel.isOpen) {
            // fetch the urls as soon as the panel opens
            this.job.getOpenedJob(jobId).subscribe((data) => {
              this.togglePanel(panel);
              this.fetchUrls(panel, data);
            });
          } else {
            this.togglePanel(panel);
          }
        });
      }
    });
  }

  togglePanel(panel: PanelComponent) {
    panel.isOpen = !panel.isOpen;
  }

  fetchUrls(panel: PanelComponent, data: any) {
    panel.urls = data.job.urls;
    console.log('urls', panel.urls);
  }
}
