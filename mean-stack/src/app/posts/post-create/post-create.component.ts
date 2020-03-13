import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import{Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService:PostsService) { }

  ngOnInit() {
  }

  //property defining (don't use with var let or const)
  // newPost2='NO CONTENT';

  // onAddPost2(postInput:HTMLTextAreaElement){
  //   this.newPost2=postInput.value;
  // }

  // enteredTitle='';
  // enteredContent='';

  //to listen we use @output()
  // @Output() postCreated = new EventEmitter<Post>();

  onAddPost(form:NgForm){
    if(form.invalid){
      return;
    }
    //form.value.title -> it came from the name of the elements
    const post:Post={title:form.value.title,content:form.value.content};
    // this.postCreated.emit(post);
    this.postsService.addPost(post);

    form.resetForm();
  }

}
