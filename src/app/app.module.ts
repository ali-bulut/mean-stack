import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';



import { AppComponent } from './app.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';

@NgModule({
   declarations: [
      //todefinecomponents\n//whenweaddthesecomponents(actuallyclasses)here,
      //angularwillbeawareofthesecomponentsand\n//wecoulduseinhtmlfilelike<app-post-create></app-post-create>this.\n\n\
      AppComponent,
      PostCreateComponent,
      PostListComponent,
      HeaderComponent,
      LoginComponent,
      SignupComponent,
      ErrorComponent
   ],
   imports: [
      //toaddmodulestoproject\n\n\n
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatToolbarModule,
      MatExpansionModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      MatDialogModule,
      HttpClientModule
   ],
   providers: [
      {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
      {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents:[
      ErrorComponent
   ]
})
export class AppModule { }
