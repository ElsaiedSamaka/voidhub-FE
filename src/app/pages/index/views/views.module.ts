import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GridActionsComponent } from './grid-actions/grid-actions.component';
import { GridFooterComponent } from './grid-footer/grid-footer.component';
import { GridHeaderComponent } from './grid-header/grid-header.component';
import { GridComponent } from './grid/grid.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GridComponent,
    TableComponent,
    GridHeaderComponent,
    GridActionsComponent,
    GridFooterComponent,
  ],
  declarations: [],
  exports: [
    GridComponent,
    TableComponent,
    GridHeaderComponent,
    GridActionsComponent,
    GridFooterComponent,
  ],
})
export class ViewsModule {}
