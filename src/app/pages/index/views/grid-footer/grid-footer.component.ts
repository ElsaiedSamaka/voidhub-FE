import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-grid-footer',
  templateUrl: './grid-footer.component.html',
  styleUrls: ['./grid-footer.component.css'],
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
})
export class GridFooterComponent implements OnInit, OnChanges {
  @Input() data: any = {};
  currentPage: number = this.data['currentPage'];
  totalPages: number = this.data['totalPages'];
  totalItems: number = this.data['totalItems'];
  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();
  pages: number[] = [];
  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      let currentDataValue = changes['data'].currentValue;
      this.totalItems = currentDataValue.totalItems;
      this.totalPages = currentDataValue.totalPages;
      this.currentPage = currentDataValue.currentPage;
      this.pages = this.getPages(this.currentPage, this.totalPages);
    }
  }
  public onGoTo(page: number): void {
    console.log(`Page changed to ${page}`);
    this.currentPage = page;
    this.goTo.emit(page);
  }
  public onNext(): void {
    if (this.currentPage === this.totalPages) return;
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log('Next page', this.currentPage);
      this.next.emit(this.currentPage);
    }
  }
  public onPrevious(): void {
    if (this.currentPage === 0) return;
    if (this.currentPage >= 1) {
      this.currentPage--;
      console.log('Previous page', this.currentPage);
      this.previous.emit(this.currentPage);
    }
  }
  getPages(current: number, total: number): number[] {
    switch (true) {
      case total <= 7:
        console.log('1');
        return Array.from(Array(total).keys()).map((x) => ++x);

      case current > 5:
        if (current >= total - 4) {
          console.log('2');
          return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
        } else {
          console.log('3');
          return [1, -1, current - 1, current, current + 1, -1, total];
        }

      default:
        return [1, 2, 3, 4, 5, -1, total];
    }
  }
}
