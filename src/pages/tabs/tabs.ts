import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {WorkoutsPage} from "../workouts/workouts";
import {ExercisesPage} from "../exercises/exercises";
import {OptionsPage} from "../options/options";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = WorkoutsPage;
    tab3Root = ExercisesPage;
    tab4Root = OptionsPage;

    constructor() {

    }
}
