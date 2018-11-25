import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {Ng2Webstorage} from 'ngx-webstorage';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibsModule} from './shared/shared-libs.module';
import {SharedServicesModule} from './shared/shared-services.module';


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
    SharedLibsModule,
    SharedServicesModule,
    BrowserModule,
    BrowserAnimationsModule,
    Ng2Webstorage.forRoot({prefix: 'kke-pro', separator: '-'}),
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
