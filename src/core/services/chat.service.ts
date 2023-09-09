import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { SocketService } from './socket.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  selectedContact;
  conversation$ = new BehaviorSubject<any[]>([]);
  conversations$ = new BehaviorSubject<any[]>([]);

  constructor(
    private socketService: SocketService,
    private authService: AuthService,
    private apiService: ApiService
  ) {}
  getMessages(senderId: number, recipientId: number) {
    try {
      this.socketService.socket.emit('getMessages', {
        sender: senderId,
        recipient: recipientId,
      });

      this.socketService.socket.on('messages', (messages) => {
        this.conversation$.value['messages'].push(messages);
      });
    } catch (error) {
      console.log('err', error);
    }
  }

  sendMessage(
    senderId: number,
    receiverId: number,
    message: string,
    conversationId?: number
  ) {
    this.socketService.socket.emit('sendMessage', {
      senderId: senderId,
      receiverId: receiverId,
      conversationId: conversationId,
      message: message,
    });
    this.socketService.socket.on('newMessage', (newMessage) => {
      console.log('newMessage', newMessage);
      this.getConversations(this.authService.getCurrentUser().id);
      if (!this.conversation$.value['messages'].includes(newMessage)) {
        this.conversation$.value['messages'].push(newMessage);
      }
    });
  }
  getConversations(currentUserId: number): void {
    this.socketService.socket.emit('getConversations', {
      currentUserId: currentUserId,
    });
    this.socketService.socket.on('emittedConversation', (conversations) => {
      // console.log('conversations', conversations);
      this.conversations$.next(conversations);
    });
  }
  getConversationById(id: string): Observable<any> {
    return this.apiService.get(`/api/conversations/${id}`).pipe(
      tap((res) => {
        console.log('res', res);
        this.conversation$.next(res);
      })
    );
  }
  deleteConversationById(id: string): Observable<any> {
    return this.apiService.delete(`/api/conversations/${id}`).pipe(
      tap((deleteItem) => {
        console.log('deleteItem', deleteItem);
        let updatedItems = this.conversations$.value.filter(
          (item) => item.id != deleteItem.id
        );
        console.log('updatedItems', updatedItems);
        this.conversations$.next(updatedItems);
      })
    );
  }
  joinRoom(conversationId: any) {
    this.socketService.socket.emit('join', {
      conversationId: conversationId,
    });
  }

  // leaveRoom(userId, recipientId) {
  //   this.socketService.socket.emit('leave', {
  //     userId: userId,
  //     recipientId: recipientId,
  //   });
  // }
}
