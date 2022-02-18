import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { UrlsComponent } from './urls/urls.component';

const routes: Routes = [
  {
    path: 'add-job',
    component: AddComponent,
  },
  {
    path: 'job/:id',
    component: UrlsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRoutingModule {}
