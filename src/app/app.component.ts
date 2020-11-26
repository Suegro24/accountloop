import { Component, OnInit, HostListener} from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'inzynierka';
  userId;

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (!localStorage.getItem('user')) { return; }
    this.userId = localStorage.getItem('user');
    this.userService.getUserStatus(this.userId).subscribe(res => {
      if (res === false) { this.changeStatus(); }
    });
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    this.changeStatus();
}

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler($event) {
    this.changeStatus();
    return false;
}

  changeStatus() {
    this.userService.changeOnlineStatus(this.userId).subscribe();
  }

  doBeforeUnload() {
    this.changeStatus();
  }

  doUnload() {
    this.changeStatus();
  }

}


