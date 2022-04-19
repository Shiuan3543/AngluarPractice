import {Injectable} from '@angular/core';
import {DIALOG_TYPE, DialogConfig, SlideDialogService} from './slide-dialog.service';
import {GenericDialogComponent} from '../base/dialog/info/generic-dialog.component';
import {HtmlDialogComponent} from '../base/dialog/html/html-dialog.component';
import {CustomDialogComponent} from '../base/dialog/custom/custom-dialog.component';
import {Router} from '@angular/router';
import {ModalService} from '../component/modal.service';
import {ConfirmDialogComponent} from '../base/dialog/confirm/confirm-dialog.component';
import {ComponentType} from '@angular/cdk/overlay';
import {TimeoutComponent} from '../base/dialog/timeout/timeout.component';

@Injectable({
    providedIn: 'root'
})
export class CustomDialogService {

    constructor(private slideDialogService: SlideDialogService,
                private modalService: ModalService,
                private router: Router) {

    }

    alert(text: string) {
        const config: DialogConfig = {
            width: '400px',
            height: '300px',
            title: '提示訊息',
            data: text,
            style: DIALOG_TYPE.DIALOG,
        };
        return this.slideDialogService.open(GenericDialogComponent, config);
    }

    customDialog(text: string, title?: string, button?: string) {
        const config: DialogConfig = {
            width: '400px',
            height: '300px',
            title: title ? title : '注意事項',
            data: text,
            style: DIALOG_TYPE.DIALOG,
            confirmContent: button ? button : '確認'
        };
        return this.slideDialogService.open(CustomDialogComponent, config);
    }

    confirmDialog(title?: string, content?: string, content2?: string, confirmBtn?: string, cancelBtn?: string) {
        const config: DialogConfig = {
            width: '400px',
            height: '300px',
            hasCloseBtn: false,
            title: title ? title : '注意事項',
            data: content ? content : '內容',
            data2: content2 ? content2 : '內容2',
            style: DIALOG_TYPE.DIALOG,
            confirmContent: confirmBtn ? confirmBtn : '確認',
            cancelContent: cancelBtn ? cancelBtn : '取消',
        };
        return this.slideDialogService.open(ConfirmDialogComponent, config);
    }


    htmlDialog(htmlText: string) {
        const config: DialogConfig = {
            width: '400px',
            height: '100px',
            title: '',
            data: htmlText,
            style: DIALOG_TYPE.DIALOG
        };
        this.slideDialogService.open(HtmlDialogComponent, config);
    }

    /**
     * 閒置十分鐘跳提醒用
     * */
    public showErrorProgressQueryDialog<T>(data: any, component?: ComponentType<T>) {
        console.log("Not Implemented");
    }

}
