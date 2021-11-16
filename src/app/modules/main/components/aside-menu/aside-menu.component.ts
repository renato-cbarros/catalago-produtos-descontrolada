import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  @Input() btnStatus!: boolean;

  constructor() {}

  ngOnInit(): void {
    this.btnStatus = true;
  }
}
