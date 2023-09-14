import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-FYI-taps',
  templateUrl: './FYI-taps.component.html',
  styleUrls: ['./FYI-taps.component.css'],
})
export class FYITapsComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: any = null;
  selectedTap: string = 'For you';

  constructor() {}

  ngOnInit() {}
  selecteTap(tab: string): void {
    this.selectedTap = tab;
  }
}
