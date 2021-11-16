import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  statusBtn!: boolean;

  constructor() {}

  ngOnInit(): void {}

  listenStatusBtn = (event: boolean) => {
    this.statusBtn = event;
    console.log(event);
  };
}
