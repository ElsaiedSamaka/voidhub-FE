import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';

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
  constructor(
    private themeService: ThemeService,
    private authService: AuthService
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
  }

  ngAfterViewChecked() {
    // Scroll to the bottom of the chat container
    this.scrollBottom();
  }

  sendMessage(): void {
    // try {
    //   if (this.newMessage != '')
    //     this.chatService.sendMessage(
    //       this.currentUser.id,
    //       [this.selectedContact.id],
    //       this.newMessage
    //     );
    //   this.newMessage = '';
    // } catch (error) {
    //   console.log('error while sending message', error);
    // }
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