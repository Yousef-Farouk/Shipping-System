import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivilegeService } from './modules/shared/services/privilege.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthEffects } from './features/auth/store/auth.effects';
import { authReducer } from './features/auth/store/auth.reducer';


// export function intializePremissionFactory(privilegeService :PrivilegeService){

//   return ()=>{
//     // console.log("appintializer")
 //   return privilegeService.loadPrivilege();

//   }
    
// }
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature("Auth",authReducer)
  ],
  providers: [
  
  //  {
  //     provide: APP_INITIALIZER,
  //     useFactory: intializePremissionFactory,
  //     deps: [PrivilegeService],
  //     multi: true
  //   },
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
