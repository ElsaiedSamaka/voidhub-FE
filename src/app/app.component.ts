import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'VoidHub';
  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
}
