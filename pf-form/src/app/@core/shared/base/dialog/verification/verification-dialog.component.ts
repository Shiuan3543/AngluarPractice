import {Component, Inject, Input, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '../../../service/slide-dialog.service';

@Component({
    selector: 'app-verification-dialog',
    templateUrl: './verification-dialog.component.html',
    styleUrls: ['./verification-dialog.component.scss']
})
export class VerificationDialogComponent implements OnInit {
    @Input()
    public contentText = []; // dialog內容

    @Input()
    public confirmContent = '確認'; // 確認文字

    constructor(private dialogRef: DialogRef<any>,
                @Inject(DIALOG_DATA) public data: any) {

        //從 SlideDialogService 讀取傳入 data
        this.contentText = data;
    }

    ngOnInit(): void {
    }

    // dialog close function
    public close(result?: any) {
        console.log(`VerificationDialogComponent result: ${result}`);
        this.dialogRef.close(result);
    }

}
