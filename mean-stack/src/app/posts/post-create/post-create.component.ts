import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import{Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  private mode='create';
  private postId:string;
  post:Post;
  isLoading=false;
  constructor(public postsService:PostsService, public route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postId=paramMap.get('postId');
        this.isLoading=true;
        this.postsService.getPost(this.postId).subscribe(postData=>{
          this.isLoading=false;
          this.post={id:postData._id, title:postData.title, content:postData.content}
        });
      }
      else{
        this.mode='create';
        this.postId=null;
      }
    });
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

  //both updating and adding processes are running here
  onSavePost(form:NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading=true;
    if(this.mode==="create"){
      //form.value.title -> it came from the name of the elements
      const post:Post={id:null,title:form.value.title,content:form.value.content};
      //this.postCreated.emit(post);
      this.postsService.addPost(post);
      this.router.navigate(['/']);
    }
    else{
      this.postsService.updatePost(this.postId,form.value.title,form.value.content);
      this.router.navigate(['/']);
    }
    

    form.resetForm();
  }

}
