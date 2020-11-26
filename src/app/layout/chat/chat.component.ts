import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FirmService } from 'src/app/services/firm.service';
import { NgForm } from '@angular/forms';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { ChatMessageDto } from 'src/app/models/chatMessageDto';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  userId = localStorage.getItem('user');
  user;
  firm;

  constructor(private userService: UserService, private firmService: FirmService, public webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;

      this.firmService.getFirm(this.user.firmId).subscribe(response => {
        this.firm = response;
      });

      this.webSocketService.openWebSocket();

    });
  }

  sendMessage(sendForm: NgForm) {
    const username = this.user.name + ' ' + this.user.surname;
    const chatMessageDto = new ChatMessageDto(username, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDto, this.firm._id);
    sendForm.controls.message.reset();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }
}
