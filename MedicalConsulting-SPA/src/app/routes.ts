import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthAdminGuard } from './_guards/auth.admin.guard';
import { RegisterAdminComponent } from './_dashboard/registerAdmin/registerAdmin.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { RegisterComponent } from './register/register.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { AdminLayoutComponent } from './_dashboard/admin-layout/admin-layout.component';
import { AddPostComponent } from './_dashboard/add-post/add-post.component';
import { PostsComponent } from './_dashboard/posts/posts.component';
import { PostsResolver } from './_resolvers/posts.resolver';
import { EditPostComponent } from './_dashboard/edit-post/edit-post.component';
import { EditPostResolver } from './_resolvers/edit-post.resolver';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsHomeResolver } from './_resolvers/posts-home.resolver';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostDetailResolver } from './_resolvers/post-detail.resolver';
import { UsersComponent } from './_dashboard/users/users.component';

export const appRoutes: Routes = [
    {path: '', component: PostListComponent, resolve: {posts: PostsHomeResolver}},
    {path: 'posts/:id', component: PostDetailComponent, resolve: {post: PostDetailResolver}},
    {
        path: 'dashboard',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthAdminGuard],
        children: [
            {path: '', component: AdminLayoutComponent},
            {path: 'posts', component: PostsComponent, resolve: {posts: PostsResolver}},
            {path: 'add', component: AddPostComponent},
            {path: 'update/:id', component: EditPostComponent, resolve: {post: EditPostResolver}},
            {path: 'register', component: RegisterAdminComponent},
            {path: 'users', component: UsersComponent, resolve: {users: MemberListResolver}},
            {path: 'users/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]}
        ]
    },
    {path: 'register', component: RegisterComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
