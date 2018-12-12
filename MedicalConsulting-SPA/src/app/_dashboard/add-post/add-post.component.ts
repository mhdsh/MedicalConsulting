import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/app/_models/post';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PostService } from 'src/app/_services/post.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  addForm: FormGroup;
  post: Post;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  photo: Photo;
  uploadedFile = false;

  constructor(private postService: PostService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createAddForm();
    this.initializeUploader();
  }

  createAddForm() {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addPost() {
    if (this.addForm.valid && this.uploadedFile) {
      this.post = Object.assign({} , this.addForm.value);
      this.post.url = this.photo.url;
      this.post.publicPhotoId = this.photo.publicIdPhoto;
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

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: true,
      maxFileSize: 10 * 1024 * 1024,
      queueLimit: 1
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        this.photo = JSON.parse(response);
        this.uploadedFile = true;
      }
    };


    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

  }
}
