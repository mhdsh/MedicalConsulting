import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Outbox';

  constructor(private userService: UserService, private authService: AuthService,
    private activatedRoute: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.pagination = data['messages'].pagination;
      this.messages = data['messages'].result;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertify.confirm('هل أنت متأكد أنك تريد حذف هذه الرسالة؟', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('تم حذف الرسالة');
      }, error => {
        this.alertify.error('فشل حذف الرسالة');
      });
    });
  }

}
