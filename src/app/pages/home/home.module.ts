import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleResolverService } from 'src/core/resolvers/article-resolver.service';
import { CompaniesComponent } from './components/companies/companies.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { HomeRoutingModule } from './home-routing.module';
import { ViewsModule } from './views/views.module';

@NgModule({
  imports: [CommonModule, SharedModule, ViewsModule, HomeRoutingModule],
  declarations: [IndexComponent, HomeComponent, CompaniesComponent],
  providers: [ArticleResolverService],
})
export class HomeModule {}
