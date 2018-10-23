import {Component, Input} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {IExercise} from "../../providers/models/exercise-model";

@Component({
    selector: 'view-exercise-modal',
    templateUrl: 'view-exercise-modal.html'
})
export class ViewExerciseModalComponent {

    @Input()
    public inputExercise: IExercise;

    constructor(private viewCtrl: ViewController, private navParams: NavParams) {
        this.inputExercise = this.navParams.get('inputExercise');
    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }

}
