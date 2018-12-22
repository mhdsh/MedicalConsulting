import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../_models/post';
import { PostService } from '../_services/post.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class PostsHomeResolver implements Resolve<Post[]> {
    pageNumber = 1;
    pageSize = 10;
    constructor(private postService: PostService, private router: Router,
            private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {
        return this.postService.getPostsForPagination(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('مشكلة في جلب البيانات');
                if (this.authService.isAdmin) {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.router.navigate(['/register']);
                }
                return of(null);
            })
        );
    }
}
