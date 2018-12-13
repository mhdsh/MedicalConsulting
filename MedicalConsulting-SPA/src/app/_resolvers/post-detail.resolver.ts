import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostService } from '../_services/post.service';
import { Post } from '../_models/post';

@Injectable()
export class PostDetailResolver implements Resolve<Post> {
    constructor(private postService: PostService, private router: Router,
            private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Post> {
        return this.postService.getPost(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('مشكلة في جلب البيانات');
                this.router.navigate(['/dashboard/members']);
                return of(null);
            })
        );
    }
}
