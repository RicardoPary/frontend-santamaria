import { Injectable } from '@angular/core';

@Injectable()
export class CSRFService {

    constructor() {}

    getCSRF(name?: string) {
        name = `${name ? name : 'XSRF-TOKEN'}`;
        return '';
    }
}
