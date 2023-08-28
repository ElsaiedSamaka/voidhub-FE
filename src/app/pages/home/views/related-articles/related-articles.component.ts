import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-related-articles',
  templateUrl: './related-articles.component.html',
  styleUrls: ['./related-articles.component.css'],
})
export class RelatedArticlesComponent implements OnInit {
  @Input() currentTheme: string = '';

  constructor() {}

  ngOnInit() {}
}
