import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.css'],
  standalone: true,
})
export class GridHeaderComponent implements OnInit {
  @Input() data: any = {};
  constructor() {}

  ngOnInit() {}
}
