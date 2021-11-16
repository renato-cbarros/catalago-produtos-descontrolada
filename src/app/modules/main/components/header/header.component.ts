import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // Aside-menu settings
  @Output() statusBtn: EventEmitter<boolean> = new EventEmitter();
  isBtnClicked = true;

  email = environment.EMAIL_LOJA;

  changeBtnStatus = (status: boolean): void => {
    this.isBtnClicked = status;
    this.statusBtn.emit(status);
  };
}
