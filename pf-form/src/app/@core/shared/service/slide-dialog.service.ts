import * as core from '@angular/core';
import {
    Component,
    ComponentRef,
    HostListener,
    Injectable,
    InjectionToken,
    Injector,
    Input,
    NgModule,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ComponentType, Overlay, OverlayModule, OverlayRef} from '@angular/cdk/overlay';
import {CdkPortalOutlet, ComponentPortal, Portal, PortalModule} from '@angular/cdk/portal';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {config, Observable, Subject} from 'rxjs';

export enum DIALOG_TYPE {
    DIALOG = 'dialog', // normal
    OFFCANVAS = 'offcanvas', // offcanvas
}

@Injectable({
    providedIn: 'root'
})
export class SlideDialogService {
    //Refer to:
    //https://johnbwoodruff.com/posts/angular-cdk-dialog/

    constructor(private overlay: Overlay, private myInjector: Injector) {
    }
    // private _keyboardDispatcher;
    // private _document;
    // private _location;
    // private _outsideClickDispatcher;

    public open<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef<T> {
        // config = config || {width: 'auto', title: ''};

        // Globally centered position strategy
        let positionStrategy = this.overlay
            .position()
            .global()
            // .top("0")
            // .right("100px")
            .left('0')
            .bottom('0')
            .centerHorizontally();

        // console.log('config: ', config);
        // console.log('config.style: ', config.style);

        if (config && config.style && !config.style.endsWith('offcanvas')) {
            positionStrategy = positionStrategy.centerVertically();//置中
        }
        // console.log('positionStrategy: ', positionStrategy);
        // const positionStrategy2 = this.overlay.position()
        //     .flexibleConnectedTo(component)
        //     .withPositions([
        //         {
        //             originX: 'end',
        //             originY: 'bottom',
        //             overlayX: 'end',
        //             overlayY: 'top',
        //         }
        //     ]);

        const overlayRef = this.overlay.create({
            hasBackdrop: true, // 是否顯示遮罩層
            positionStrategy, // 位置策略
            backdropClass: 'white-backdrop', // 調整遮罩背景顏色 ＆ 模糊度
            scrollStrategy: this.overlay.scrollStrategies.block(), // 禁止遮罩滾動
            // scrollStrategy: this.overlay.scrollStrategies.noop(),
            // scrollStrategy: this.overlay.scrollStrategies.reposition(), // 滾動策略
            panelClass: 'dialog-container',
            width: config.style.endsWith('offcanvas') ? '100%' : config.width, //offcanvas 100%
            // maxWidth: "90vw",
            // height: config.height
        });

        //parent UI component
        const parentDialog = new ComponentPortal(DialogContainerComponent);
        const dialogContainerRef = overlayRef.attach(parentDialog);
        overlayRef.backdropClick().subscribe(() => {console.log("test")}, () => console.log("ERROR"), () => console.log("COMPLETE"));
        // this._overlayRef.backdropClick().subscribe(() => this.close()}, () => console.log("ERROR"), () => console.log("COMPLETE"));
        dialogContainerRef.instance.leftTitle = config.leftTitle;
        dialogContainerRef.instance.centerTitle = config.centerTitle;
        dialogContainerRef.instance.dialogTitle = config.title;
        dialogContainerRef.instance.data = config.data;

        dialogContainerRef.instance.confirmContent = config.confirmContent?config.confirmContent:'';
        dialogContainerRef.instance.cancelContent = config.cancelContent?config.cancelContent:'';
        // Create dialogRef to return
        const dialogRef = new DialogRef<T>(overlayRef);

        // Create injector to be able to reference the DialogRef from within the component
        const injector = this.createInjector(dialogRef, config);
        //child UI component
        const portal = new ComponentPortal(component, null, injector);
        dialogContainerRef.instance.selectedPortal = portal;
        const componentRef = dialogContainerRef.instance.attach();
        dialogRef.componentInstance = componentRef;

        this.applyDialogProperties(dialogContainerRef, overlayRef, config);
        return dialogRef;
    }


    public inputOffcanvasOpen<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef<T> {
        // config = config || {width: 'auto', title: ''};

        // Globally centered position strategy
        let positionStrategy = this.overlay
            .position()
            .global()
            // .top("0")
            // .right("100px")
            .left('0')
            .bottom('0')
            .centerHorizontally();

        // console.log('config: ', config);
        // console.log('config.style: ', config.style);

        if (config && config.style && !config.style.endsWith('offcanvas')) {
            positionStrategy = positionStrategy.centerVertically();//置中
        }
        // console.log('positionStrategy: ', positionStrategy);
        // const positionStrategy2 = this.overlay.position()
        //     .flexibleConnectedTo(component)
        //     .withPositions([
        //         {
        //             originX: 'end',
        //             originY: 'bottom',
        //             overlayX: 'end',
        //             overlayY: 'top',
        //         }
        //     ]);

        const overlayRef = this.overlay.create({
            hasBackdrop: true, // 是否顯示遮罩層
            positionStrategy, // 位置策略
            backdropClass: 'white-backdrop', // 調整遮罩背景顏色 ＆ 模糊度
            scrollStrategy: this.overlay.scrollStrategies.block(), // 禁止遮罩滾動
            // scrollStrategy: this.overlay.scrollStrategies.noop(),
            // scrollStrategy: this.overlay.scrollStrategies.reposition(), // 滾動策略
            panelClass: 'dialog-container',
            width: config.style.endsWith('offcanvas') ? '100%' : config.width, //offcanvas 100%
            // maxWidth: "90vw",
            // height: config.height
        });

        //parent UI component
        const parentDialog = new ComponentPortal(DialogContainerComponent);
        const dialogContainerRef = overlayRef.attach(parentDialog);
        dialogContainerRef.instance.leftTitle = config.leftTitle;
        dialogContainerRef.instance.centerTitle = config.centerTitle;
        dialogContainerRef.instance.dialogTitle = config.title;
        dialogContainerRef.instance.data = config.data;

        dialogContainerRef.instance.confirmContent = config.confirmContent?config.confirmContent:'';
        dialogContainerRef.instance.cancelContent = config.cancelContent?config.cancelContent:'';
        // Create dialogRef to return
        const dialogRef = new DialogRef<T>(overlayRef);

        // Create injector to be able to reference the DialogRef from within the component
        const injector = this.createInjector(dialogRef, config);
        //child UI component
        const portal = new ComponentPortal(component, null, injector);
        dialogContainerRef.instance.selectedPortal = portal;
        const componentRef = dialogContainerRef.instance.attach();
        dialogRef.componentInstance = componentRef;

        this.applyDialogProperties(dialogContainerRef, overlayRef, config);
        return dialogRef;
    }


    public customOpen<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef<T> {

        // config = config || {width: 'auto', title: ''};

        // Globally centered position strategy
        let positionStrategy = this.overlay
            .position()
            .global()
            // .top("0")
            // .right("100px")
            .left('0')
            .bottom('0')
            .centerHorizontally();

        console.log('config: ', config);
        console.log('config.style: ', config.style);

        if (config && config.style && !config.style.endsWith('offcanvas')) {
            positionStrategy = positionStrategy.centerVertically();//置中
        }
        // console.log('positionStrategy: ', positionStrategy);
        // const positionStrategy2 = this.overlay.position()
        //     .flexibleConnectedTo(component)
        //     .withPositions([
        //         {
        //             originX: 'end',
        //             originY: 'bottom',
        //             overlayX: 'end',
        //             overlayY: 'top',
        //         }
        //     ]);

        const overlayRef = this.overlay.create({
            hasBackdrop: true, // 是否顯示遮罩層
            positionStrategy, // 位置策略
            backdropClass: 'white-backdrop', // 調整遮罩背景顏色 ＆ 模糊度
            scrollStrategy: this.overlay.scrollStrategies.block(), // 禁止遮罩滾動
            // scrollStrategy: this.overlay.scrollStrategies.noop(),
            // scrollStrategy: this.overlay.scrollStrategies.reposition(), // 滾動策略
            panelClass: 'dialog-container',
            width: config.style.endsWith('offcanvas') ? '100%' : config.width, //offcanvas 100%
            height: config.style.endsWith('offcanvas') ? '80%' : config.height, //offcanvas 80%
            // maxWidth: "90vw",
            // height: config.height
        });

        //parent UI component
        const parentDialog = new ComponentPortal(DialogContainerComponent);
        const dialogContainerRef = overlayRef.attach(parentDialog);
        dialogContainerRef.instance.leftTitle = config.leftTitle;
        dialogContainerRef.instance.centerTitle = config.centerTitle;
        dialogContainerRef.instance.dialogTitle = config.title;
        dialogContainerRef.instance.data = config.data;
        console.log("slide-dialog.service.ts 165 :" ,)
        // Create dialogRef to return
        const dialogRef = new DialogRef<T>(overlayRef);

        // Create injector to be able to reference the DialogRef from within the component
        const injector = this.createInjector(dialogRef, config);

        //child UI component
        const portal = new ComponentPortal(component, null, injector);
        dialogContainerRef.instance.selectedPortal = portal;
        const componentRef = dialogContainerRef.instance.attach();
        dialogRef.componentInstance = componentRef;

        this.applyDialogProperties(dialogContainerRef, overlayRef, config);

        return dialogRef;
    }

    // 同意條款專用的 offcanvas，已設好背景透明度及高度
    public openTerms<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef<T> {

        // Globally centered position strategy
        let positionStrategy = this.overlay
            .position()
            .global()
            // .top("0")
            // .right("100px")
            .left('0')
            .bottom('0')
            .centerHorizontally();

        if (config && config.style && !config.style.endsWith('offcanvas')) {
            positionStrategy = positionStrategy.centerVertically();//置中
        }

        const overlayRef = this.overlay.create({
            hasBackdrop: true, // 是否顯示遮罩層
            positionStrategy, // 位置策略
            backdropClass: 'transparent-transparent', // 調整遮罩背景顏色 ＆ 模糊度
            scrollStrategy: this.overlay.scrollStrategies.block(), // 禁止遮罩滾動
            panelClass: 'dialog-container',
            width: config.style.endsWith('offcanvas') ? '100%' : config.width, //offcanvas 100%
            maxHeight: '80%'
        });

        //parent UI component
        const parentDialog = new ComponentPortal(DialogContainerComponent);
        const dialogContainerRef = overlayRef.attach(parentDialog);
        dialogContainerRef.instance.leftTitle = config.leftTitle;
        dialogContainerRef.instance.centerTitle = config.centerTitle;
        dialogContainerRef.instance.dialogTitle = config.title;
        dialogContainerRef.instance.data = config.data;
        dialogContainerRef.instance.confirmContent = config.confirmContent?config.confirmContent:'';
        dialogContainerRef.instance.cancelContent = config.cancelContent?config.cancelContent:'';

        // Create dialogRef to return
        const dialogRef = new DialogRef<T>(overlayRef);

        // Create injector to be able to reference the DialogRef from within the component
        const injector = this.createInjector(dialogRef, config);
        //child UI component
        const portal = new ComponentPortal(component, null, injector);
        dialogContainerRef.instance.selectedPortal = portal;
        const componentRef = dialogContainerRef.instance.attach();
        dialogRef.componentInstance = componentRef;

        this.applyDialogProperties(dialogContainerRef, overlayRef, config);
        return dialogRef;
    }

    // 客服專用的 offcanvas，已設好背景透明度及高度
    public openCustomerService<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef<T> {

        // Globally centered position strategy
        let positionStrategy = this.overlay
            .position()
            .global()
            // .top("0")
            // .right("0")
            .left('0')
            .bottom('0')
            .centerHorizontally();

        if (config && config.style && !config.style.endsWith('offcanvas')) {
            positionStrategy = positionStrategy.centerVertically();//置中
        }

        const overlayRef = this.overlay.create({
            hasBackdrop: true, // 是否顯示遮罩層
            positionStrategy, // 位置策略
            backdropClass: 'white-backdrop', // 調整遮罩背景顏色 ＆ 模糊度
            scrollStrategy: this.overlay.scrollStrategies.block(), // 禁止遮罩滾動
            panelClass: 'dialog-container',
            width: config.style.endsWith('offcanvas') ? '100%' : config.width, //offcanvas 100%
            maxHeight: '100%'
        });

        //parent UI component
        const parentDialog = new ComponentPortal(DialogContainerComponent);
        const dialogContainerRef = overlayRef.attach(parentDialog);
        dialogContainerRef.instance.leftTitle = config.leftTitle;
        dialogContainerRef.instance.centerTitle = config.centerTitle;
        dialogContainerRef.instance.dialogTitle = config.title;
        dialogContainerRef.instance.data = config.data;
        dialogContainerRef.instance.confirmContent = config.confirmContent?config.confirmContent:'';
        dialogContainerRef.instance.cancelContent = config.cancelContent?config.cancelContent:'';

        // Create dialogRef to return
        const dialogRef = new DialogRef<T>(overlayRef);

        // Create injector to be able to reference the DialogRef from within the component
        const injector = this.createInjector(dialogRef, config);
        //child UI component
        const portal = new ComponentPortal(component, null, injector);
        dialogContainerRef.instance.selectedPortal = portal;
        const componentRef = dialogContainerRef.instance.attach();
        dialogRef.componentInstance = componentRef;

        this.applyDialogProperties(dialogContainerRef, overlayRef, config);
        return dialogRef;
    }

    private applyDialogProperties(
        componentRef: ComponentRef<any>,
        overlayRef: OverlayRef,
        config: DialogConfig
    ) {
        //CLOSE事件
        componentRef.instance.containerEvent.subscribe(e => {
            if (e.key === 'CLOSE') {
                overlayRef.dispose();
            }
        });
        // console.log("slide-dialog.service.ts applyDialogProperties 195 :" ,config);
        if (!config.disableClose) {
            overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
        }
    }

    private createInjector<T>(dialogRef: DialogRef<T>, config?: DialogConfig) {
        // const injectorTokens = new WeakMap();
        // injectorTokens.set(DialogRef, dialogRef);
        // injectorTokens.set(PORTAL_DATA, data);
        // return new PortalInjector(this.myInjector, injectorTokens);

        return Injector.create({
            parent: this.myInjector,
            providers: [
                {provide: DialogRef, useValue: dialogRef},
                {provide: DIALOG_DATA, useValue: config?.data},
                {provide: DIALOG_DATA2, useValue: config?.data2},
                {provide: DIALOG_CANCEL_BTN, useValue: config?.cancelContent},
                {provide: DIALOG_CONFIRM_BTN, useValue: config?.confirmContent},
                {provide: DIALOG_TITLE, useValue: config?.title},
            ],
        });
    }
}

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');
export const DIALOG_DATA2 = new InjectionToken<any>('DIALOG_DATA2');
export const DIALOG_CANCEL_BTN = new InjectionToken<any>('DIALOG_CANCEL_BTN');
export const DIALOG_CONFIRM_BTN = new InjectionToken<any>('DIALOG_CONFIRM_BTN');
export const DIALOG_TITLE = new InjectionToken<any>('DIALOG_TITLE');
export interface DialogConfig {
    style?: string; //dialog, offcanvas
    width?: string;
    height?: string;
    disableClose?: boolean;
    autoFocus?: boolean;
    leftTitle?: boolean;
    centerTitle?: boolean;
    title?: string;
    data?: any;
    data2?: any;
    confirmContent?: string,
    cancelContent?: string,
    hasCloseBtn?: boolean,
}

export class DialogRef<T> {

    private afterClosedSubject = new Subject<any>();

    private compInstance: core.ComponentRef<T>;

    constructor(private overlayRef: OverlayRef) {
    }

    get componentInstance() {
        return this.compInstance;
    }

    set componentInstance(c: core.ComponentRef<T>) {
        this.compInstance = c;
    }

    /**
     * Closes the overlay dialog
     */
    public close(result?: any) {
        this.overlayRef.dispose();
        this.afterClosedSubject.next(result);
        this.afterClosedSubject.complete();
    }

    /**
     * An Observable that notifies when the overlay has closed
     */
    public afterClosed(): Observable<any> {
        return this.afterClosedSubject.asObservable();
    }
}

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
    selector: 'app-dialog-container',
    template: `
        <div class="bg-white" style="filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.08));" [@slideContent]="animationState">
            <div class="d-flex justify-content-end p-4 pb-0">
                <button *ngIf="hasCloseBtn" class="btn-close" (click)="closeDialog()"></button>
            </div>
            <h3 *ngIf="leftTitle === false && centerTitle === true" class="web-ch-h3 mobile-ch-h3 text-center">{{ dialogTitle }}</h3>
            <h6 *ngIf="leftTitle === true && centerTitle === false" class="web-ch-h6 mobile-ch-h6 text-grey-0 px-sm-default px-md-6 pb-4">{{ dialogTitle }}</h6>
            <br>
            <ng-template cdkPortalOutlet #portal></ng-template>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [
        'app-dialog-container {width: 100%;grid-template-rows: 0px 1fr;padding: 0 0;margin-bottom: 0; overflow: auto}',
        '.title { font-weight: bold; }'
    ],
    animations: [
        trigger('fade', [
            state('fadeOut', style({opacity: 0})),
            state('fadeIn', style({opacity: 1})),
            transition('* => fadeIn', animate(ANIMATION_TIMINGS))
        ]),
        trigger('slideContent', [
            state('void', style({transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0})),
            state('enter', style({transform: 'none', opacity: 1})),
            state('leave', style({transform: 'translate3d(0, 25%, 0)', opacity: 0})),
            // state('enter', style({ transform: 'translateY(-100%)', opacity: 1 })),
            // state('leave', style({ transform: 'translateY(100%)', opacity: 1 })),
            transition('* => *', animate(ANIMATION_TIMINGS)),
        ]),
        trigger('slideUp', [
            state('in', style({height: '*', opacity: 0})),
            transition(':leave', [
                style({height: '*', opacity: 1}),

                group([
                    animate(300, style({height: 0})),
                    animate('200ms ease-in-out', style({'opacity': '0'}))
                ])

            ]),
            transition(':enter', [
                style({height: '0', opacity: 0}),

                group([
                    animate(300, style({height: '*'})),
                    animate('400ms ease-in-out', style({'opacity': '1'}))
                ])

            ])
        ]),
        trigger('slideInOut', [
            state('in', style({
                'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
            })),
            state('out', style({
                'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
            })),
            transition('in => out', [group([
                    animate('400ms ease-in-out', style({
                        'opacity': '0'
                    })),
                    animate('600ms ease-in-out', style({
                        'max-height': '0px'
                    })),
                    animate('700ms ease-in-out', style({
                        'visibility': 'hidden'
                    }))
                ]
            )]),
            transition('out => in', [group([
                    animate('1ms ease-in-out', style({
                        'visibility': 'visible'
                    })),
                    animate('600ms ease-in-out', style({
                        'max-height': '500px'
                    })),
                    animate('800ms ease-in-out', style({
                        'opacity': '1'
                    }))
                ]
            )]),
        ])
    ]
})
export class DialogContainerComponent<T> implements core.OnInit {

    animationState: 'void' | 'enter' | 'leave' = 'enter';

    animationState2: 'fadeIn';

    @Input()
    leftTitle: boolean;

    @Input()
    centerTitle: boolean;

    @Input()
    dialogTitle = '';

    @Input()
    data: any;

    @Input()
    confirmContent: any;
    @Input()
    cancelContent: any;

    @Input()
    comp: ComponentPortal<T>;

    @Output()
    containerEvent = new core.EventEmitter<{ key: 'CLOSE' }>();

    @ViewChild('portal', {read: CdkPortalOutlet, static: true})
    portal: CdkPortalOutlet;

    @Input()
    selectedPortal: Portal<T>;

    @Input()
    hasCloseBtn: boolean;

    //監聽 ESC KEY
    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        console.log(event);
        this.containerEvent.emit({key: 'CLOSE'});
    }

    constructor() {
    }

    ngOnInit() {
    }

    attach() {
        const c = this.portal.attach(this.selectedPortal);
        // console.log('c: ', c);

        if(c.instance && c.instance.contentText) {

            //造成'F099-系統異常，請洽客服中心'訊息咬住，加了if
            if(this.data ==="F099-系統異常，請洽客服中心。"){
                c.instance.contentText ="F099-系統異常，請洽";
            }else {
                c.instance.contentText = this.data;
            }


        }
        return c.instance;
    }

    closeDialog() {
        // c.instance.close()
        this.containerEvent.emit({key: 'CLOSE'});
    }
}

@NgModule({
    declarations: [DialogContainerComponent],
    imports: [PortalModule, OverlayModule, CommonModule],
    providers: [SlideDialogService],
    entryComponents: [DialogContainerComponent],
    exports: []
})
export class SlideDialogModule {
}
