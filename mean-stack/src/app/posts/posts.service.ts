import { Post } from './post.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

//we could use this type of describing instead of adding to app.module.ts in providers
//but in this project we have to use this type of describing.
//Because when we use this it will be like static classes.
//Therefore this service only will be created for once.
//we use this because we want to create posts array just for once.
@Injectable({providedIn:'root'})

export class PostsService{
    private posts: Post[] = [];
    private postsUpdated=new Subject<Post[]>();

    getPosts(){
        //we created new array and coppied the posts array to return instead of return original posts array
        //we did this because arrays are reference type and we don't want to access to directly original array
        //in order to if the user change something on array we don't want the original posts array to be affected. 
        return [...this.posts];
    }

    getPostUpdateListener(){
        //we can listen by using subscribe method but we cannot emit outside from this file.
        return this.postsUpdated.asObservable();
    }

    addPost(postData:Post){
        const post:Post=postData;
        this.posts.push(post);
        //next means is that push and emit new value which is the copy of after update post 
        this.postsUpdated.next([...this.posts]);
    }
}