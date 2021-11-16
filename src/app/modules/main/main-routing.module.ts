import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'produto',
        loadChildren: () =>
          import('src/app/modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      { path: '', redirectTo: 'produto', pathMatch: 'full' },
      { path: '**', redirectTo: 'produto' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
