import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(!this.authService.loggedInUserSubject){
      this.router.navigate(['/auth']);
      return false;
    }
    return this.authService.loggedInUserSubject.pipe(
      take(1),
      map((user: User) => {
        const isAuthenticated = !!user;
        if(isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/auth']);
        }
      }))
  }

  constructor(private authService: AuthService, private router: Router) { }
}
