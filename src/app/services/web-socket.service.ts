import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDto';
import { ConnectionService } from './connection.service';
import { FirmService } from './firm.service';
import { UserService } from './user.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

 userId = localStorage.getItem('user');
 webSocket: WebSocket;
 chatMessages: ChatMessageDto[] = [];
 firm;
 private event = new Subject<boolean>();
 event$ = this.event.asObservable();

  constructor(private conn: ConnectionService, private firmService: FirmService, private userService: UserService,
              private window: Window) { }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8000/chat');
    this.userService.getUser(this.userId).subscribe(res => {
      this.firmService.getMessages(res.firmId).subscribe(response => {
        this.chatMessages = response;
      });

      this.firmService.getFirm(res.firmId).subscribe(response => {
        this.firm = response;
      });

    });

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
      this.webSocket.send(JSON.stringify({method: 'new', userId: this.userId}));
      this.event.next(true);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = Object.assign({}, JSON.parse(event.data));
      if (chatMessageDto.status) {
        console.log(chatMessageDto.status);
      }
      else {
        this.chatMessages.push(chatMessageDto.params.message);
      }
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
      this.event.next(false);
    };
  }

  public send(data) {
    this.webSocket.send(JSON.stringify(data));
  }

  public sendMessage(chatMessageDto: ChatMessageDto, firmId: string) {
    try {
      this.webSocket.send(JSON.stringify({
        method: 'message',
        chatMessageDto,
        firmId
      }));
    }catch (error) {
      console.error(error);
      return false;
    }
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
