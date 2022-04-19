import { Component, Inject, Input, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from "../../../service/slide-dialog.service";

@Component({
  selector: 'app-html-dialog',
  templateUrl: './html-dialog.component.html',
  styleUrls: ['./html-dialog.component.scss']
})
export class HtmlDialogComponent implements OnInit {

  @Input()
  public contentText = ''; // dialog內容

  @Input()
  public confirmContent = '確認'; // 確認文字

  constructor(private dialogRef: DialogRef<any>,
              @Inject(DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }


  // dialog close function
  public close(result?: any) {
    console.log(`GenericDialogComponent result: ${result}`);
    this.dialogRef.close(result);
  }


}
