import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { Subject } from 'rxjs/index';
import { User } from '../user/user.model';

@Injectable()
export class UserBindService {
  private subject = new Subject<any>();

  sendMessage(message: any) {
    this.subject.next({ data: message });
  }

  get events$ () {
    return this.subject.asObservable();
  }
}
