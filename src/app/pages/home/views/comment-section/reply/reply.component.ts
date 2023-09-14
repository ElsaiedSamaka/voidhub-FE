import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
})
export class ReplyComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() reply: any;
  constructor() {}

  ngOnInit() {}
}
