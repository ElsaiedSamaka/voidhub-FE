import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-grid-actions',
  templateUrl: './grid-actions.component.html',
  styleUrls: ['./grid-actions.component.css'],
  standalone: true,
  imports: [NgIf, SharedModule],
})
export class GridActionsComponent implements OnInit {
  @Output() viewAddModal = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}
  showAddUserModal() {
    this.viewAddModal.emit(true);
  }
}
