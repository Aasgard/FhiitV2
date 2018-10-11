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
        IonicModule.forRoot(MyApp)
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
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
