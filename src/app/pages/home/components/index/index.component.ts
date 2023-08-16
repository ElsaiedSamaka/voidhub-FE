import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  currentUser: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe({
      next: (currentUser) => {
        this.currentUser = currentUser;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
}
