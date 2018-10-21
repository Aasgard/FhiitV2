import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {WorkoutsPage} from "../pages/workouts/workouts";
import {ExercisesPage} from "../pages/exercises/exercises";
import {OptionsPage} from "../pages/options/options";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {GooglePlus} from "@ionic-native/google-plus";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {Media} from '@ionic-native/media';
import {HttpClientModule} from "@angular/common/http";
import {MockupsProvider} from "../providers/mockups/mockups";
import { ExercisesProvider } from '../providers/exercises/exercises';
import {PipesModule} from "../pipes/pipes.module";

const firebaseConf = {
    apiKey: "AIzaSyDsRZHPp-TGqvU-0GqyWKFDcLjQWJD7HLo",
    authDomain: "fhiit-a70a6.firebaseapp.com",
    databaseURL: "https://fhiit-a70a6.firebaseio.com",
    projectId: "fhiit-a70a6",
    storageBucket: "fhiit-a70a6.appspot.com",
    messagingSenderId: "969579804181"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        LoginPage,
        WorkoutsPage,
        ExercisesPage,
        OptionsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConf),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        HttpClientModule,
        PipesModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage,
        LoginPage,
        WorkoutsPage,
        ExercisesPage,
        OptionsPage
    ],
    providers: [
        Media,
        StatusBar,
        GooglePlus,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        MockupsProvider,
        ExercisesProvider
    ]
})
export class AppModule {
}
