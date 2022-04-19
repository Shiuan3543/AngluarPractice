import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DIALOG_CONFIRM_BTN, DIALOG_DATA, DIALOG_TITLE, DialogRef} from '../../../service/slide-dialog.service';

@Component({
    selector: 'app-custom-simple--dialog',
    templateUrl: './custom-simple-dialog.component.html',
    styleUrls: ['./custom-simple-dialog.component.scss']
})
export class CustomSimpleDialogComponent implements OnInit {

    @Input()
    public title = ''; // 標題

    @Input()
    public contentText = ''; // dialog內容

    // @Input() component: AdItem;

    @Input()
    public confirmContent = '確認'; // 確認文字

    // @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;
    // interval: number|undefined;

    constructor(private dialogRef: DialogRef<CustomSimpleDialogComponent>,
                @Inject(DIALOG_DATA) public data: string,
                @Inject(DIALOG_TITLE) public titleName: string,
                @Inject(DIALOG_CONFIRM_BTN) public buttonName: string,

                ) {

        //從 SlideDialogService 讀取傳入 data
        this.contentText = data;
        this.title = titleName;
        this.confirmContent = buttonName;
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        // this.loadComponent();
        // this.getAds();
    }

    ngOnDestroy() {
        // clearInterval(this.interval);
    }

    // loadComponent() {
    //     const adItem = this.ads[this.currentAdIndex];
    //
    //     const viewContainerRef = this.adHost.viewContainerRef;
    //     viewContainerRef.clear();
    //
    //     const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
    //     componentRef.instance.data = adItem.data;
    // }
    //
    // getAds() {
    //     this.interval = setInterval(() => {
    //         this.loadComponent();
    //     }, 3000);
    // }

    // dialog close function
    public close(result?: any) {
        console.log(`GenericDialogComponent result: ${result}`);
        this.dialogRef.close(result);
    }

}
