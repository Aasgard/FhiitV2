import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {IExercise} from "../models/exercise-model";
import {Observable} from "rxjs";

@Injectable()
export class ExercisesProvider {

  constructor(private afDb: AngularFireDatabase) {
    console.log('Hello ExercisesProvider Provider');
  }

  public getAllExercises(): Observable<IExercise[]> {
      return this.afDb.list<IExercise>('exercises').valueChanges();
  }

}
