import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { NewComponent } from './components/new/new.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'listar',
        component: ListComponent,
      },
      {
        path: 'listar/:id',
        component: NewComponent,
      },
      {
        path: 'novo',
        component: NewComponent,
      },
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      { path: '**', redirectTo: 'listar' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
