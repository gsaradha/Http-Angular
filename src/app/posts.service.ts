import { HttpClient,HttpHeaders, HttpParams,HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Post} from './post.model';
import {map,catchError,tap} from 'rxjs/operators';
import {Subject,throwError} from 'rxjs';
@Injectable({providedIn:"root"})
export class PostService{

    error = new Subject<string>();

    constructor(private http:HttpClient){}

    createAndStorePost(title:string,content:string){
        const postData:Post ={title:title,content:content}
    this.http.post<{name:string}>('https://simplebackend-d5141-default-rtdb.firebaseio.com/posts.json',
   postData,{
       observe : 'response'
   }).subscribe((responseData)=>{
      console.log(responseData);
   },error=>{
       this.error.next(error.message);

   })
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('pretty','place');
        searchParams = searchParams.append('clear','sky');

        return this.http.get<{[key:string]:Post}>('https://simplebackend-d5141-default-rtdb.firebaseio.com/posts.json',{
            headers:new HttpHeaders({'custom-headers':'text'}),
            params: searchParams
            // params: new HttpParams().set('print','pretty')
        })
        .pipe(map((responseData)=>{
            const postArray:Post[] = [];
            for (const key in responseData){
               if(responseData.hasOwnProperty(key)){
                     postArray.push({...responseData[key],id:key})
              } 
            }
            return postArray;
          }),
          catchError(errorRes =>{
                return throwError(errorRes);
          })
        );
        
    }

    deletePosts(){
          this.http.delete('https://simplebackend-d5141-default-rtdb.firebaseio.com/posts.json',
          {
              observe:'events'
          }).pipe(tap(event => {
              console.log(event)
              if(event.type === HttpEventType.Sent){
                //...
            }
              if(event.type === HttpEventType.Response){
                  console.log(event.body);
              }
          }
          ))
         .subscribe((responseData)=>{
            console.log(responseData)
         });
        
    }


}