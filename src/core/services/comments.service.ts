import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments$ = new BehaviorSubject<any[]>([]);
  constructor(private apiService: ApiService) {}
  getAll(id: string): Observable<any[]> {
    return this.apiService.get(`/api/posts/${id}/comments`).pipe(
      tap((comments) => {
        this.comments$.next(comments);
      })
    );
  }
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
  put(id: string, item: any): Observable<any> {
    return this.apiService.put(`/api/comments/${id}`, item).pipe(
      tap((updatedItem) => {
        const index = this.comments$.value.indexOf(id);
        this.comments$.value.splice(index, 1, updatedItem);
      })
    );
  }
}
