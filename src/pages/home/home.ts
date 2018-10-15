import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public loggedInUser: User;

    constructor(public navCtrl: NavController, private afAuth: AngularFireAuth) {
        this.afAuth.user.subscribe(connectedUser => {
            console.log(connectedUser);
            this.loggedInUser = connectedUser;
        });
    }

}
