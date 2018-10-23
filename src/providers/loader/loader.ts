import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Loading, LoadingController} from "ionic-angular";

@Injectable()
export class LoaderProvider {

    public loader: Loading;
    public loaderVisible: boolean = false;

    constructor(public http: HttpClient, public loaderCtrl: LoadingController) {
        this.loader = this.loaderCtrl.create({
            spinner: 'circles'
        });
    }

    public displayLoader(): void {
        if (!this.loader) {
            this.loader = this.loaderCtrl.create({
                spinner: 'circles'
            });
        }
        this.loaderVisible = true;
        this.loader.present();
    }

    public hideLoader(): void {
        if (this.loader) {
            this.loader.dismiss(setTimeout(() => {
                this.loaderVisible = false;
            }));
        }
        this.loader = null;
    }

    public loaderIsVisible(): boolean {
        return this.loaderVisible;
    }

}
