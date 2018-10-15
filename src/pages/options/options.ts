import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {from} from "rxjs/observable/from";
import {AngularFireAuth} from "@angular/fire/auth";
import {LoginPage} from "../login/login";

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private toasterCtrl: ToastController, private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
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
