import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUserSubject = new Subject<User>();

  constructor(private http: HttpClient) { }

  signup(email: string, password:string) {
   return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7NBLujT84MGsJHDYVgqqWe3G4U8uKNqs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  signIn(email:string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7NBLujT84MGsJHDYVgqqWe3G4U8uKNqs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(this.handleAuthentication.bind(this))
      );
  }

  private handleAuthentication(authResponseData: AuthResponseData) {
    let expiryDate = new Date(
      new Date().getTime() + (+authResponseData.expiresIn * 1000)
    );

    let user = new User(
      authResponseData.email,
      authResponseData.localId,
      authResponseData.idToken,
      expiryDate
    );
    this.loggedInUserSubject.next(user);

  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage = "An unknown error occured";
    if(errorResponse && errorResponse.error && errorResponse.error.error ) {
        switch(errorResponse.error.error.message) {
          case 'EMAIL_NOT_FOUND': 
              errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
              break;
            case 'INVALID_PASSWORD': 
              errorMessage = 'The password is invalid or the user does not have a password.';
              break;
            case 'USER_DISABLED': 
              errorMessage = 'The user account has been disabled by an administrator';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER': 
              errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
              break;
            case 'EMAIL_EXISTS': 
              errorMessage = 'The email address is already in use by another account';
              break;
            case 'OPERATION_NOT_ALLOWED': 
              errorMessage = 'Password sign-in is disabled for this project';
              break;            
        }
    }
    return throwError(errorMessage);
  }
}

export interface AuthResponseData {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered? : boolean;
}

