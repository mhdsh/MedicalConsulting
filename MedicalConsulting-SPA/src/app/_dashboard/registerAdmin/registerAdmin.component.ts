import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-registeradmin',
  templateUrl: './registerAdmin.component.html',
  styleUrls: ['./registerAdmin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.registerAdmin(this.model).subscribe(() => {
      this.alertify.success('registeration successful');
    }, error => {
      this.alertify.error(error);
    });
  }
}
