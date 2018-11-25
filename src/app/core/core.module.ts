import {NgModule} from '@angular/core';
import {UserService, LoginService, AccountService, AuthServerProvider, StateStorageService, Principal} from './';

@NgModule({
  providers: [
    UserService,
    LoginService,
    AccountService,
    AuthServerProvider,
    Principal,
    StateStorageService
  ]
})
export class CoreModule {
}
