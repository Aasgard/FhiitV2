import {Component} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-workouts',
    templateUrl: 'workouts.html',
})
export class WorkoutsPage {

    public data: any = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
        // let intervalId = setInterval(() => {
        //     this.secondes = this.secondes - 1;
        //     if (this.secondes === 0) clearInterval(intervalId)
        // }, 1000)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WorkoutsPage');
        const itemRef = this.db.object('exercises/6a6722eb-0043-4d98-83c6-76c209926630');
        itemRef.set(
            {
                "id": "6a6722eb-0043-4d98-83c6-76c209926630",
                "name": "Muscle-up",
                "description": "Mouvement tellement stylé",
                "isFavorite": true,
                "creationDate": "2018-10-16T09:37:36+02:00",
                "lastEditDate": "2018-10-12T16:10:36+02:00"
            }
        );

        this.db.object('exercises').valueChanges().subscribe(wsReturn => {
            this.data = wsReturn;
        });

    }

}
