import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UsersDataSource } from './users-datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UsersDataSource;
  users: User[];
  id: number;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,
    private alertify: AlertifyService, private router: Router) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['username', 'created', 'id'];

  ngOnInit() {
    this.dataSource = new UsersDataSource(this.paginator, this.sort, this.userService, this.activatedRoute);
    this.dataSource.loadUsers();
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(() => {
      this.alertify.success('تم حذف المستخدم');
      location.reload();
    }, error => {
      this.alertify.error(error);
    });
  }
}
