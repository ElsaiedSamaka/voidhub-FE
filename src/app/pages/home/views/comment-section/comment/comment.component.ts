import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() comment: any;

  constructor() {}

  ngOnInit() {}
}
