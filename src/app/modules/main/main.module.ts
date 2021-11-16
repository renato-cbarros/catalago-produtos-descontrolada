import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    AsideMenuComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
  ],
})
export class MainModule {}
