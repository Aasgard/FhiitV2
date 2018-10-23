import {Component} from '@angular/core';
import {
    ActionSheetController,
    IonicPage,
    LoadingController,
    ModalController,
    NavController,
    NavParams
} from 'ionic-angular';
import {IExercise} from "../../providers/models/exercise-model";
import {AngularFireDatabase} from "@angular/fire/database";
import {HttpClient} from "@angular/common/http";
// import * as moment from 'moment';
import {MockupsProvider} from "../../providers/mockups/mockups";
import {ExercisesProvider} from "../../providers/exercises/exercises";
import "rxjs-compat/add/operator/finally";
import {LoaderProvider} from "../../providers/loader/loader";
import {ViewExerciseModalComponent} from "../../components/view-exercise-modal/view-exercise-modal";

@IonicPage()
@Component({
    selector: 'page-exercises',
    templateUrl: 'exercises.html',
})
export class ExercisesPage {

    public exercisesList: IExercise[];
    public favoriteExercisesList: IExercise[];
    public sortedExercicesList: Object;
    public sortedExercicesListKeys: string[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loaderService: LoaderProvider,
        private exercisesMockupsService: MockupsProvider,
        private actionSheetCtrl: ActionSheetController,
        private db: AngularFireDatabase,
        private modalCtrl: ModalController,
        private httpGet: HttpClient,
        private exercisesService: ExercisesProvider) {

    }

    public ionViewWillEnter(): void {
        this.getExercises();
    }

    public onAddExercisesButtonClicked(): void {
        alert('Ouverture de la modale d\'ajout');
    }

    public onExerciseItemClicked(exercise: IExercise): void {
        // Ajouter aux favoris
        // Modifier
        // Voir exercice
        const actionSheet = this.actionSheetCtrl.create({
            title: null,
            buttons: [
                {
                    text: 'Voir',
                    handler: () => {
                        let viewExercise = this.modalCtrl.create(ViewExerciseModalComponent, { inputExercise: exercise });
                        viewExercise.present();
                    }
                }, {
                    text: 'Modifier',
                    handler: () => {
                        console.log('Open CreateModifyExercise modal');
                    }
                }, {
                    text: exercise.isFavorite ? 'Supprimer des favoris' : 'Ajouter aux favoris',
                    handler: () => {
                        exercise.isFavorite ? console.log('Suppression de favori') : console.log('Ajout de favori');
                    }
                }, {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    private buildFavoriteExercises(): void {
        this.favoriteExercisesList = this.exercisesList.filter(exercise => exercise.isFavorite);
    }

    private getExercises(): void {
        this.loaderService.displayLoader();
        this.sortedExercicesList = {};
        this.sortedExercicesListKeys = [];
        this.favoriteExercisesList = [];
        this.exercisesList = [];
        // We get the exercises here
        this.exercisesService.getAllExercises().subscribe(wsExercises => {
            this.exercisesList = wsExercises;
            // We build the Favorites
            this.buildFavoriteExercises();
            // We sort the Exercises by letter
            this.sortExericesByLetter();
            // We hide the loader when scripts are over
            this.loaderService.hideLoader();
        }, error => {
            alert(error);
            this.loaderService.hideLoader();
        });
    }

    private sortExericesByLetter(): void {
        // We iterate on the exercises list
        this.exercisesList.forEach((exercise: IExercise) => {
            const firstLetter: string = exercise.name[0];
            if (!(firstLetter in this.sortedExercicesList)) {
                this.sortedExercicesList[firstLetter] = [];
            }
            this.sortedExercicesList[firstLetter].push(exercise);
        });
        this.sortedExercicesListKeys = Object.keys(this.sortedExercicesList).sort();
        console.log('this.sortedExercicesList', this.sortedExercicesList);
    }
}
