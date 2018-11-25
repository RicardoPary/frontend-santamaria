import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {NgBusyModule} from 'ng-busy';

@NgModule({
  imports: [
    NgbModule,
    HttpClientModule,
    NgbModalModule,
    NgBusyModule
  ],
  exports: [
    NgbModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgbModalModule,
    NgBusyModule,
    ReactiveFormsModule
  ]
})
export class SharedLibsModule {
  static forRoot() {
    return {
      ngModule: SharedLibsModule
    };
  }
}
