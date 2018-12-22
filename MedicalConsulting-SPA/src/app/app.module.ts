import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';
import { JwtModule } from '@auth0/angular-jwt';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule } from '@angular/material';
import { MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterAdminComponent } from './_dashboard/registerAdmin/registerAdmin.component';
import { AuthAdminGuard } from './_guards/auth.admin.guard';
import { UserService } from './_services/user.service';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { SidebarComponent } from './_dashboard/sidebar/sidebar.component';
import { AdminLayoutComponent } from './_dashboard/admin-layout/admin-layout.component';
import { AddPostComponent } from './_dashboard/add-post/add-post.component';
import { PostService } from './_services/post.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './_dashboard/side-nav/side-nav.component';
import { PostsComponent } from './_dashboard/posts/posts.component';
import { PostsResolver } from './_resolvers/posts.resolver';
import { EditPostComponent } from './_dashboard/edit-post/edit-post.component';
import { EditPostResolver } from './_resolvers/edit-post.resolver';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCardComponent } from './posts/post-card/post-card.component';
import { PostsHomeResolver } from './_resolvers/posts-home.resolver';
import { PostDetailResolver } from './_resolvers/post-detail.resolver';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { UsersComponent } from './_dashboard/users/users.component';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { MessagesComponent } from './_dashboard/messages/messages.component';
import { AdminMessagesComponent } from './_dashboard/admin-messages/admin-messages.component';
import { MemberDetailComponent } from './_dashboard/member-detail/member-detail.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      RegisterAdminComponent,
      MemberDetailComponent,
      MemberEditComponent,
      SidebarComponent,
      AdminLayoutComponent,
      AddPostComponent,
      SideNavComponent,
      PostsComponent,
      EditPostComponent,
      PhotoEditorComponent,
      PostListComponent,
      PostCardComponent,
      PostDetailComponent,
      UsersComponent,
      MemberMessagesComponent,
      TimeAgoPipe,
      MessagesComponent,
      AdminMessagesComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgxCaptchaModule,
      FileUploadModule,
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      BrowserAnimationsModule,
      LayoutModule,
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      AuthAdminGuard,
      UserService,
      PostService,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      PostsHomeResolver,
      PostsResolver,
      EditPostResolver,
      PostDetailResolver,
      MessagesResolver,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
