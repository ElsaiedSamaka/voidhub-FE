import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    // children: [
    //   // { path: '', component: HomeComponent },
    //   // { path: 'jobs' },
    //   // { path: 'companies', component: CompaniesComponent },
    //   // { path: 'messages', component: MessagesComponent },
    //   // { path: 'reading-list', component: ReadingListComponent },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
