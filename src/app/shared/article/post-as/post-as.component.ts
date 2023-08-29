import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-post-as',
  templateUrl: './post-as.component.html',
  styleUrls: ['./post-as.component.css'],
})
export class PostAsComponent implements OnInit {
  @Input() currentUser: any;
  @Input() currentTheme: string = '';

  showPostAsPopOver: boolean = false;
  postAs;
  constructor(private dataService: DataService) {}

  ngOnInit() {}
  togglePostAs() {
    this.showPostAsPopOver = !this.showPostAsPopOver;
  }
  handlePostAsUser(): void {
    this.dataService.isAnonymous$.next(false);
    this.dataService.isAnonymous$.subscribe((res) => {
      this.postAs = res;
    });
    this.togglePostAs();
  }
  handlePostAsAnonymous(): void {
    this.dataService.isAnonymous$.next(true);
    this.dataService.isAnonymous$.subscribe((res) => {
      this.postAs = res;
    });
    this.togglePostAs();
  }
}
