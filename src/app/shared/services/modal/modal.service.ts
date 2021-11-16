import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import {
  DialogData,
  ModalComponent,
} from '../../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openDialog = (data: DialogData): Observable<boolean> => {
    const dialogRef = this.dialog.open(ModalComponent, {
      data,
    });

    return dialogRef.afterClosed().pipe(take(1));
  };
}
