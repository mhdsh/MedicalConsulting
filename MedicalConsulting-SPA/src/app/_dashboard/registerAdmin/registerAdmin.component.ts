import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-registeradmin',
  templateUrl: './registerAdmin.component.html',
  styleUrls: ['./registerAdmin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  reCaptchakey = this.authService.siteKey;

  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      isAdmin: ['false'],
      gender: ['male'],
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      dateOfBirth: [null, Validators.required],
      country: ['', Validators.required],
      medicalHistory: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      confirmPassword: ['', Validators.required],
      recaptcha: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({} , this.registerForm.value);
      this.authService.registerAdmin(this.user).subscribe(() => {
        this.alertify.success('Registeration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['']);
        });
      });
    }
  }
}
