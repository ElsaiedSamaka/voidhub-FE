import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RepliesService {
  replies$ = new BehaviorSubject<any[]>([]);
  constructor(private apiService: ApiService) {}
  // getAll(id: string): Observable<any[]> {
  //   return this.apiService.get(`/api/posts/${id}/comments`).pipe(
  //     tap((comments) => {
  //       this.comments$.next(comments);
  //     })
  //   );
  // }
  getById(id: string): Observable<any> {
    return this.apiService.get(`/api/replies/${id}`);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/replies/${id}`).pipe(
      tap((deleteItem) => {
        let updatedItems = this.replies$.value.filter(
          (item) => item.id != deleteItem.id
        );
        this.replies$.next(updatedItems);
      })
    );
  }
  post(item: any): Observable<any> {
    return this.apiService.post('/api/replies', item).pipe(
      tap((addedItem) => {
        this.replies$.value.push(addedItem);
      })
    );
  }
  put(id: string, item: any): Observable<any> {
    return this.apiService.put(`/api/replies/${id}`, item).pipe(
      tap((updatedItem) => {
        const index = this.replies$.value.indexOf(id);
        this.replies$.value.splice(index, 1, updatedItem);
      })
    );
  }
}
