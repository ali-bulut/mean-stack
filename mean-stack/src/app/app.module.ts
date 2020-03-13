import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';




import { AppComponent } from './app.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
   declarations: [
      //to define components
      //when we add these components (actuallyclasses) here,
      //angular will be aware of these components and
      //we could use in html file like <app-post-create></app-post-create> this.


      AppComponent,
      PostCreateComponent,
      PostListComponent,
      HeaderComponent
   ],
   imports: [
      //to add modules to project

      
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatToolbarModule,
      MatExpansionModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
