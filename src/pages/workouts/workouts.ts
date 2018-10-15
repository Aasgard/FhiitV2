import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-workouts',
    templateUrl: 'workouts.html',
})
export class WorkoutsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // let intervalId = setInterval(() => {
        //     this.secondes = this.secondes - 1;
        //     if (this.secondes === 0) clearInterval(intervalId)
        // }, 1000)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WorkoutsPage');
    }

}
