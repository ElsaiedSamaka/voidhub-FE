import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { ChatService } from 'src/core/services/chat.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css'],
})
export class DetailedComponent implements OnInit {
  currentTheme: string = '';
  currentUser: any;
  messages: any[] = [{}];
  newMessage;
  data: any = {};

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}
  @ViewChild('chatContainer', { static: false }) chatContainer: ElementRef;

  ngOnInit() {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
    this.authService.currentUser$.subscribe({
      next: (currentUser) => {
        this.currentUser = currentUser;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
    this.getConversation();
  }

  ngAfterViewChecked() {
    // Scroll to the bottom of the chat container
    this.scrollBottom();
  }
  getConversation(): void {
    this.route.data.subscribe((data) => {
      this.data = data;
      console.log('data', data);
    });
  }
  sendMessage(): void {
    try {
      if (this.newMessage != '')
        this.chatService.sendMessage(
          this.currentUser.id,
          this.data.conversation.user2Id,
          this.newMessage
        );
      this.newMessage = '';
    } catch (error) {
      console.log('error while sending message', error);
    }
  }
  // getMessages() {
  //   if (this.sharedService.selectedContact$.value.id) {
  //     this.chatService.getMessages(
  //       this.currentUser.id,
  //       this.sharedService.selectedContact$.value.id
  //     );
  //     // subscribe to messages$
  //     this.chatService.messages$.subscribe((messages) => {
  //       this.messages = messages;
  //     });
  //   }
  // }
  scrollBottom() {
    // Scroll to the bottom of the chat container
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    }
  }
}
