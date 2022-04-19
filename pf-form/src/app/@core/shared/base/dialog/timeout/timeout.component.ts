import { Component, Inject, Input, OnInit } from '@angular/core';
import { SpinnerRef, SpinnerService } from '../../../service/spinner.service';
import { DIALOG_CANCEL_BTN, DIALOG_CONFIRM_BTN, DIALOG_DATA, DialogRef } from '../../../service/slide-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalDataService } from '../../../service/global.service';


@Component({
    selector: 'app-timeout',
    templateUrl: './timeout.component.html',
    styleUrls: ['./timeout.component.scss']
})
export class TimeoutComponent implements OnInit {

    spinner: SpinnerRef<any>;

    public opened = false; // dialog開關

    url: string;

    @Input()
    public title = 'TEST'; // 標題
    @Input()
    public contentText = 'TEST'; // dialog內容
    @Input()
    public cancelContent = ''; // 取消文字
    @Input()
    public confirmContent = '確認'; // 確認文字

    constructor(private dialogRef: DialogRef<TimeoutComponent>,
                private router: Router,
                protected spinnerService: SpinnerService,
                protected gd: GlobalDataService,
                @Inject(DIALOG_DATA) public data: any,
                @Inject(DIALOG_CANCEL_BTN) public cancelContent1: string,
                @Inject(DIALOG_CONFIRM_BTN) public confirmContent2: string,
    ) {
    }

    ngOnInit(): void {

    }

    // dialog close function
    public close() {
    }

    // dialog open function
    public open() {
        this.opened = true;
    }

    showSpinner() {
        if (!this.spinner) {
            this.spinner = this.spinnerService.show({message: '請稍候...'});
        }
    }

    hideSpinner() {
        this.spinner = undefined;
        this.spinnerService.hide();
    }

}
