import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css'],
})
export class SearchModalComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Output() dismiss = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
  }
  ngOnDestory() {
    this.el.nativeElement.remove();
  }
  onDismissClick() {
    this.dismiss.emit(false);
  }
}
