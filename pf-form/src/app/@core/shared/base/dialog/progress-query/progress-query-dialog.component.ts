import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DIALOG_CANCEL_BTN, DIALOG_CONFIRM_BTN, DIALOG_DATA, DialogRef } from '../../../service/slide-dialog.service';
import { SpinnerRef, SpinnerService } from '../../../service/spinner.service';

@Component({
  selector: 'app-progress-query-dialog',
  templateUrl: './progress-query-dialog.component.html',
  styleUrls: ['./progress-query-dialog.component.scss']
})
export class ProgressQueryDialogComponent implements OnInit {

  spinner: SpinnerRef<any>;

  public opened = false; // dialog開關

  @Input()
  public title = 'TEST'; // 標題
  @Input()
  public contentText = 'TEST'; // dialog內容
  @Input()
  public cancelContent = '取消'; // 取消文字
  @Input()
  public confirmContent = '確認'; // 確認文字

  constructor(private dialogRef: DialogRef<ProgressQueryDialogComponent>,
    private router: Router,
    protected spinnerService: SpinnerService,
    @Inject(DIALOG_DATA) public data: any,
    @Inject(DIALOG_CANCEL_BTN) public cancelContent1: string,
    @Inject(DIALOG_CONFIRM_BTN) public confirmContent2: string,
  ) { }

  ngOnInit(): void {
    this.contentText = this.data;
    if (this.cancelContent1) {
      this.cancelContent = this.cancelContent1;
    }
    if (this.confirmContent2) {
      this.confirmContent = this.confirmContent2;
    }
  }

  // dialog close function
  public close(status) {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
    this.dialogRef.close(status);
    if (status == 'yes') {
      this.showSpinner();
      this.router.navigate(['/mono/customer-service/customer-service']);
      this.hideSpinner();
    } else if (status == 'no') {
      this.showSpinner();
      location.reload();
    }
  }

  // dialog open function
  public open() {
    this.opened = true;
  }

  showSpinner() {
    if (!this.spinner) {
      this.spinner = this.spinnerService.show({ message: '請稍候...' });
    }
  }

  hideSpinner() {
    this.spinner = undefined;
    this.spinnerService.hide();
  }
}
