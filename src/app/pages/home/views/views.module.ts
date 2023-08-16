import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompanyCardComponent } from './company-card/company-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CompanyCardComponent],
  exports: [CompanyCardComponent],
})
export class ViewsModule {}
