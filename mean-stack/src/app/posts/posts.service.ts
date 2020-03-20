import { Post } from './post.model';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

//we could use this type of describing instead of adding to app.module.ts in providers
//but in this project we have to use this type of describing.
//Because when we use this it will be like static classes.
//Therefore this service only will be created for once.
//we use this because we want to create posts array just for once.
@Injectable({providedIn:'root'})

export class PostsService{
    private posts: Post[] = [];
    private postsUpdated=new Subject<{posts:Post[], postCount:number}>();

    constructor(private http: HttpClient, private router:Router){

    }

    getPosts(postsPerPage:number, currentPage:number){
        //we created new array and coppied the posts array to return instead of return original posts array
        //we did this because arrays are reference type and we don't want to access to directly original array
        //in order to if the user change something on array we don't want the original posts array to be affected. 
        // return [...this.posts];

        const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
        this.http.get<{message:string, posts:any, maxPosts:number}>('http://localhost:3000/api/posts' + queryParams)
        //by using this, we will be able to convert our posts which are coming from db to our post.model
        //and now our posts are like our model.
        .pipe(map((postData)=>{
            return {posts: postData.posts.map(post => {
                return {
                    //this array object will be added to another object which we called as transformedPosts
                    title:post.title,
                    content:post.content,
                    id:post._id,
                    imagePath:post.imagePath,
                    creator:post.creator
                };
            }), maxPosts:postData.maxPosts}
        }))
        .subscribe((transformedPostData)=>{
            this.posts = transformedPostData.posts;
            this.postsUpdated.next({posts: [...this.posts], postCount:transformedPostData.maxPosts});
        });

    }

    getPostUpdateListener(){
        //we can listen by using subscribe method but we cannot emit outside from this file.
        return this.postsUpdated.asObservable();
    }

    getPost(id:string){
        return this.http.get<{_id:string, title:string, content:string, imagePath:string, creator:string}>
        ("http://localhost:3000/api/posts/"+id);
    }

    addPost(title:string, content:string, image:File){
        // const post:Post=postData;
        const postData=new FormData();
        postData.append("title", title);
        postData.append("content",content);
        postData.append("image", image, title);
        this.http.post<{message:string, post:Post}>('http://localhost:3000/api/posts',postData)
          .subscribe((responseData)=>{
            // const post:Post={id:responseData.post.id, title:title, content:content, imagePath:image as unknown as string}
            // this.posts.push(post);
            // //next means is that push and emit new value which is the copy of after update post 
            // this.postsUpdated.next([...this.posts]);
            this.router.navigate(['/']);
          });
        
    }

    updatePost(id:string, title:string, content:string, image:File | string){
        let postData:Post | FormData
        if(typeof(image) === 'object'){
            postData=new FormData();
            postData.append("id",id);
            postData.append("title",title);
            postData.append("content",content);
            postData.append("image",image,title);
        }
        else{
            postData={id:id,content:content,title:title,imagePath:image, creator:null};
         }
        this.http.put("http://localhost:3000/api/posts/"+id,postData)
            .subscribe(response=>{
                // const updatedPosts = [...this.posts];
                // const oldPostIndex= updatedPosts.findIndex(p=>p.id === id);
                // const post:Post={id:id,content:content,title:title,imagePath:image as unknown as string}
                // updatedPosts[oldPostIndex] = post;
                // this.posts=updatedPosts;
                // this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    deletePost(postId:string){
       return this.http.delete("http://localhost:3000/api/posts/"+postId)
            // .subscribe(()=>{
            //     //in here, we filtered posts only to show all posts except the deleted post
            //     const updatedPosts=this.posts.filter(post => post.id !== postId);
            //     this.posts=updatedPosts;
            //     this.postsUpdated.next([...this.posts]);
            // })
    }
}