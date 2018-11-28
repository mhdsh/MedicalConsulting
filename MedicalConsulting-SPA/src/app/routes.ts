import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthAdminGuard } from './_guards/auth.admin.guard';
import { RegisterAdminComponent } from './_dashboard/registerAdmin/registerAdmin.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'dashboard',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthAdminGuard],
        children: [
            {path: 'register', component: RegisterAdminComponent}
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent},
            {path: 'messages', component: MessagesComponent},
            {path: 'lists', component: ListsComponent},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
