import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments$ = new BehaviorSubject<any[]>([]);
  constructor(private apiService: ApiService) {}
  // getAll(): Observable<any[]> {
  //   return this.apiService.get('/api/posts').pipe(
  //     tap((response) => {
  //       const { rows: posts } = response;
  //       this.posts$.next(posts);
  //     })
  //   );
  // }
  getById(id: string): Observable<any> {
    return this.apiService.get(`/api/comments/${id}`);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/comments/${id}`).pipe(
      tap((deleteItem) => {
        let updatedItems = this.comments$.value.filter(
          (item) => item.id != deleteItem.id
        );
        this.comments$.next(updatedItems);
      })
    );
  }
  post(item: any): Observable<any> {
    return this.apiService.post('/api/comments', item).pipe(
      tap((addedItem) => {
        this.comments$.value.push(addedItem);
      })
    );
  }
}