import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptorService} from '../app/auth-interceptor.service';

import { AppComponent } from './app.component';
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [{provide: HTTP_INTERCEPTORS,
              useClass:AuthInterceptorService,
              multi:true},
              {provide: HTTP_INTERCEPTORS,
                useClass:LoggingInterceptorService,
                multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
