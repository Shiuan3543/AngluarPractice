import { MODE_ENUM, RETURN_CODE } from '../app.constants';
import { AfterContentInit, AfterViewInit, Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { RouteUiService } from '../service/route-ui.service';
import { GlobalDataService } from '../service/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BaseModel } from './base.model';
import { DialogComponent } from '../component/dialog/dialog.component';
import { DIALOG_TYPE, DialogConfig, SlideDialogService } from '../service/slide-dialog.service';
import { ResizeService, SCREEN_SIZE } from '../service/resize.service';
import { ComponentType } from '@angular/cdk/overlay';
import { GenericDialogComponent } from './dialog/info/generic-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm/confirm-dialog.component';
import { SpinnerRef, SpinnerService } from '../service/spinner.service';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {COMPONENT_AIO} from '../routing/aio.path';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class BaseComponent<T extends BaseModel> implements OnInit, AfterViewInit, AfterContentInit, OnDestroy { // implements OnInit, OnDestroy{

    dataInitialization = false;

    subscription = new Subscription();

    valueChange = new EventEmitter<any>();

    @Input()
    mode: MODE_ENUM = MODE_ENUM.UPDATE; // = MODE_ENUM.READ;

    @Input()
    fillPersonMode: MODE_ENUM = MODE_ENUM.READ;

    @Input()
    fillWorkMode: MODE_ENUM = MODE_ENUM.READ;

    @Input()
    fillOtherMode: MODE_ENUM = MODE_ENUM.READ;

    componentTitle: string;

    // 控制下一步的按鈕 是否能夠開啟
    nextButtonDisable = false;

    isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);

    innerWidth: number; //螢幕解析度 width
    screenType: SCREEN_SIZE = SCREEN_SIZE.MD;

    dialogType: DIALOG_TYPE = DIALOG_TYPE.DIALOG;
    spinner: SpinnerRef<any>;

    @HostListener('window:resize', ['$event'])
    private onResize() {
        // console.log('innerWidth: ', window.innerWidth);
        this.innerWidth = window.innerWidth;


        if (this.innerWidth < 575) {
            this.screenType = SCREEN_SIZE.XS;
            this.dialogType = DIALOG_TYPE.OFFCANVAS;
        } else if (this.innerWidth < 768) {
            this.screenType = SCREEN_SIZE.SM;
            this.dialogType = DIALOG_TYPE.OFFCANVAS;
        } else if (this.innerWidth < 992) {
            this.screenType = SCREEN_SIZE.MD;
            this.dialogType = DIALOG_TYPE.DIALOG;
        } else if (this.innerWidth < 1200) {
            this.screenType = SCREEN_SIZE.LG;
            this.dialogType = DIALOG_TYPE.DIALOG;
        } else {
            this.screenType = SCREEN_SIZE.XL;
            this.dialogType = DIALOG_TYPE.DIALOG;
        }

        this.detectScreenSize(this.screenType);
    }

    //每頁基本資料
    baseModel: T;
    // abstract baseModel: new() => T;

    currentStep: string;
    totalSteps: string;

    myFormGroup: FormGroup;

    //是否為第一頁(startBpm)
    firstPage: boolean = false;


    //從上頁但進來本頁的資料, refresh 就會消失, 必須從 backend重查 or read from sessionStorage
    data: any;

    newable: new () => T;

    urlPrefix: string;

    componentName: string = this.constructor.toString().match(/\w+/g)[1];

    protected constructor(protected activatedRoute: ActivatedRoute,
        protected routingService: RouteUiService,
        protected myDialogService: SlideDialogService,
        protected spinnerService: SpinnerService,
        protected resizeService: ResizeService,
        protected router: Router,
        protected fb: FormBuilder,
        protected gd: GlobalDataService) {

        this.innerWidth = window.innerWidth;

        // this.disableBackNavigation();

        // console.log('userAgent: ', window.navigator.userAgent);
        const flowType = localStorage.getItem('_aioRoutingMockupType');

        this.activatedRoute.data.subscribe((data: { module: string, sourceId: string, type: string }) => {
            console.log('Basic router data: ', data);
        });


        this.myFormGroup = new FormGroup({});
        // this.subscription.add( this.ngAfterContentInit())
    }

    initData(): Observable<Object> {
        return undefined;
    }

    /**
     * 更新 formGroup controls
     */
    resetFormControl(value?: any): void {

    }

    // 整個流程的stage  操作formController
    onAfterFormControlInited(): void {
        // 這裏 是在 form init   需要讓 formController  來使用

        // this.initData().subscribe((result: boolean) => {
        //     // console.log('initData result: ', result);
        //
        //     this.appendFormValidator(result);
        // });

    }

    // assignDataType<T>(T): void {
    //     this.dataType = T;
    //     // console.log('dataType: ', this.dataType);
    //     if(this.gd.getData(this.dataType))
    //         this.baseModel = this.gd.getData(this.dataType);
    // }

    ngOnInit(): void {
        console.log('[BaseComponent] ngOnInit');
        console.log('[BaseComponent] baseModel: ', this.baseModel);


    }

    /**
     * 當 Angular 把外部內容投影進元件檢視或指令所在的檢視之後呼叫
     * 第一次 ngDoCheck() 之後呼叫，只調用一次
     */
    ngAfterContentInit(): void {
        if (this.baseModel) {
            this.appendFormValidator(this.dataInitialization);
        }
    }

    appendFormValidator(dataInitialization: boolean) {
        this.dataInitialization = dataInitialization;

        if (this.dataInitialization) {
            let formValidator = this.prepareFormValidator();

            // console.log('appendFormValidator.... :', formValidator);

            if (formValidator) {
                this.myFormGroup = this.fb.group(formValidator);
            } else {
                this.myFormGroup = new FormGroup({}); //no validators
            }

            //需調用否則 prepareFormValidator時的 data 不會進去
            if (this.myFormGroup && this.baseModel) {
                this.myFormGroup.patchValue(this.baseModel);
            }

            this.resetFormControl();

            this.onAfterFormControlInited();
        }
    }


    ngAfterViewInit(): void {
        //scroll to top
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
        }, 100);
        window.scrollTo(0, 0);
        // console.log('ngAfterViewInit: ', this.baseModel);
    }

    ngOnDestroy() {
        this.hideSpinner();
    }

    private detectScreenSize(width: SCREEN_SIZE) {
        this.resizeService.onResize(width);
    }

    /**
     * 取得欄位名稱
     * @param obj
     * @param type
     */
    // getFieldName = (obj) => new Proxy(obj, {
    //     get(_, key) {
    //         return key;
    //     }
    // });
    getFieldName = (obj) => {
        return new Proxy(obj, {
            get(_, key) {
                return key;
            }
        });
    };

    updateFormControlValue(controlName: string, value: any) {

        console.log('value', value);

        if (this.myFormGroup.get(controlName)) {
            // console.log('updateFormControlValue: ' + controlName + ' / value: ' + value);
            this.myFormGroup.get(controlName).setValue(value);
        } else {
            console.log('control: ', this.myFormGroup.get(controlName));

        }
    }

    getFormControlValue(controlName: string) {
        return this.myFormGroup.get(controlName).value;
    }

    enableFormControl(controlName: string) {
        console.log('enable control: ' + controlName);

        // this.myFormGroup.get(controlName).enabled;
        this.myFormGroup.get(controlName).setValidators(this.baseModel.getValidator(controlName));
        // this.myFormGroup.get(controlName).updateValueAndValidity({onlySelf:true});
        this.myFormGroup.get(controlName).updateValueAndValidity();
    }

    disableFormControl(controlName: string) {
        // console.log('disable control: ' + controlName);

        if (this.myFormGroup.get(controlName)) {
            this.myFormGroup.get(controlName).setValidators(null);
            this.myFormGroup.get(controlName).updateValueAndValidity({ onlySelf: true });
        }
    }


    enableFormArray(arrayName: string, controlName: string, index: number) {
        // console.log('enable arrayName: ' + arrayName);
        // console.log('enable control: ' + controlName);
        const formArray = this.myFormGroup.get(arrayName) as FormArray;
        // this.myFormGroup.get(controlName).enabled;
        formArray.at(index).get(controlName).setValidators(this.baseModel.getValidator(controlName));
        // this.myFormGroup.get(controlName).updateValueAndValidity({onlySelf:true});
        formArray.at(index).get(controlName).updateValueAndValidity({ onlySelf: true });
    }

    disableFormArray(arrayName: string, controlName: string, index: number) {
        // console.log('disable arrayName: ' + arrayName);
        // console.log('disable control: ' + controlName);
        // this.myFormGroup.get(controlName).disabled;
        const formArray = this.myFormGroup.get(arrayName) as FormArray;
        formArray.at(index).get(controlName).setValidators(null);
        formArray.at(index).get(controlName).updateValueAndValidity({ onlySelf: true });
    }

    getComponentName(): string {
        return '[' + this.componentName + ']';
    }

    // abstract ngOnInit(): void;
    // abstract ngOnDestroy(): void;

    // @Output()
    // onNextChange: EventEmitter<any> = new EventEmitter<any>();
    //
    // @Output()
    // onBackChange: EventEmitter<any> = new EventEmitter<any>();

    private init(type: { new(): T }): T {
        return new type();
    }

    prepareFormValidator() { //-> appendFormValidator()
        // console.log(this.getComponentName() + ' FormValidator: ', this.baseModel);

        if (this.baseModel) {
            return this.baseModel.getValidators();
        }
        return undefined;
    }

    /**
     * 取得上一步該前往哪個 component info
     */

    // abstract onBack(routingModel: RoutingModel<any>): void;

    /**
     * 檢查資料格式正確性, 若驗證錯誤,回傳 false
     */
    abstract validateBeforeRoute(baseModel: T, disableFormGroup?: boolean): boolean;

    public result;

    //Just for testing
    public showEditDialog<T>(data: string) {
        console.log('showEditDialog type: ', this.dialogType);
        //console.log('showConfirmDialog screenType: ', this.screenType);


        // const dialog = this.myDialogService.open(EngNameComponent, {
        //     width: '400px',
        //     height: '300px',
        //     title: '',
        //     data: data,
        //     style: this.dialogType
        // });
        //
        // //從 dialog 取回資料
        // dialog.afterClosed().subscribe((result) => {
        //     console.log('Result data: ', result);
        //
        //     // this.result = JSON.stringify(result);
        // });

    }

    public showConfirmDialog<T>(data: string) {
        console.log('showConfirmDialog type: ', this.dialogType);
        //console.log('showConfirmDialog screenType: ', this.screenType);

        const dialog = this.myDialogService.open(ConfirmDialogComponent, {
            width: '400px',
            height: '200px',
            title: '',
            data: data,
            style: this.dialogType
        });

        //從 dialog 取回資料
        dialog.afterClosed().subscribe((result) => {
            console.log('Result data: ', result);

            // this.result = JSON.stringify(result);
        });

    }

    public showDialogMenu(style?: string) {
        const dialog = this.myDialogService.open(DialogComponent, {
            width: '573px',
            height: '200px',
            title: 'My Title',
            style: DIALOG_TYPE.DIALOG
        });

    }

    public showOffcanvasMenu(style?: string) {
        const dialog = this.myDialogService.open(DialogComponent, {
            width: '400px',
            height: '200px',
            title: 'My Title',
            style: DIALOG_TYPE.OFFCANVAS
        });

    }

    public showErrorDialog<T>(data: any, component?: ComponentType<T>) {
        let contentComponent: any = GenericDialogComponent;
        if (component) {
            contentComponent = component;
        }

        const dialog = this.myDialogService.open(contentComponent, {
            width: '400px',
            height: '200px',
            title: '',
            data: data,
            style: this.dialogType
        });

        //從 dialog 取回資料
        dialog.afterClosed().subscribe((result) => {
            console.log('Result data: ', result);
            this.spinnerService.hide();
        });
    }

    public showConfirmation(width?: string, height?: string) {
        // data?: any;
        // header?: string;
        // footer?: string;
        // width?: string;
        // height?: string;
        // closeOnEscape?: boolean;
        // baseZIndex?: number;
        // autoZIndex?: boolean;
        // dismissableMask?: boolean;
        // rtl?: boolean;
        // style?: any;
        // contentStyle?: any;
        // styleClass?: string;
        // transitionOptions?: string;
        // closable?: boolean;
        // showHeader?: boolean;
        // modal?: boolean;

        // this.refDialog = this.dialogService.open(DialogComponent, {
        //     header: '',
        //     showHeader: true,
        //     height: '50%',
        //     width: '50%',
        //     data: 'data',
        //     transitionOptions: '.12s cubic-bezier(0, 0, 0.2, 1)',
        //     closable: true,
        //     closeOnEscape: true,
        //     contentStyle: {"max-height": "500px", "overflow": "auto"},
        //     // footer: 'hey',
        //     baseZIndex: 10000,
        //     modal: true,
        //     style: {'top': '50%', 'transition': 'all 0.5s'}
        // });

        // this.refDialog.onClose.subscribe((baseModel: T) =>{
        //     if (baseModel) {
        //        // this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
        //     }
        // });
    }

    showSpinner() {
        if (!this.spinner) {
            this.spinner = this.spinnerService.show({ message: '請稍候...' });
        }

        // setTimeout(() => {
        //     this.spinnerService.hide();
        // }, 10000);
    }

    hideSpinner() {
        this.spinner = undefined;
        this.spinnerService.hide();
    }

    goMain(){
        this.router.navigate(['/'+ COMPONENT_AIO.MAIN]);
    }

    goNext(disableFormGroup?: boolean): void {
        console.log('this.baseModel: ', this.baseModel);
        console.log('this.getValidators: ', this.baseModel.getValidators());

        if (this.baseModel && this.baseModel.getValidators()) {
            //如果沒有使用 ngModel, 傳送前需同步最新資料
            console.log('this.baseModel.getValidators(): ', this.baseModel.getValidators());
        }

        if (disableFormGroup) { //關閉 forGroup 而使用 ngModel 資料
            console.log('Using model Value:', this.baseModel);
        } else {
            console.log('Using FormGroup Value:', this.myFormGroup.getRawValue());
        }

        if (!this.validateBeforeRoute(this.baseModel, disableFormGroup)) {
            console.log(this.getComponentName() + ' validate data fail.');
            return;
        }

        // this.showSpinner();
    }

    goBack(): void {
        console.log(this.getComponentName() + 'goBack 尚未實作');
        return;
    }

    writeBrowserLog(type: string): void {
        console.log(this.getComponentName() + 'writeBrowserLog 尚未實作');
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

    private disableBackNavigation() {
        history.pushState(null, null, window.location.href);
        window.onpopstate = function (e) {
            window.history.go(1);
        }
    }

}
