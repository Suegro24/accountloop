import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import decode from 'jwt-decode';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!localStorage.getItem('token')) {
      this.router.navigate(['/logowanie']);
      return false;
    }

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    if (!this.authService.isAuthenticated() || tokenPayload.admin !== true) {
      this.router.navigate(['/logowanie']);
      return false;
    }
    return true;
  }
}
