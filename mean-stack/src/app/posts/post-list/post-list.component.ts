import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';

import{Post} from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  //dependency injection
  //instead of using that we can use simple way by using public keyword.

  // _postsService:PostsService;
  // constructor(postsService:PostsService) { 
  //   this._postsService=postsService;
  // }

  posts:Post[]= [];
  private postsSub:Subscription;
  isLoading=false;
  totalPosts=0;
  postsPerPage=2;
  currentPage=1;
  pageSizeOptions=[1,2,5,10];
  private authStatusSub:Subscription;
  userIsAuthenticated=false;

  constructor(public postsService:PostsService, private authService:AuthService){

  }

  ngOnInit() {
    this.isLoading=true;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub=this.postsService.getPostUpdateListener().subscribe((postData:{posts:Post[], postCount:number})=>{
      this.isLoading=false;
      this.totalPosts=postData.postCount;
      this.posts=postData.posts;
    });
    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated=isAuthenticated;
    });
  }

  onChangedPage(pageData:PageEvent){
    this.isLoading=true;
    this.currentPage=pageData.pageIndex+1;
    this.postsPerPage=pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }

  onDelete(postId:string){
    this.isLoading=true;
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postsPerPage,this.currentPage);
    });
  }

  ngOnDestroy(){
    //it will prevent memory.
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  // posts=[
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the second post\'s content'},
  //   {title: 'Third Post', content: 'This is the third post\'s content'}
  // ]

  //@Input() -> after listen, to write listening data
  // @Input() posts:Post[]= [];

}
