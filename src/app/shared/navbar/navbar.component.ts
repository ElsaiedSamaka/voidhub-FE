import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() currentUser: any = null;
  constructor() {}

  ngOnInit() {
    console.log('user', this.currentUser);
  }
}
