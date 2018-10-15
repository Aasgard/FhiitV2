import {Component, ViewChild} from '@angular/core';
import {HomePage} from '../home/home';
import {WorkoutsPage} from "../workouts/workouts";
import {ExercisesPage} from "../exercises/exercises";
import {OptionsPage} from "../options/options";
import {NavController, Tabs} from "ionic-angular";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    @ViewChild('menuTabs') tabRef: Tabs;

    tab1Root = HomePage;
    tab2Root = WorkoutsPage;
    tab3Root = ExercisesPage;
    tab4Root = OptionsPage;

    constructor(private navCtrl: NavController) {
    }
}
