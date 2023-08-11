import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProductResolverService } from 'src/core/resolvers/product-resolver.service';
// import { AllProductsComponent } from './components/all-products/all-products.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
// import { NotFoundComponent } from './components/not-found/not-found.component';
// import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'companies', component: CompaniesComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'reading-list', component: ReadingListComponent },
    ],
  },
  // {
  //   // path: 'jobs',
  //   // component: AllProductsComponent,
  // },
  // {
  //   path: 'not-found',
  //   // component: NotFoundComponent,
  // },
  // {
  //   path: ':id',
  //   // component: ProductDetailsComponent,
  //   // resolve: { product: ProductResolverService },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
