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
    }

    ionViewWillEnter(): void {
        this.db.list('exercises').valueChanges().subscribe(data => {
            this.data = data;
        });
    }

}
