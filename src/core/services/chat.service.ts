import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { SocketService } from './socket.service';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  selectedContact;
  messages$ = new BehaviorSubject<any[]>([]);
  conversations$ = new BehaviorSubject<any[]>([]);

  constructor(
    private socketService: SocketService,
    private authService: AuthService,
    private apiService:ApiService
  ) {}
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

  sendMessage(senderId: number, receiverId: number, message: string) {
    this.socketService.socket.emit('sendMessage', {
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });
    this.socketService.socket.on('newMessage', (newMessage) => {
      this.getConversations(this.authService.getCurrentUser().id);
      console.log('newMessage', newMessage);
      this.messages$
        .pipe(
          filter((messages) => !messages.includes(newMessage)),
          tap((messages) => messages.push(newMessage))
        )
        .subscribe();
    });
  }
  getConversations(currentUserId: number): void {
    this.socketService.socket.emit('getConversations', {
      currentUserId: currentUserId,
    });
    this.socketService.socket.on('emittedConversation', (conversations) => {
      console.log('conversations', conversations);
      this.conversations$.next(conversations);
    });
  }
  getConversationById(id: string): Observable<any> {
    return this.apiService.get(`/api/conversations/${id}`);
  }
  // joinRoom(userId, recipientId) {
  //   this.socketService.socket.emit('join', {
  //     userId: userId,
  //     recipientId: recipientId,
  //   });
  // }

  // leaveRoom(userId, recipientId) {
  //   this.socketService.socket.emit('leave', {
  //     userId: userId,
  //     recipientId: recipientId,
  //   });
  // }
}
