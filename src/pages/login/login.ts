import {IonicPage, LoadingController, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
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
                private toasterCtrl: ToastController,
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
        this.signoutCurrentUser();

        if (!this.loggedUser) {
            loader.present();

            from(this.gplus.login({
                'webClientId': '969579804181-5937s2r50gac8mmm5k9qn9nhk0mmhhtq.apps.googleusercontent.com'
            })).finally(() => {
                loader.dismiss();
            }).subscribe( user => {
                this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken)).then(userConnected => {
                    if (userConnected) {
                        this.loggedUser = userConnected;
                        this.navCtrl.setRoot(TabsPage, {}, {
                            animation: 'ios-transition'
                        });
                    }
                }).catch(error => {
                    let toast = this.toasterCtrl.create({
                        message: error,
                        duration: 2000
                    });
                })
            }, error => {
                let toast = this.toasterCtrl.create({
                    message: error,
                    duration: 2000
                });
            });
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

    private signoutCurrentUser(): void {
        from(this.afAuth.auth.signOut()).subscribe(() => {
            this.loggedUser = null;
        }, (error) => {
            let errorToast = this.toasterCtrl.create({
                message: error,
                duration: 2000
            });
        })
    }

}
