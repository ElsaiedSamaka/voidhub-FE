import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // children: [
    //   { path: '', component: PlaceholderComponent },
    //   { path: 'not-found', component: NotFoundComponent },
    //   {
    //     path: ':id',
    //     component: DetailedComponent,
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingListRoutingModule {}
