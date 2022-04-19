import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

export enum SCREEN_SIZE {
    XS, //0~575
    SM, //576~767
    MD, //768~993
    LG, //992~1199
    XL  //1200
}

@Injectable({
    providedIn: 'root'
})
export class ResizeService {

    get onResize$(): Observable<SCREEN_SIZE> {
        return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
    }

    private resizeSubject: Subject<SCREEN_SIZE>;

    constructor() {
        this.resizeSubject = new Subject();
    }

    onResize(size: SCREEN_SIZE) {
        this.resizeSubject.next(size);
    }

}
