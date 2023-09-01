import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from 'src/core/services/socket.service';
import { LoadingService } from './shared/services/loading.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'VoidHub';
  loading$: Observable<boolean>;

  constructor(
    private loadingService: LoadingService,
    private themeService: ThemeService,
    private socketService: SocketService
  ) {
    this.loading$ = this.loadingService.loading$;
  }
  ngOnInit(): void {
    // this.dataService.subscribeToTheme();
    this.themeService.getCurrentTheme();
  }
}
