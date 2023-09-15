import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css'],
})
export class SearchModalComponent implements OnInit {
  @Input() currentTheme: string = '';
  constructor() {}

  ngOnInit() {}
}
