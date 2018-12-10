import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PostService } from 'src/app/_services/post.service';
import { Post } from 'src/app/_models/post';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  post: Post;
  id: number;
  @HostListener('window:beforeunload', ['$event'])
  unLoadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
      private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.route.data.subscribe(data => {
      this.post = data['post'];
    });
  }

  updatePost() {
    this.post.excerpt = this.post.description.slice(0, 100);
      if (!(this.post.excerpt.length < 100)) {
        this.post.excerpt += '...';
      }
    this.postService.updatePost(this.authService.decodedToken.nameid, this.post).subscribe(next => {
      this.alertify.success('تم تحديث المنشور');
      this.editForm.reset(this.post);
    }, error => {
      this.alertify.error(error);
    });
  }

}
