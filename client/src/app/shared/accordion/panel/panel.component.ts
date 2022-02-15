import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/app/models/job';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  @Input() data: IJob;
}
