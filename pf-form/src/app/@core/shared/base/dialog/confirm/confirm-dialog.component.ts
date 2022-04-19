import {Component, Inject, Input, OnInit} from '@angular/core';
import { DIALOG_CANCEL_BTN, DIALOG_CONFIRM_BTN, DIALOG_DATA, DIALOG_DATA2, DIALOG_TITLE, DialogRef } from '../../../service/slide-dialog.service';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    @Input()
    public title = ''; // 標題
    @Input()
    public content = ''; // dialog內容
    @Input()
    public content2 = ''; // dialog2內容
    @Input()
    public confirmBtn = '確認'; // 確認文字
    @Input()
    public cancelBtn = '取消'; // 取消文字

    constructor(private dialogRef: DialogRef<ConfirmDialogComponent>,
                @Inject(DIALOG_TITLE) public titleText: string,
                @Inject(DIALOG_DATA) public contentText: string,
                @Inject(DIALOG_DATA2) public contentText2: string,
                @Inject(DIALOG_CONFIRM_BTN) public confirmButtonName: string,
                @Inject(DIALOG_CANCEL_BTN) public cancelButtonName: string,
                ) {

        //從 SlideDialogService 讀取傳入 data
        this.title = titleText;
        this.content = contentText;
        this.content2 = contentText2;
        this.confirmBtn = confirmButtonName;
        this.cancelBtn = cancelButtonName;
    }

    ngOnInit(): void {
    }

    public close(result) {
        console.log(`ConfirmDialogComponent result: ${result}`);
        this.dialogRef.close(result);
    }

}
