import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { errorMonitor } from 'events';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private token: string | null = null;

    constructor(private router: Router,
        private authService:AuthService) {
      // Fetch the token during the app initialization

    }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        const authToken = localStorage.getItem('authToken');
        let authReq=this.addHeaderToken(req,authToken);
        return next.handle(authReq).pipe(
            catchError(errorData=>{
                if(errorData.status===401){
                    this.authService.logOut();
                }
                return throwError(errorData)

            })
        );
    }
    addHeaderToken(r:HttpRequest<any>,token:any)
    {
        return r.clone({
            headers:r.headers.set("Authorization","bearer "+token)
        })
    }
    handelRefreshToken(     req: HttpRequest<any>,
        next: HttpHandler)
    {

    }
}

