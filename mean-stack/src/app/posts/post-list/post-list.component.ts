import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';

import{Post} from '../post.model';
import { PostsService } from '../posts.service';

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

  posts:Post[]= []
  private postsSub:Subscription;

  constructor(public postsService:PostsService){

  }

  ngOnInit() {
    this.posts=this.postsService.getPosts();
    this.postsSub=this.postsService.getPostUpdateListener().subscribe((posts:Post[])=>{
      this.posts=posts;
    });
  }

  ngOnDestroy(){
    //it will prevent memory.
    this.postsSub.unsubscribe();
  }

  // posts=[
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the second post\'s content'},
  //   {title: 'Third Post', content: 'This is the third post\'s content'}
  // ]

  //@Input() -> after listen, to write listening data
  // @Input() posts:Post[]= [];

}
