import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/app/_models/post';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  addForm: FormGroup;
  post: Post;

  constructor(private postService: PostService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  addPost() {
    if (this.addForm.valid) {
      this.post = Object.assign({} , this.addForm.value);
      this.post.excerpt = this.post.description.slice(0, 100);
      if (!(this.post.excerpt.length < 100)) {
        this.post.excerpt += '...';
      }
      this.postService.addPost(this.post).subscribe(() => {
        this.alertify.success('تمت إضافة المنشور بنجاح');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/dashboard/posts']);
      });
    }
  }
}
