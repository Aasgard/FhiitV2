import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class MockupsProvider {

    constructor(public http: HttpClient) {
        console.log('Hello MockupsProvider Provider');
    }

}
