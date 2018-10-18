import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {IExercise} from "../../datacenter/models/exercise-model";
import {AngularFireDatabase} from "@angular/fire/database";

@IonicPage()
@Component({
    selector: 'page-exercises',
    templateUrl: 'exercises.html',
})
export class ExercisesPage {

    public exercisesList: IExercise[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private db: AngularFireDatabase) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExercisesPage');
        // this.db.object('exercises').valueChanges().subscribe(wsReturn => {
        //     console.log(wsReturn);
        // });
        const pushId = this.db.createPushId();
        this.db.object(`exercises/${pushId}`).set({
            test: pushId
        });
    }

    public onExerciseItemClicked(): void {
        // Ajouter aux favoris
        // Modifier
        // Voir exercice
        const actionSheet = this.actionSheetCtrl.create({
            title: null,
            buttons: [
                {
                    text: 'Voir',
                    handler: () => {
                        console.log('Destructive clicked');
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
