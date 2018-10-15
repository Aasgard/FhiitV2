import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-exercises',
    templateUrl: 'exercises.html',
})
export class ExercisesPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExercisesPage');
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
