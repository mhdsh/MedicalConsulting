import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, ParamMap, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { PostService } from '../_services/post.service';
import { Post } from '../_models/post';

@Injectable()
export class EditPostResolver implements Resolve<Post> {
    id: any;
    constructor(private postService: PostService, private authService: AuthService,
        private router: Router, private alertify: AlertifyService, private activatedRoute: ActivatedRoute) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Post> {
        return this.postService.getPost(+route.paramMap.get('id')).pipe(
            catchError(error => {
                this.alertify.error('هناك مشكلة في جلب البيانات');
                this.router.navigate(['/dashboard/posts']);
                return of(null);
            })
        );
    }
}
