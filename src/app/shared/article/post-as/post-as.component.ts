import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-as',
  templateUrl: './post-as.component.html',
  styleUrls: ['./post-as.component.css'],
})
export class PostAsComponent implements OnInit {
  showPostAsPopOver: boolean = false;
  constructor() {}

  ngOnInit() {}
  togglePostAs() {
    this.showPostAsPopOver = !this.showPostAsPopOver;
  }
}
