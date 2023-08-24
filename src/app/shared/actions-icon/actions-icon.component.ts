import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actions-icon',
  templateUrl: './actions-icon.component.html',
  styleUrls: ['./actions-icon.component.css'],
})
export class ActionsIconComponent implements OnInit {
  showActionsDDL: boolean = false;
  constructor() {}

  ngOnInit() {}
  handleActions(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = !this.showActionsDDL;
    console.log('clicked');
  }
}
