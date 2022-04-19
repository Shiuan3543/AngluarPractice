import {Component, Inject, Input, OnInit} from '@angular/core';
import {DIALOG_CONFIRM_BTN, DIALOG_DATA, DIALOG_TITLE, DialogRef} from '../../../service/slide-dialog.service';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './custom-dialog.component.html',
    styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent implements OnInit {

    @Input()
    public title = ''; // 標題

    @Input()
    public contentText = ''; // dialog內容

    @Input()
    public confirmContent = '確認'; // 確認文字

    constructor(private dialogRef: DialogRef<CustomDialogComponent>,
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

    // dialog close function
    public close(result?: any) {
        console.log(`GenericDialogComponent result: ${result}`);
        this.dialogRef.close(result);
    }

}
