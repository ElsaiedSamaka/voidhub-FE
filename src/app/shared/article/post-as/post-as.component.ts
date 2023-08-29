import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-post-as',
  templateUrl: './post-as.component.html',
  styleUrls: ['./post-as.component.css'],
})
export class PostAsComponent implements OnInit {
  showPostAsPopOver: boolean = false;
  postAs;
  constructor(private dataService: DataService) {}

  ngOnInit() {}
  togglePostAs() {
    this.showPostAsPopOver = !this.showPostAsPopOver;
  }
  handlePostAsUser(): void {
    this.dataService.postAs.next('');
    console.log('handlePostAsUser');
  }
  handlePostAsAnonymous(): void {
    this.dataService.postAs.next(null);
    console.log('handlePostAsAnonymous');
  }
}
