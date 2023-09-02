import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { SocketService } from './socket.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  selectedContact;
  messages$ = new BehaviorSubject<any[]>([]);

  constructor(private socketService: SocketService) {}
  getMessages(senderId: number, recipientId: number) {
    try {
      this.socketService.socket.emit('getMessages', {
        sender: senderId,
        recipient: recipientId,
      });

      this.socketService.socket.on('messages', (messages) => {
        this.messages$.next(messages);
      });
    } catch (error) {
      console.log('err', error);
    }
  }

  sendMessage(message: any) {
    this.socketService.socket.emit('sendMessage', {
      message,
    });
    this.socketService.socket.on('newMessage', (newMessage) => {
      console.log('newMessage', newMessage);
      this.messages$
        .pipe(
          filter((messages) => !messages.includes(newMessage)),
          tap((messages) => messages.push(newMessage))
        )
        .subscribe();
    });
  }

  joinRoom(userId, recipientId) {
    this.socketService.socket.emit('join', {
      userId: userId,
      recipientId: recipientId,
    });
  }

  leaveRoom(userId, recipientId) {
    this.socketService.socket.emit('leave', {
      userId: userId,
      recipientId: recipientId,
    });
  }
}
