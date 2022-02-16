import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { LoaderComponent } from './loader/loader.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PanelComponent } from './accordion/panel/panel.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';


@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    LoaderComponent,
    PaginatorComponent,
    AccordionComponent,
    PanelComponent,
    InfiniteScrollComponent,
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
    AccordionComponent,
    PanelComponent,
    InfiniteScrollComponent,
  ]
})
export class SharedModule { }
