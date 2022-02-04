import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { JobRoutingModule } from './job-routing.module';
import { AddComponent } from './add/add.component';
import { SharedModule } from '../shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CreateJobFormComponent } from './create-job-form/create-job-form.component';


@NgModule({
  declarations: [
    AddComponent,
    CreateJobFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    JobRoutingModule,
    ReactiveFormsModule,
    AngularSvgIconModule
  ]
})
export class JobModule { }