import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../_models/post';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

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

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + 'dashboard/' + id);
  }


}
