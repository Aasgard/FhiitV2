import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {IExercise} from "../../providers/models/exercise-model";
import {AngularFireDatabase} from "@angular/fire/database";
import {HttpClient} from "@angular/common/http";
import * as moment from 'moment';
import {MockupsProvider} from "../../providers/mockups/mockups";

@IonicPage()
@Component({
    selector: 'page-exercises',
    templateUrl: 'exercises.html',
})
export class ExercisesPage {

    public exercisesList: IExercise[] = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private exercisesMockupsService: MockupsProvider,
        private actionSheetCtrl: ActionSheetController,
        private db: AngularFireDatabase,
        private httpGet: HttpClient) {

    }

    public ngOnInit(): void {
        this.generateExercisesMockups();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExercisesPage');
        // this.db.object('exercises').valueChanges().subscribe(wsReturn => {
        //     console.log(wsReturn);
        // });
        // const pushId = this.db.createPushId();
        // this.db.object(`exercises/${pushId}`).set({
        //     test: pushId
        // });
    }

    public resetExercisesData(): void {
        this.db.object('exercises').set(null);
    }

    public generateExercisesMockups(): void {

        this.resetExercisesData();

        this.httpGet.get('assets/mocks/exercises1.json').subscribe((data: IExercise[]) => {
            if (data && data.length) {
                data.forEach((exercise: IExercise) => {
                    const uniqueId: string = this.db.createPushId();
                    exercise.id = uniqueId;
                    exercise.creationDate = moment(exercise.creationDate).format();

                    if (exercise.lastEditDate) {
                        exercise.lastEditDate = moment(exercise.lastEditDate).format();
                    }

                    this.db.object(`exercises/${uniqueId}`).set(exercise);
                });
            }
        });

        this.exercisesMockupsService.getMockupsExercises().finally(() => {

        }).subscribe((wsReturn: IExercise[]) => {
            this.exercisesList = wsReturn;
        }, (error) => {
            alert(JSON.stringify(error));
        });

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
                        console.log('Archive clicked');
                    }
                }, {
                    text: 'Ajouter aux favoris',
                    cssClass: 'green-actionsheet-button',
                    handler: () => {
                        console.log('Destructive clicked');
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

}
