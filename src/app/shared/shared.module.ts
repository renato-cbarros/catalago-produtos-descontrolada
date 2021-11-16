import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from './services/modal/modal.service';

import { ModalComponent } from './components/modal/modal.component';
import { HandlerFormErrorComponent } from './components/handlerFormError/handlerFormError.component';
@NgModule({
  declarations: [ModalComponent, HandlerFormErrorComponent],
  imports: [
    CommonModule,

    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    ModalService,
  ],
  exports: [ModalComponent, HandlerFormErrorComponent],
})
export class SharedModule {}
