import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivilegeService } from './modules/shared/services/privilege.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './interceptors/token.interceptor';


export function intializePremissionFactory(privilegeService :PrivilegeService){

  return ()=>{

    console.log("appintializer")
    return privilegeService.loadPrivilege();

  }
    
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
  
   {
      provide: APP_INITIALIZER,
      useFactory: intializePremissionFactory,
      deps: [PrivilegeService],
      multi: true
    },
    { 
      provide: 'apiUrl', 
      useValue: environment.apiUrl 
    },
    {
      provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true
    },
    provideClientHydration(),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
