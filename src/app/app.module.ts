import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {httpFactoryProvider, RequestInterceptor} from './shared/interceptor';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AlertService} from './shared/components/alert/alert.service';
import {Ng2Webstorage} from 'ngx-webstorage';
import {AuthGuard} from './shared/guard';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: './pages/pages.module#PagesModule'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'signup', loadChildren: './signup/signup.module#SignupModule'},
  {path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule'},
  {path: '**', redirectTo: 'access-denied'}
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2Webstorage.forRoot({prefix: 'kke-pro', separator: '-'}),
    RouterModule.forRoot(routes),
    NgbModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    AlertService,
    AuthGuard,
    httpFactoryProvider(),
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
