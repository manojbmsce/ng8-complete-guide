import { Injectable } from '@angular/core';
import { HttpInterceptor , HttpRequest, HttpHandler, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { User } from './auth/user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authService.loggedInUserSubject.pipe(
      take(1),
      exhaustMap((user: User)=>{
        if(user== null) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }

  constructor(private authService: AuthService) { }
}
