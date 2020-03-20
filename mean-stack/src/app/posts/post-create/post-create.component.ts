import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import{Post} from '../post.model';
import {mimeType} from './mime-type.validator'
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form:FormGroup;
  imagePreview:string;
  isLoading=false;
  constructor(public postsService:PostsService, public route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.form=new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content':new FormControl(null, {validators: [Validators.required]}),
      //asyncValidators:[mimeType] by using this, we're only accepting the image files.(png,jgp etc.)
      'image':new FormControl(null, {validators: [Validators.required], asyncValidators:[mimeType]})
    });

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postId=paramMap.get('postId');
        this.isLoading=true;
        this.postsService.getPost(this.postId).subscribe(postData=>{
          this.isLoading=false;
          this.post={id:postData._id, title:postData.title, content:postData.content, imagePath:postData.imagePath, creator:postData.creator};
          this.imagePreview=this.post.imagePath;
          this.form.setValue({'title':this.post.title, 'content':this.post.content, 'image':this.post.imagePath});
        });
      }
      else{
        this.mode='create';
        this.postId=null;
      }
    });
  }

  onImagePicked(event:Event){
    const file=(event.target as HTMLInputElement).files[0];
    this.form.patchValue({'image':file});
    this.form.get('image').updateValueAndValidity();
    const reader=new FileReader();
    reader.onload = () => {
      this.imagePreview=reader.result as string;
    };
    reader.readAsDataURL(file);
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
  onSavePost(){
    if(this.form.invalid){
      return;
    }
    this.isLoading=true;
    if(this.mode==="create"){
      //form.value.title -> it came from the name of the elements
      //this.postCreated.emit(post);
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
      this.router.navigate(['/']);
    }
    else{
      this.postsService.updatePost(this.postId,this.form.value.title,this.form.value.content, this.form.value.image);
      this.router.navigate(['/']);
    }
    
    this.form.reset();

  }

}
