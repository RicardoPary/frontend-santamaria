import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/index';

@Injectable()
export class CompanyBindService {
  private subject = new Subject<any>();

  sendMessage(message: any) {
    this.subject.next({ data: message });
  }

  get events$ () {
    return this.subject.asObservable();
  }
}
