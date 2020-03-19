import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn:"root"})

export class AuthService{
    constructor(private http:HttpClient, private router:Router){}

    private isAuthenticated=false;
    private token:string;
    private tokenTimer:any;
    private authStatusListener=new Subject<boolean>();

    getToken(){
        return this.token;
    }

    getIsAuth(){
        return this.isAuthenticated;
    }

    getAuthStatusListener(){
        //asObservable-> by using this we can't emit new values from other components
        //we just want to observe(listen) this property 
        return this.authStatusListener.asObservable();
    }

    createUser(email:string, password:string){
        const authData:AuthData={email:email, password:password};
        this.http.post("http://localhost:3000/api/user/signup", authData)
            .subscribe(response => {
                console.log(response);
            })    
    }

    login(email:string, password:string){
        const authData:AuthData={email:email, password:password};
        this.http.post<{token: string, expiresIn:number}>("http://localhost:3000/api/user/login",authData)
            .subscribe(response => {
                const token=response.token;
                this.token=token;
                if(token){
                    const expiresInDuration=response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated=true;
                    this.authStatusListener.next(true);
                    const now=new Date();
                    const expirationDate=new Date(now.getTime()+expiresInDuration*1000);
                    this.saveAuthData(token,expirationDate)
                    this.router.navigate(['/']);
                }
            })
    }

    autoAuthUser(){
        const authInformation = this.getAuthData();
        if(!authInformation){
            return;
        }
        const now = new Date();

        const expiresIn=authInformation.expirationDate.getTime() - now.getTime();
        if(expiresIn > 0){
            this.token=authInformation.token;
            this.isAuthenticated=true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout(){
        this.token=null;
        this.isAuthenticated=false;
        this.authStatusListener.next(false);
        this.clearAuthData();
        clearTimeout(this.tokenTimer);
        this.router.navigate(['/']);
    }

    private setAuthTimer(duration:number){
        this.tokenTimer=setTimeout(() => {
            this.logout();
            alert('Session Expired!')
        }, duration * 1000);
    }

    private saveAuthData(token:string, expirationDate:Date){
        localStorage.setItem('token',token);
        localStorage.setItem('expiration',expirationDate.toISOString());
    }

    private clearAuthData(){
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
    }

    private getAuthData(){
        const token=localStorage.getItem('token');
        const expirationDate=localStorage.getItem('expiration');
        if(!token || !expirationDate){
            return;
        }
        return{
            token:token,
            expirationDate:new Date(expirationDate)
        }
    }
}