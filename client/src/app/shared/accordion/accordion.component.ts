import { Component, OnInit, Input } from '@angular/core';
import { IJob } from 'src/app/models/job';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input() data: IJob[];
  constructor() {}

  ngOnInit(): void {}
}
