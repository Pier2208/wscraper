import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { PanelComponent } from './panel/panel.component';

@Component({
  selector: 'app-accordion',
  template: '<ng-content></ng-content>',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  ngAfterContentInit() {
    for (let panel of this.panels) {
      panel.toggle.subscribe((jobId) => {
        console.log('job', jobId);
      });
    }
  }

  openPanel(panel: PanelComponent) {
    panel.isOpen = true;
  }
}
