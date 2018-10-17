import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {from} from "rxjs/observable/from";
import {AngularFireAuth} from "@angular/fire/auth";
import {Media, MediaObject} from '@ionic-native/media';
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
    selector: 'page-options',
    templateUrl: 'options.html',
})
export class OptionsPage {

    private mySound: MediaObject;

    constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private toasterCtrl: ToastController, private app: App, private media: Media) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OptionsPage');
    }

    public testSound(): void {
        if (this.mySound) {
            this.mySound.stop();
            this.mySound.release();
        }
        this.mySound = this.media.create('./assets/sounds/pokecenter_sample.mp3');
        this.mySound.play();

        // this.mySound.onSuccess.subscribe(() => console.log('Action is successful'));
        // this.mySound.onError.subscribe(error => console.log('Error!', error));
        // this.mySound.play();
        // this.mySound.release();
        // console.log(this.mySound);
    }

    public onSignoutButtonClicked(): void {
        from(this.afAuth.auth.signOut()).subscribe(() => {
            this.app.getRootNav().setRoot(LoginPage, {}, {
                animation: 'ios-transition'
            });
        }, (error) => {
            let errorToast = this.toasterCtrl.create({
                message: error,
                duration: 2000
            });
        })
    }

}
