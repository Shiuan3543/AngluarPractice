import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteUiService} from '../@core/shared/service/route-ui.service';
import {GlobalDataService} from '../@core/shared/service/global.service';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {DIALOG_TYPE, SlideDialogService} from '../@core/shared/service/slide-dialog.service';
import {ResizeService} from '../@core/shared/service/resize.service';
import {SpinnerService} from '../@core/shared/service/spinner.service';
import {Observable} from 'rxjs';
import {GenericService} from '../@core/shared/service/generic.service';
import {ComponentType} from '@angular/cdk/overlay';
import {VerificationDialogComponent} from '../@core/shared/base/dialog/verification/verification-dialog.component';
import {BaseArrayComponent} from '../@core/shared/base/base-array.component';
import {IntraBankModel} from '../@core/shared/model/intra-bank.model';


@Component({
    selector: 'app-intra-bank-setting',
    templateUrl: './intra-bank-setting.component.html',
    styleUrls: ['./intra-bank-setting.component.scss']
})
export class IntraBankSettingComponent extends BaseArrayComponent<Array<IntraBankModel>> implements OnInit {

    //有摺
    hasPassbook: boolean = true;

    //本人帳戶
    isSelfAccount: boolean = false;

    baseModelList: Array<IntraBankModel> = [];

    constructor(protected routingService: RouteUiService,
                protected dialogService: SlideDialogService,
                protected spinnerService: SpinnerService,
                protected resizeService: ResizeService,
                protected fb: FormBuilder,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected gd: GlobalDataService,
                protected genericService: GenericService) {

        super(activatedRoute, routingService, dialogService, spinnerService, resizeService, router, fb, gd);

        console.log('this.gd.intraBankList: ', this.gd.intraBankList);
        if(this.gd.intraBankList && this.gd.intraBankList.length > 0) {
            this.baseModelList = this.gd.intraBankList;
            this.addAll(this.baseModelList);
        }else{
            this.add();
        }

        console.log('IntraBankModel: ', this.baseModelList);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    initData(): Observable<Object> {
        return new Observable((observer) => {
            observer.next(true); //true才會append FormGroup Validator
        });
    }

    resetFormControl(): void {
        console.log('resetFormControl');
        console.log('resetFormControl');
        console.log('resetFormControl');
        this.disableFormArrayControl("remitterAccount");
    }

    clearAndUpdateRelated(value: boolean) {
        this.hasPassbook = value;
        this.clear();
        console.log('clear origin data...');
        console.log('hasPassbook: ', this.hasPassbook);
    }

    validateBeforeRoute(baseModel: any, disableFormGroup: boolean | undefined): boolean {
        return true;
    }

    goNext() {
        console.log('this.myFormGroup 2: ', this.myFormGroup.getRawValue().baseModelFormArray);
        if(this.myFormGroup.valid && this.myFormGroup.getRawValue().baseModelFormArray.length > 0){ //有資料才儲存
            this.gd.intraBankList = this.myFormGroup.getRawValue().baseModelFormArray;
        }
        this.router.navigate(['/' + COMPONENT_AIO.INTRA_BANK_CONFIRM]);
    }

    clear(){
        this.myFormGroup.reset();
        this.baseModelFormArray.clear();
        this.baseModelList = [];
        this.add();
    }

    add(data ?: IntraBankModel){
        console.log('before add: ', this.myFormGroup.getRawValue())

        let intraBankModel = new IntraBankModel(); //預設有一筆
        intraBankModel.payeeAccount = '';
        intraBankModel.remitterAccount = '';
        intraBankModel.money = undefined;
        intraBankModel.memo = '';
        intraBankModel.hasPassbook = this.hasPassbook; //有摺/無摺

        console.log('intraBankModel.getValidators(): ', intraBankModel.getValidators());

        const modelForm = this.fb.group(intraBankModel.getValidators());
        this.baseModelFormArray.push(modelForm);

        // console.log('modelForm: ', modelForm);
        console.log('baseModelFormArray: ', this.baseModelFormArray);

        this.baseModelList.push(intraBankModel);
    }

    /**
     * Batch copy
     * @param baseModelList
     */
    addAll(baseModelList: Array<IntraBankModel>) {
        let intraBankModel = new IntraBankModel(); //預設有一筆

        baseModelList.forEach( (model: IntraBankModel)=> {
            Object.assign(intraBankModel, model); //clone 但不刪除 method

            console.log('intraBankModel.getValidators(): ', intraBankModel.getValidators());

            //create related form control
            const modelForm = this.fb.group(intraBankModel.getValidators());
            this.baseModelFormArray.push(modelForm);

            console.log('modelForm: ', modelForm);
        });


        console.log('baseModelFormArray: ', this.baseModelFormArray);

        this.baseModelList.push(intraBankModel);
    }

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

    test(){
        console.log('hasPassbook: ', this.hasPassbook);
        console.log('isSelfAccount: ', this.isSelfAccount);
        console.log(this.myFormGroup.getRawValue())
        if (this.myFormGroup.invalid) {
            this.showVerificationDialog(this.findInvalidControls());
            return;
        }
    }
}
