import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() currentTheme: any = null;

  subProgramsTree: any[] = [
    {
      id: 1,
      path: 'index',
      label: 'Home',
    },
    {
      id: 2,
      path: 'companies',
      label: 'Companies',
    },
    {
      id: 3,
      path: 'jobs',
      label: 'Jobs',
    },
    {
      id: 4,
      path: 'messages',
      label: 'Messages',
    },
    {
      id: 5,
      path: 'reading-list',
      label: 'Reading list',
    },
  ];
  showSideBar: boolean = false;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.showSideBar.subscribe({
      next: (res) => {
        this.showSideBar = res;
      },
    });
  }
}
