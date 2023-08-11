import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, HomeRoutingModule],
  declarations: [IndexComponent, HomeComponent],
})
export class HomeModule {}
