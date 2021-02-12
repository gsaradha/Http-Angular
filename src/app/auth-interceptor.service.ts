import { HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {tap} from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor{
        intercept(req:HttpRequest<any>, next: HttpHandler){
            console.log('Request is on its way');
            const modifiedReq = req.clone({headers:req.headers.append('Auth','xyz')});
            return next.handle(modifiedReq).pipe(tap(evnt=>{
                console.log(evnt)
                if(evnt.type === HttpEventType.Response){
                        console.log("Response Arrived,body data");
                        console.log(evnt.body);
                }
            }))
        }
    
}