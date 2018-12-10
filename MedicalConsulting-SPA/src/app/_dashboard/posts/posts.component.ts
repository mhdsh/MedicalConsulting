import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PostsDataSource } from './posts-datasource';
import { PostService } from 'src/app/_services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/_models/post';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PostsDataSource;
  posts: Post[];
  id: number;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute,
    private alertify: AlertifyService, private router: Router) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'excerpt', 'id'];

  ngOnInit() {
    this.dataSource = new PostsDataSource(this.paginator, this.sort, this.postService, this.activatedRoute);
    this.dataSource.loadPosts();
  }

  deletePost(id) {
    this.postService.deletePost(id).subscribe(() => {
      this.alertify.success('تم حذف المنشور');
      location.reload();
    }, error => {
      this.alertify.error(error);
    });
  }
}
