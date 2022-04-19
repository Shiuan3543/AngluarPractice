import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SpinnerService} from "../@core/shared/service/spinner.service";
import {ResizeService} from "../@core/shared/service/resize.service";
import {SlideDialogService} from "../@core/shared/service/slide-dialog.service";
import {RouteUiService} from "../@core/shared/service/route-ui.service";
import {GlobalDataService} from "../@core/shared/service/global.service";
import {TradeModel} from "../@core/shared/model/trade.model";





@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})


export class UserComponent implements OnInit{

   
    tradeList: Array<TradeModel> = [];
    url:'http://localhost:8080/'
    constructor(private http:HttpClient,
                protected routingService: RouteUiService,
                protected dialogService: SlideDialogService,
                protected spinnerService: SpinnerService,
                protected resizeService: ResizeService,
                protected fb: FormBuilder,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected gd: GlobalDataService) {


    }





    ngOnInit(): void {
        this.getUser();

    }



    getUser(){
        this.http.get("allAtm").subscribe((res:any) =>{
            this.tradeList = res;
            console.log(this.tradeList);
        })
    }
}