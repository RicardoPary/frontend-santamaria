import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {registerLocaleData} from '@angular/common';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {PagesModule} from './pages/pages.module';
import {VulLoaderComponent} from './shared/components/loader/vul-loader.component';
import {VulLoaderService} from './shared/components/loader/vul-loader.service';
import {LoaderBarModule} from './layout/loader-bar';
import localeBO from '@angular/common/locales/es-BO';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {NgxWebstorageModule} from 'ngx-webstorage';
registerLocaleData(localeBO);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PagesModule,
    NgbModule,
    NgxWebstorageModule.forRoot({prefix: 'kke-pro', separator: '-'}),
    routing,
    LoaderBarModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    VulLoaderComponent
  ],
  exports: [
    VulLoaderComponent
  ],
  providers: [
    VulLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
