import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {tap} from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler){

        console.log('outgoing request');
        console.log(req.url);
        return next.handle(req).pipe(tap(evnt=>{
            if(evnt.type === HttpEventType.Response){
                console.log('Incoming response');
                console.log(evnt.body);
            }
        }));
    }
}