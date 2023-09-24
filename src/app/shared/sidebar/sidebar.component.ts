import { Component, Input, OnInit } from '@angular/core';
import { TagsService } from 'src/core/services/tags.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() currentTheme: any = null;
  tags: any[] = [];
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
  constructor(
    private dataService: DataService,
    private tagsService: TagsService
  ) {}

  ngOnInit() {
    this.dataService.showSideBar.subscribe({
      next: (showSideBar) => {
        console.log('showSideBar', showSideBar);
        this.showSideBar = showSideBar;
      },
    });
    this.getAllTags();
  }
  getAllTags(): void {
    this.tagsService.getAllTags().subscribe({
      next: (res) => {
        this.tags = res;
      },
      complete: () => {},
    });
  }
}
