import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts$ = new BehaviorSubject<any[]>([]);
  savedPosts$ = new BehaviorSubject<any[]>([]);
  lovedPosts$ = new BehaviorSubject<any[]>([]);
  currentPage = 0; // Current page of posts
  totalPages = 0; // Total number of pages
  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = new Observable<boolean>(); // Observable to emit loading state
  constructor(private apiService: ApiService) {
    this.loading$ = this.loadingSubject.asObservable();
  }
  getAll(): Observable<any[]> {
    return this.apiService.get(`/api/posts?page=${0}&size=${5}`).pipe(
      tap((response) => {
        const { rows: posts, totalPages, currentPage } = response;
        this.posts$.next(posts);
        this.totalPages = totalPages;
        this.currentPage = currentPage;
      })
    );
  }
  getMoreForyouPosts(): Observable<any[]> {
    this.loadingSubject.next(true); // Set loading state to true
    if (this.currentPage >= this.totalPages) {
      // No more pages to fetch
      // console.log('this.currentPage >= this.totalPages - 1');
      return of([]);
    }

    const nextPage = this.currentPage + 1;

    return this.apiService.get(`/api/posts?page=${nextPage}&size=5`).pipe(
      tap((response) => {
        const { rows: morePosts } = response;
        const currentPosts = this.posts$.value;
        this.posts$.next([...currentPosts, ...morePosts]);
        this.currentPage = nextPage;
        this.loadingSubject.next(false); // Set loading state to false
      })
    );
  }
  getMoreFollowingPosts(): Observable<any[]> {
    this.loadingSubject.next(true); // Set loading state to true
    if (this.currentPage >= this.totalPages) {
      // No more pages to fetch
      // console.log('this.currentPage >= this.totalPages - 1');
      return of([]);
    }

    const nextPage = this.currentPage + 1;

    return this.apiService
      .get(`/api/posts/following?page=${nextPage}&size=5`)
      .pipe(
        tap((response) => {
          const { rows: morePosts } = response;
          const currentPosts = this.posts$.value;
          this.posts$.next([...currentPosts, ...morePosts]);
          this.currentPage = nextPage;
          this.loadingSubject.next(false); // Set loading state to false
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
  save(id: string): Observable<any> {
    return this.apiService.post(`/api/posts/${id}/save`).pipe(
      tap((savedPost) => {
        this.savedPosts$.value.push(savedPost);
      })
    );
  }
  unsave(id: string): Observable<any> {
    return this.apiService.delete(`/api/posts/${id}/unsave`).pipe(
      tap((unsavedItem) => {
        let updatedItems = this.savedPosts$.value.filter(
          (item) => item.postId != unsavedItem.postId
        );
        this.savedPosts$.next(updatedItems);
      })
    );
  }
  getSaved(): Observable<any[]> {
    return this.apiService.get('/api/posts/user/saved-posts').pipe(
      tap((savedPosts) => {
        this.savedPosts$.next(savedPosts);
      })
    );
  }
  fav(id: string): Observable<any> {
    return this.apiService.post(`/api/posts/${id}/fav`).pipe(
      tap((lovedPost) => {
        this.lovedPosts$.value.push(lovedPost);
      })
    );
  }
  unfav(id: string): Observable<any> {
    return this.apiService.delete(`/api/posts/${id}/unfav`).pipe(
      tap((unlovedPost) => {
        let updatedItems = this.lovedPosts$.value.filter(
          (item) => item.postId != unlovedPost.postId
        );
        this.lovedPosts$.next(updatedItems);
      })
    );
  }
  // put(id: string, item: any): Observable<any> {
  //   return this.apiService.put(`/api/posts/${id}`, item).pipe(
  //     tap((updatedItem) => {
  //       const index = this.posts$.value.indexOf(id);
  //       this.posts$.value.splice(index, 1, updatedItem);
  //     })
  //   );
  // }
  getPostsByFollowing(): Observable<any[]> {
    return this.apiService.get(`/api/posts/following?page=${0}&size=${5}`).pipe(
      tap((response) => {
        const { rows: posts, totalPages, currentPage } = response;
        this.posts$.next(posts);
        this.totalPages = totalPages;
        this.currentPage = currentPage;
      })
    );
  }
}
