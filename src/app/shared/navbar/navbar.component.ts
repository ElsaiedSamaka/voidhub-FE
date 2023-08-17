import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() currentUser: any = null;
  showSideBar: boolean = true;
  constructor(private dataService: DataService) {}

  ngOnInit() {}
  toggleSideBar() {
    this.showSideBar = !this.showSideBar;
    this.dataService.showSideBar.next(this.showSideBar);
  }
}
