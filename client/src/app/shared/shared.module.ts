import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { LoaderComponent } from './loader/loader.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    LoaderComponent,
    PaginatorComponent,
    AccordionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularSvgIconModule.forRoot()
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    LoaderComponent,
    PaginatorComponent,
    AccordionComponent
  ]
})
export class SharedModule { }
