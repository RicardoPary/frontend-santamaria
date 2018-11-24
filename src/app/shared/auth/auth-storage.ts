import { Injectable } from '@angular/core';

@Injectable()
export class AuthStorage {

  static storageKey = 'ezpay-jwt';

  storeAuth(jwt, rememberMe) {
    try {
      if (rememberMe) {
        window.localStorage[AuthStorage.storageKey] = `"${jwt}"`;
      } else {
        window.sessionStorage[AuthStorage.storageKey] = `"${jwt}"`;
      }
    } catch (e) {
    }
  }

  getStoredAuth(): string {
    try {
      let jwt = window.localStorage[AuthStorage.storageKey] || window.sessionStorage[AuthStorage.storageKey];
      if (jwt) jwt = jwt.substring(1, jwt.length - 1);
      return jwt;
    } catch (e) {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(AuthStorage.storageKey);
      window.sessionStorage.removeItem(AuthStorage.storageKey);
    } catch (e) {
    }
  }
}
