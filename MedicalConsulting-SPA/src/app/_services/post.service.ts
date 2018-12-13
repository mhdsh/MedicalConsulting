import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from '../_models/post';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addPost(post: Post) {
    return this.http.put(this.baseUrl + 'dashboard/add', post);
  }

  deletePost(id: number) {
    return this.http.delete(this.baseUrl + 'dashboard/' + id);
  }

  updatePost(id: number, post: Post) {
    return this.http.put(this.baseUrl + 'dashboard/' + id, post);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + 'dashboard');
  }

  getPostsForPagination(page?, itemsPerPage?): Observable<PaginatedResult<Post[]>> {
    const paginatedResult: PaginatedResult<Post[]> = new PaginatedResult<Post[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Post[]>(this.baseUrl + 'dashboard/pagination', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + 'dashboard/' + id);
  }


}
