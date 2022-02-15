import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IJob } from 'src/app/models/job';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  @Input() data: IJob;
  @Input() isOpen = false;
  @Input() urls: any[] = [];
  @Output() toggle: EventEmitter<string> = new EventEmitter<string>();
}
