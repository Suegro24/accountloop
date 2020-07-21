import { Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  moneyTransferBadge: number; 

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;
      this.moneyTransferBadge = res.awaitingPaymentsToAccept;
    })
  }

}
