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
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';



import { AppComponent } from './app.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
   declarations: [
      //to define components
      //when we add these components (actuallyclasses) here,
      //angular will be aware of these components and
      //we could use in html file like <app-post-create></app-post-create> this.


      AppComponent,
      PostCreateComponent,
      PostListComponent,
      HeaderComponent,
      LoginComponent,
      SignupComponent
   ],
   imports: [
      //to add modules to project

      
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
      HttpClientModule
   ],
   providers: [
      //multi:true means that we can use more than one interceptor in our project
      {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
