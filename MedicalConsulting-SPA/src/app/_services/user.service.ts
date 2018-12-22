import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/message';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + 'Users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }


  getMessageThread(id: number) {
    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + 1);
  }

  getMessageThreadForAdmin(id: number) {
    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread');
  }

  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
  }

  sendMessageForUser(id: number, message: Message) {
    return this.http.post(this.baseUrl + 'users/' + id + '/messages/user', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
  }

  markAsRead(userId: number, messageId: number) {
    this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
      .subscribe();
  }
}
