import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseVO} from 'src/app/@core/shared/model/responseVO';
import {SERVER_URL} from 'src/app/@core/shared/app.constants';
import { GlobalDataService } from './global.service';

@Injectable({providedIn: 'root'})
export class RouteUiService {

    private time: Date = new Date();
    private resourceUrl = '/flow/routing';
    private browserLogUrl = '/publicApi/log/saveBrowseRecord';

    constructor(private http: HttpClient,private gd:GlobalDataService) {

    }
}
