import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {HttpClient} from "@angular/common/http";
import {RouteUiService} from "../@core/shared/service/route-ui.service";
import {SlideDialogService} from "../@core/shared/service/slide-dialog.service";
import {SpinnerService} from "../@core/shared/service/spinner.service";
import {FormBuilder} from "@angular/forms";
import {GlobalDataService} from "../@core/shared/service/global.service";
import {ResizeService} from "../@core/shared/service/resize.service";


@Component({
    selector: 'app-violation',
    templateUrl: './violation.component.html',
    styleUrls: ['./violation.component.scss']
})
export class ViolationComponent implements OnInit {

    constructor(private http:HttpClient,
                protected routingService: RouteUiService,
                protected dialogService: SlideDialogService,
                protected spinnerService: SpinnerService,
                protected resizeService: ResizeService,
                protected fb: FormBuilder,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected gd: GlobalDataService) {}

    ngOnInit(): void {
        return this.getViolators();
    }

    violators:Array<any> = new Array<any>();
    url = 'http://172.105.240.245:4418/john'

    goMain() {
        this.router.navigate([COMPONENT_AIO.MAIN]);
    }

    getViolators(){
        this.http.get(this.url).subscribe((res:any)=>{
            this.violators = res.result.results;
            console.log(this.violators);
        })
    }
}