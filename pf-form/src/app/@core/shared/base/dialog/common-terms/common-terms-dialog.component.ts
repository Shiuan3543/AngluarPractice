import { Component, Inject, Input, OnInit } from '@angular/core';
import { DIALOG_CONFIRM_BTN, DIALOG_DATA, DIALOG_TITLE, DialogRef } from '../../../service/slide-dialog.service';

@Component({
    selector: 'common-terms-dialog',
    templateUrl: './common-terms-dialog.component.html',
    styleUrls: ['./common-terms-dialog.component.scss']
})

/*
 *   同意條款專用的 offcanvas
 *   已設好背景透明度及高度
 *   content 內容必須是 [innerHTML]
 */
export class CommonTermsDialogComponent implements OnInit {

    @Input()
    public title = ''; // 標題

    @Input()
    public contentText: string = ''; // dialog內容

    constructor(private dialogRef: DialogRef<CommonTermsDialogComponent>,
                @Inject(DIALOG_DATA) public data: string,
                @Inject(DIALOG_TITLE) public titleName: string,
                @Inject(DIALOG_CONFIRM_BTN) public buttonName: string,
    ) {
        this.contentText = data;
        this.title = titleName;
    }

    ngOnInit(): void {
    }

    // dialog close function
    public close(result?: any) {
        console.log(`GenericDialogComponent result: ${result}`);
        this.dialogRef.close(result);
    }
}
