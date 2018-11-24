import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs/index';

@Injectable()
export class PagesGuard implements CanActivate {

  constructor(private $localStorage: LocalStorageService,
              private $sessionStorage: SessionStorageService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const token = this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    if (token) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
