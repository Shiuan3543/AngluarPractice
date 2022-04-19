import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../@core/shared/base/base.component';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {DIALOG_TYPE, SlideDialogService} from '../@core/shared/service/slide-dialog.service';
import {ModalService} from '../@core/shared/component/modal.service';
import {ResizeService} from '../@core/shared/service/resize.service';
import {SpinnerService} from '../@core/shared/service/spinner.service';
import {ApplyStartVO} from '../@core/shared/model/apply-start.model';
import {GenericService} from '../@core/shared/service/generic.service';
import {LocationStrategy} from '@angular/common';
import {ComponentType} from '@angular/cdk/overlay';
import {VerificationDialogComponent} from '../@core/shared/base/dialog/verification/verification-dialog.component';
import {CustomDialogService} from 'src/app/@core/shared/service/custom-dialog.service';
import {HttpClient} from "@angular/common/http";
import {Error} from "tslint/lib/error";






@Component({
    selector: 'app-identity',
    templateUrl: './identity.component.html',
    styleUrls: ['./identity.component.scss']
})
export class IdentityComponent extends BaseComponent<ApplyStartVO> implements OnInit {
    baseModel: ApplyStartVO;
    private tradeList: any;




    constructor(private http:HttpClient,
                protected routingService: RouteUiService,
                protected dialogService: SlideDialogService,
                protected spinnerService: SpinnerService,
                protected resizeService: ResizeService,
                protected fb: FormBuilder,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected gd: GlobalDataService,
                private modalService: ModalService,
                protected genericService: GenericService,
                private location: LocationStrategy,
                private customDialogService: CustomDialogService) {

        super(activatedRoute, routingService, dialogService, spinnerService, resizeService, router, fb, gd);

        this.activatedRoute.queryParams.subscribe(params => {
            //get parameters from url
        });
        this.tradeList = this.gd.tradeList;
    }




    ngOnInit() {
        this.baseModel = new ApplyStartVO();
        this.baseModel.idno = '';
        this.baseModel.phone = '';
        this.baseModel.ch1 = false;

        //Assign bind validators to myFormGroup
        this.myFormGroup = this.fb.group(this.baseModel.getValidators());

    }

    resetFormControl(value?: any): void {

    }

    validateBeforeRoute(baseModel: ApplyStartVO, disableFormGroup?: boolean): boolean {
        throw new Error('Method not implemented.');
    }
    saveuserId(){
        const body = [];
        for(let i in this.tradeList){
            const t = this.tradeList[i];
            body[i] = {"type":t.isCash,"ntdAount":t.money}
        }
        this.http.post("atm/getById" ,body).subscribe((res:any)=>{
            console.log("!!!")
        });
    }
    login(): void {
        console.log(this.myFormGroup.value);
        if (this.myFormGroup.valid) {
            console.log('login...');

                this.showSpinner();

                //存下來
                this.gd.idno = this.baseModel.idno;
                this.gd.phone = this.baseModel.phone;



                this.router.navigate([COMPONENT_AIO.MAIN], {
                    state: {
                        data: this.baseModel
                    }, queryParams: {}, skipLocationChange: false
                });

                // //登入
                // this.accountService.login3(this.baseModel).subscribe((response: ResponseVO<CaseVO>) => { //CaseVO
                //     console.log(this.getComponentName() + ' login3: ', response);
                //     // const caseVO: CaseVO = response.rtnObj;
                //     // const responseVO = caseVO.responseVO;
                //
                //     console.log('responseVO: ', responseVO);
                //
                //     let aioCaseDataVO: AIOCaseDataVO = responseVO.rtnObj;
                //     this.gd.caseData = aioCaseDataVO;
                //     // this.gd.token = caseVO.token; // 'kgiToken'
                //
                //     console.log('CaseData: ', aioCaseDataVO);
                //
                //     // console.log('token: ', this.gd.token);
                //     this.hideSpinner();
                //     if (response && response.rtnCode === RETURN_CODE.SUCCESSFUL) {
                //
                //         this.router.navigate([COMPONENT_AIO.MAIN], {
                //             state: {
                //                 data: this.baseModel
                //             }, queryParams: {}, skipLocationChange: false
                //         });
                //     } else {
                //         // TODO: 顯示錯誤訊息
                //         this.hideSpinner();
                //         console.log(response.rtnMessage);
                //         this.customerAlertDialog(response.rtnMessage)
                //         return true;
                //     }
                // });
        } else if (this.myFormGroup.invalid) {
            this.showVerificationDialog(this.findInvalidControls());
        }

    }

    goNext(disableFormGroup?: boolean) {
        super.goNext(disableFormGroup);
    }



    findInvalidControls() {
        const invalid = [];
        const controls = this.myFormGroup.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                const errorsInfo = {};
                errorsInfo['name'] = this.myFormGroup.controls[name]?.errors?.name;
                errorsInfo['message'] = this.myFormGroup.controls[name]?.errors?.message;
                invalid.push(errorsInfo);
            }
        }
        return invalid;
    };

    public showVerificationDialog<T>(data: any, component?: ComponentType<T>) {
        let contentComponent: any = VerificationDialogComponent;
        if (component) {
            contentComponent = component;
        }

        const dialog = this.myDialogService.open(contentComponent, {
            width: '573px',
            height: '200px',
            leftTitle: false,
            centerTitle: true,
            title: '以下欄位尚未通過驗證：',
            data: data,
            style: this.dialogType
        });

        //從 dialog 取回資料
        dialog.afterClosed().subscribe((result) => {
            console.log('Result data: ', result);
        });
    }

    // 開啟條款的頁面
    openTerms(title: string, termsName: string, data: any) {
        this.modalService.openTermsModalWithTermsTable(title, termsName);
    }

    customerAlertDialog(text: string): void {
        this.customDialogService.alert(text);
    }

    /**
     * 身分證轉大寫
     * */
    upperCase(event): void {
        if (!event.target.value) {
            return;
        }
        event.target.value = event.target.value.trim().toUpperCase();
    }
}
