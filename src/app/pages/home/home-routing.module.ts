import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleResolverService } from 'src/core/resolvers/article-resolver.service';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: ':id',
            component: BlogDetailsComponent,
            resolve: { article: ArticleResolverService },
          },
        ],
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('../home/components/jobs/jobs.module').then(
            (m) => m.JobsModule
          ),
      },
      { path: 'companies', component: CompaniesComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'reading-list', component: ReadingListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
