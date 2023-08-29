import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts$ = new BehaviorSubject<any[]>([]);
  constructor(private apiService: ApiService) {}
  getAll(): Observable<any[]> {
    return this.apiService.get('/api/posts').pipe(
      tap((response) => {
        const { rows: posts } = response;
        this.posts$.next(posts);
      })
    );
  }
  getById(id: string): Observable<any> {
    return this.apiService.get(`/api/posts/${id}`);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/posts/${id}`).pipe(
      tap((deleteItem) => {
        console.log('deleteItem', deleteItem);
        let updatedItems = this.posts$.value.filter(
          (item) => item.id != deleteItem.id
        );
        console.log('updatedItems', updatedItems);
        this.posts$.next(updatedItems);
      })
    );
  }
  post(item: any): Observable<any> {
    return this.apiService.post('/api/posts', item).pipe(
      tap((addedItem) => {
        this.posts$.value.push(addedItem);
      })
    );
  }
  save(id: string): Observable<any>{
    return this.apiService.post(`/api/posts/${id}/save`)
  }
  // put(id: string, item: any): Observable<any> {
  //   return this.apiService.put(`/api/posts/${id}`, item).pipe(
  //     tap((updatedItem) => {
  //       const index = this.posts$.value.indexOf(id);
  //       this.posts$.value.splice(index, 1, updatedItem);
  //     })
  //   );
  // }
}
