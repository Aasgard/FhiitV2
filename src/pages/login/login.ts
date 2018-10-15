import {IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {GooglePlus} from "@ionic-native/google-plus";
import * as firebase from "firebase";
import {auth, User} from "firebase";
import {TabsPage} from "../tabs/tabs";
import {from} from "rxjs/observable/from";
import UserCredential = firebase.auth.UserCredential;
import {Component} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public loggedUser: User = null;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private afAuth: AngularFireAuth,
                private loadingCtrl: LoadingController,
                private gplus: GooglePlus,
                private platform: Platform) {
        this.afAuth.user.subscribe(user => {
            this.loggedUser = user;
        });
    }

    public ionViewDidLoad(): void {
        console.log('ionViewDidLoad LoginPage');
        if (this.loggedUser) {
            this.navCtrl.push(TabsPage, {}, {
                animation: 'ios-transition'
            });
        }
    }

    public onClassicLoginButtonClicked(): void {
        console.log('onClassicLoginButtonClicked::clicked()');
    }

    public onGoogleLoginButtonClicked(): void {
        console.log('onGoogleLoginButtonClicked::clicked()');
        if (this.platform.is('cordova')) {
            this.nativeGoogleLogin();
        } else {
            this.webGoogleLogin();
        }
    }

    private nativeGoogleLogin(): void {
        const loader = this.loadingCtrl.create();

        if (!this.loggedUser) {
            loader.present();
            this.gplus.login({
                'webClientId': '826626010601-fcjt337ot5qahroestmkdnisn53tlm3u5.apps.googleusercontent.com'
            }).then(user => {
                this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken)).then(userConnected => {
                    if (userConnected) {
                        this.loggedUser = userConnected;
                    }
                }).catch(error => {
                    alert(JSON.stringify(error));
                })
            }).catch(err => {
                alert(JSON.stringify(err));
            })
        }
    }

    private webGoogleLogin(): void {
        from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())).subscribe((wsUser: UserCredential) => {
            this.loggedUser = wsUser.user;
            if (this.loggedUser) {
                this.navCtrl.setRoot(TabsPage, {}, {
                    animation: 'ios-transition'
                });
            }
        });
    }

}
