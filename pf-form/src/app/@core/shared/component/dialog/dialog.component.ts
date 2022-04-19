import {Component, Inject, Input, OnInit} from '@angular/core';
import { DIALOG_CANCEL_BTN, DIALOG_CONFIRM_BTN, DIALOG_DATA, DialogRef } from '../../service/slide-dialog.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
    public opened = false; // dialog開關

    @Input()
    public title = 'TEST'; // 標題
    @Input()
    public contentText = 'TEST'; // dialog內容
    @Input()
    public cancelContent = '取消'; // 取消文字
    @Input()
    public confirmContent = '確認'; // 確認文字

    constructor(private dialogRef: DialogRef<DialogComponent>,
                @Inject(DIALOG_DATA) public data: any,
                @Inject(DIALOG_CANCEL_BTN) public cancelContent1: string,
                @Inject(DIALOG_CONFIRM_BTN) public confirmContent2: string,
) {
    }

    ngOnInit(): void {
        this.contentText = this.data;
        if(this.cancelContent1){
            this.cancelContent = this.cancelContent1;
        }
        if(this.confirmContent2){
            this.confirmContent = this.confirmContent2;
        }
    }

    // dialog close function
    public close(status) {
        console.log(`Dialog result: ${status}`);
        this.opened = false;
        this.dialogRef.close(status);
    }

    // dialog open function
    public open() {
        this.opened = true;
    }
}
