import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  userId: string = localStorage.getItem('user');
  user;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  moneyTransferBadge: number;
  @Input() isAdminLoggedIn = false;
  @Input() shouldRefresh = false;
  subscription: any;

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService,
              private eventEmitterService: EventEmitterService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.subscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
   }

  ngOnInit(): void {
    this.refreshList();

    if (this.eventEmitterService.subscription === undefined) {
      this.eventEmitterService.subscription = this.eventEmitterService.invokeSidenavComponentFunction.subscribe(() => {
        this.refreshList();
      });
    }
  }

  refreshList() {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
      this.moneyTransferBadge = res.awaitingPaymentsToAccept;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
