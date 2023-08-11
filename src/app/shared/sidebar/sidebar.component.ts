import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
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
  constructor() {}

  ngOnInit() {}
}
