import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  AfterContentInit,
} from '@angular/core';
import { IJob } from 'src/app/models/job';
import { PanelComponent } from './panel/panel.component';

@Component({
  selector: 'app-accordion',
  template: '<ng-content></ng-content>',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  ngAfterContentInit() {}
}
