import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IExercise} from "../models/exercise-model";
import {Observable} from "rxjs";

@Injectable()
export class MockupsProvider {

    constructor(public http: HttpClient) {
        console.log('Hello MockupsProvider Provider');
    }

    public getMockupsExercises(): Observable<IExercise[]> {
        return this.http.get<IExercise[]>('assets/mocks/exercises1.json');
    }

}
