import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    public ionViewDidLoad(): void {
        console.log('ionViewDidLoad LoginPage');
    }

    public onClassicLoginButtonClicked(): void {
        console.log('onClassicLoginButtonClicked::clicked()');
    }

    public onGoogleLoginButtonClicked(): void {
        console.log('onGoogleLoginButtonClicked::clicked()');
        this.navCtrl.push(TabsPage, {}, {
            animation: 'ios-transition'
        });
    }

}
