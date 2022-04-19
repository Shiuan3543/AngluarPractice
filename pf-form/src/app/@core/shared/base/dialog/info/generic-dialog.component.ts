import {Component, Inject, Input, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '../../../service/slide-dialog.service';

@Component({
    selector: 'app-generic-dialog',
    templateUrl: './generic-dialog.component.html',
    styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent implements OnInit {

    @Input()
    public contentText = ''; // dialog內容


    @Input()
    public confirmContent = '確認'; // 確認文字

    constructor(private dialogRef: DialogRef<any>,
                @Inject(DIALOG_DATA) public data: any) {

        //從 SlideDialogService 讀取傳入 data
        if(this.data ==="F099-系統異常，請洽客服中心。"){
            this.contentText ="F099-系統異常，請洽";
        }else {
            this.contentText = data;
        }
    }

    ngOnInit(): void {
    }

    // dialog close function
    public close(result?: any) {
        console.log(`GenericDialogComponent result: ${result}`);
        this.dialogRef.close(result);
    }

}
