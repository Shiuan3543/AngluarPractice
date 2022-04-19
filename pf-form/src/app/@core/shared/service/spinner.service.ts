import * as core from '@angular/core';
import {
    Component,
    ComponentRef, EventEmitter,
    HostListener,
    Injectable,
    InjectionToken,
    Injector,
    Input,
    NgModule, OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Overlay, OverlayModule, OverlayRef} from '@angular/cdk/overlay';
import {CdkPortalOutlet, ComponentPortal, Portal, PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {Observable, Subject} from 'rxjs';
import {MatSpinner} from '@angular/material/progress-spinner';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {NgxSpinnerComponent} from 'ngx-spinner/lib/ngx-spinner.component';
import {DialogComponent} from '../component/dialog/dialog.component';
import {map, scan} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    private spinnerOverlayRef : OverlayRef;

    constructor(private overlay: Overlay, private myInjector: Injector) {
    }

    private createSpinnerOverlayRef() {
        // Globally centered position strategy
        let positionStrategy = this.overlay
            .position()
            .global()
            // .top("0")
            // .right("100px")
            .left('0')
            .bottom('0')
            .centerHorizontally()
            .centerVertically();

        const overlayRef = this.overlay.create({
            hasBackdrop: true, // 是否顯示遮罩層
            positionStrategy, // 位置策略
            backdropClass: 'cdk-overlay-transparent-backdrop', // 調整遮罩背景顏色 ＆ 模糊度 cdk-overlay-transparent-backdrop / white-backdrop
            scrollStrategy: this.overlay.scrollStrategies.block(), // 禁止遮罩滾動
            // scrollStrategy: this.overlay.scrollStrategies.noop(),
            // scrollStrategy: this.overlay.scrollStrategies.reposition(), // 滾動策略
            panelClass: 'spinner-container',
        });
        // console.log('createSpinnerOverlayRef: ', overlayRef);

        return overlayRef;
    }

    public show<T>(config?: SpinnerConfig) : SpinnerRef<T> {
        this.spinnerOverlayRef = this.createSpinnerOverlayRef();

        // console.log("show Spinner: ", this.spinnerOverlayRef)

        const parentSpinner = new  ComponentPortal(SpinnerContainerComponent)
        // console.log('[displaySpinner] parentSpinner: ', parentSpinner);

        const componentRef = this.spinnerOverlayRef.attach(parentSpinner);
        // console.log('[displaySpinner] componentRef: ', componentRef);

        //傳遞顯示文字
        componentRef.instance.message = config.message;

        // Create spinnerRef to return
        const spinnerRef = new SpinnerRef<any>(this.spinnerOverlayRef);

        // Create injector to be able to reference the SpinnerRef from within the component
        // const injector = this.createInjector(spinnerRef, config);

        spinnerRef.componentInstance = componentRef;

        this.applySpinnerProperties(componentRef, this.spinnerOverlayRef, config);

        return spinnerRef;
    }

    public hide(){
        console.log("hide Spinner")
        // this.spinnerOverlayRef.detach() ;
        if(this.spinnerOverlayRef)
            this.spinnerOverlayRef.dispose();
    }

    private applySpinnerProperties(
        componentRef: ComponentRef<any>,
        overlayRef: OverlayRef,
        config: SpinnerConfig
    ) {
        //CLOSE事件
        if(config.disableClose){ //未定義 預設 不得以ESC關閉 spinner
            componentRef.instance.containerEvent.subscribe(e => {
                if (e.key === 'CLOSE') {
                    overlayRef.detach();
                }
            });
        }
        if (!config.disableClose) {
            overlayRef.backdropClick().subscribe(() => overlayRef.detach());
        }
    }

}

export const SPINNER_DATA = new InjectionToken<any>('SPINNER_DATA');

export interface SpinnerConfig {
    width?: string;
    height?: string;
    disableClose?: boolean;
    message?: any;
}

export class SpinnerRef<T> {

    private afterClosedSubject = new Subject<any>();

    private compInstance: ComponentRef<T>;

    constructor(private overlayRef: OverlayRef) {
    }

    get componentInstance() {
        return this.compInstance;
    }

    set componentInstance(c: ComponentRef<T>) {
        this.compInstance = c;
    }

    /**
     * Closes the overlay dialog
     */
    // public close(result?: any) {
    //     this.overlayRef.dispose();
    //     this.afterClosedSubject.next(result);
    //     this.afterClosedSubject.complete();
    //     console.log('close');
    // }

    /**
     * An Observable that notifies when the overlay has closed
     */
    // public afterClosed(): Observable<any> {
    //     console.log('afterClosed');
    //     return this.afterClosedSubject.asObservable();
    // }
}

@Component({
    selector: 'app-spinner-container',
    template: `
<!--        <div style="background-color: red;height: 1000px;display:block;margin:0 auto;position:relative;z-index:10000;">-->
            <ngx-spinner bdColor="rgba(0, 0, 0, 0.5)" [fullScreen]="true" type="ball-clip-rotate-multiple" size="medium" style="height: 100%;position: relative">
                <p class="loading">{{message}}</p>
            </ngx-spinner>
<!--        </div>-->
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [
        'app-spinner-container {width: 100%;grid-template-rows: 0px 1fr;padding: 0 0;margin-bottom: 0}',
        '.title { font-weight: bold; }',
        '.loading {  color: white; padding-top: 50px;}'
    ]
})
export class SpinnerContainerComponent<T> implements OnInit {

    @Input()
    message: any;

    @Input()
    componentPortal: ComponentPortal<T>;

    @Output()
    containerEvent = new EventEmitter<{ key: 'CLOSE' }>();

    @ViewChild('portal', {read: CdkPortalOutlet, static: true})
    portal: CdkPortalOutlet;

    @Input()
    selectedPortal: Portal<T>;

    //監聽 ESC KEY
    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.containerEvent.emit({key: 'CLOSE'});
    }

    constructor(private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
        this.spinner.show();
    }
}

@NgModule({
    declarations: [SpinnerContainerComponent],
    imports: [PortalModule, OverlayModule, CommonModule, NgxSpinnerModule],
    providers: [SpinnerService],
    entryComponents: [SpinnerContainerComponent],
    exports: []
})
export class SpinnerModule {
}
