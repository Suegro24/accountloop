import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDto';
import { ConnectionService } from './connection.service';
import { FirmService } from './firm.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

 userId = localStorage.getItem('user');
 webSocket: WebSocket;
 chatMessages: ChatMessageDto[] = [];

  constructor(private conn: ConnectionService, private firmService: FirmService, private userService: UserService) { }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8000/chat');
    this.userService.getUser(this.userId).subscribe(res => {
      this.firmService.getMessages(res.firmId).subscribe(response => {
        this.chatMessages = response;
      });
    });

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
      console.log('asd');
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto, firmId: string) {
    this.webSocket.send(JSON.stringify({
      chatMessageDto,
      firmId
    }));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
