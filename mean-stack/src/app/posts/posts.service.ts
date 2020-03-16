import { Post } from './post.model';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

//we could use this type of describing instead of adding to app.module.ts in providers
//but in this project we have to use this type of describing.
//Because when we use this it will be like static classes.
//Therefore this service only will be created for once.
//we use this because we want to create posts array just for once.
@Injectable({providedIn:'root'})

export class PostsService{
    private posts: Post[] = [];
    private postsUpdated=new Subject<Post[]>();

    constructor(private http: HttpClient){

    }

    getPosts(){
        //we created new array and coppied the posts array to return instead of return original posts array
        //we did this because arrays are reference type and we don't want to access to directly original array
        //in order to if the user change something on array we don't want the original posts array to be affected. 
        // return [...this.posts];

        this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
        //by using this, we will be able to convert our posts which are coming from db to our post.model
        //and now our posts are like our model.
        .pipe(map((postData)=>{
            return postData.posts.map(post => {
                return {
                    //this array object will be added to another object which we called as transformedPosts
                    title:post.title,
                    content:post.content,
                    id:post._id
                };
            })
        }))
        .subscribe((transformedPosts)=>{
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });

    }

    getPostUpdateListener(){
        //we can listen by using subscribe method but we cannot emit outside from this file.
        return this.postsUpdated.asObservable();
    }

    addPost(postData:Post){
        const post:Post=postData;
        this.http.post<{message:string, postId:string}>('http://localhost:3000/api/posts',post)
          .subscribe((responseData)=>{
            const id=responseData.postId;
            post.id=id;
            this.posts.push(post);
            //next means is that push and emit new value which is the copy of after update post 
            this.postsUpdated.next([...this.posts]);
          });
        
    }

    deletePost(postId:string){
        this.http.delete("http://localhost:3000/api/posts/"+postId)
            .subscribe(()=>{
                //in here, we filtered posts only to show all posts except the deleted post
                const updatedPosts=this.posts.filter(post => post.id !== postId);
                this.posts=updatedPosts;
                this.postsUpdated.next([...this.posts]);
            })
    }
}