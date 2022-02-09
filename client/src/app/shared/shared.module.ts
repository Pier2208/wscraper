import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { LoaderComponent } from './loader/loader.component';
import { PaginatorComponent } from './paginator/paginator.component';


@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    LoaderComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    LoaderComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
