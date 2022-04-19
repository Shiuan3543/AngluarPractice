import {Component, Inject, Input, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '../../../service/slide-dialog.service';
// import {BaseComponent} from '../';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-dialog..component.html',
    styleUrls: ['./edit-dialog..component.scss']
})
export class EditDialogComponent implements OnInit {
    condition = '';
    testTitle= '';
    cityJsonNew: Array<{ city: string, areaCode: string, area: Array<{ code: number, text: string }> }>;

    constructor(private dialogRef: DialogRef<any>,
                @Inject(DIALOG_DATA) public data: any) {
        console.log("data:" ,data);
        this.testTitle = data;
    }

    ngOnInit(): void {
        this.condition = 'select';
    }


    public close() {
        this.dialogRef.close();
    }

}
