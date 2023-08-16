import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-truncated-text',
  templateUrl: './truncated-text.component.html',
  styleUrls: ['./truncated-text.component.css'],
})
export class TruncatedTextComponent implements OnInit {
  text = `Day 07 of the challenge #100DaysOfCode I was wondering what I can do with #tailwindcss,
          so just started building Twitter UI using Tailwind and so far it looks so promising.
          I will post my code after completion. [07/100] #WomenWhoCode #CodeNewbie`;

  truncatedText: string;
  isTruncated: boolean;
  isExpanded: boolean;

  constructor() {
    this.truncateText();
  }
  ngOnInit(): void {}

  truncateText() {
    const words = this.text.split(' ');
    if (words.length > 12) {
      this.isTruncated = true;
      this.truncatedText = words.slice(0, 12).join(' ') + '...';
    } else {
      this.isTruncated = false;
      this.truncatedText = this.text;
    }
  }

  expandText() {
    this.isExpanded = true;
    this.truncatedText = this.text;
  }
}
