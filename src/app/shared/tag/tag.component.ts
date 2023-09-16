import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent implements OnInit {
  @Input() tagObj: any;
  @Input() currentTheme: string = '';
  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tagObj && changes.tagObj.currentValue) {
      // Update the tagObj value
      this.tagObj = changes.tagObj.currentValue;
    }
  }
}
