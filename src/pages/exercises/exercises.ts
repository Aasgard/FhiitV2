import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {IExercise} from "../../providers/models/exercise-model";
import {AngularFireDatabase} from "@angular/fire/database";
import {HttpClient} from "@angular/common/http";
// import * as moment from 'moment';
import {MockupsProvider} from "../../providers/mockups/mockups";
import {ExercisesProvider} from "../../providers/exercises/exercises";
import "rxjs-compat/add/operator/finally";

@IonicPage()
@Component({
    selector: 'page-exercises',
    templateUrl: 'exercises.html',
})
export class ExercisesPage {

    public exercisesList: IExercise[];
    public sortedExercicesList: Object;
    public sortedExercicesListKeys: string[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private exercisesMockupsService: MockupsProvider,
        private actionSheetCtrl: ActionSheetController,
        private db: AngularFireDatabase,
        private httpGet: HttpClient,
        private exercisesService: ExercisesProvider) {

    }

    public ionViewWillEnter(): void {
        this.sortedExercicesList = {};
        this.sortedExercicesListKeys = [];
        this.exercisesList = [];
        // We get the exercises here
        this.exercisesService.getAllExercises().subscribe(wsExercises => {
            this.exercisesList = wsExercises;
            this.sortExericesByLetter();
        }, error => {
            alert(error);
        });
    }

    public onAddExercisesButtonClicked(): void {
        alert('Ouverture de la modale d\'ajout');
    }

    public onExerciseItemClicked(exercise: IExercise): void {
        // Ajouter aux favoris
        // Modifier
        // Voir exercice
        const actionSheet = this.actionSheetCtrl.create({
            title: null,
            buttons: [
                {
                    text: 'Voir',
                    handler: () => {
                        alert(JSON.stringify(exercise));
                    }
                }, {
                    text: 'Modifier',
                    handler: () => {
                        console.log('Open CreateModifyExercise modal');
                    }
                }, {
                    text: 'Ajouter aux favoris',
                    cssClass: 'green-actionsheet-button',
                    handler: () => {
                        console.log('Trigger AddToFavoriteExercises method');
                    }
                }, {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    private sortExericesByLetter(): void {
        // We iterate on the exercises list
        this.exercisesList.forEach((exercise: IExercise) => {
            const firstLetter: string = exercise.name[0];
            if (!(firstLetter in this.sortedExercicesList)) {
                this.sortedExercicesList[firstLetter] = [];
            }
            this.sortedExercicesList[firstLetter].push(exercise);
        });
        this.sortedExercicesListKeys = Object.keys(this.sortedExercicesList).sort();
        console.log('this.sortedExercicesList', this.sortedExercicesList);
    }
}
