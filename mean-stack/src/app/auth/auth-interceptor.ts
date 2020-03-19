import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

//if we want to inject services into services we should use @injectable
//to known this interceptor by Angular we should write this interceptor to providers part of app.module
@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService:AuthService){

    }

    intercept(req:HttpRequest<any>, next:HttpHandler){
        const authToken=this.authService.getToken();
        const authRequest=req.clone({
            //adding token to the headers
            headers:req.headers.set("Authorization", "Bearer " + authToken)
        });
        return next.handle(authRequest);
    }
}