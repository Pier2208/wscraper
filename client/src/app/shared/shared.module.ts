import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { LoaderComponent } from './loader/loader.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PanelComponent } from './panel/panel.component';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from '../services/modal.service';
import { AppRoutingModule } from '../app-routing.module';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';


@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    LoaderComponent,
    PaginatorComponent,
    PanelComponent,
    ModalComponent,
    InfiniteScrollComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularSvgIconModule.forRoot()
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    LoaderComponent,
    PaginatorComponent,
    PanelComponent,
    ModalComponent,
    InfiniteScrollComponent
  ],
  providers: [ModalService]
})
export class SharedModule { }
