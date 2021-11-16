import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  result?: string;
  title?: string;
  text?: string;
  isBtn?: boolean;
  btnTextYes?: string;
  btnTextNo?: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    if (!this.data.isBtn) {
      setTimeout(() => {
        this.dialogRef.close(this.data.result === 'success' ? true : false);
      }, 2000);
    }
  }

  onYesClick = (): void => {
    if (this.dialogRef) {
      this.dialogRef.close(true);
    }
  };
  onNoClick = (): void => {
    if (this.dialogRef) {
      this.dialogRef.close(false);
    }
  };
}
