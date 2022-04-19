
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalInnerComponent} from './modal-inner.component';
import {ModalComponent} from './modal.component';
import {ModalInputComponent} from "./modal-input/modal-input.component";
import { ModalTermsComponent } from './modal-terms/modal-terms.component';
import { ModalSelectComponent } from './modal-select/modal-select.component';


@Injectable({
    providedIn: 'root'
})
export class ModalService {
    cropperPromise: Promise<any>;
    IdentityDetailPromise: Promise<any>;
    modalOption: NgbModalOptions = {};
    clickBtnImgType = "";

    constructor(private modalService: NgbModal,
                private http: HttpClient) {
    }

    openTermsModalWithTermsTable(title: string, termsName:string) {

    }

    openModal(title = '預設標題',
              context?: string,
              cancelButtonText = '取消',
              confirmButtonText = '確定',
              scrollable = false) {
        const modalRef = this.modalService.open(ModalComponent, {scrollable: true, centered: true});
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.context = context;
        modalRef.componentInstance.cancelButtonText = cancelButtonText;
        modalRef.componentInstance.confirmButtonText = confirmButtonText;
        modalRef.componentInstance.scrollable = scrollable;
        return modalRef.result;
    }

    openInnerModal(title = '預設標題',
                   cancelButtonText = '取消',
                   confirmButtonText = '確定',
                   scrollable = false,
                   termsHtml: string
    ) {
        const modalRef = this.modalService.open(ModalInnerComponent, {scrollable: true, centered: true, size: "xl"});
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.cancelButtonText = cancelButtonText;
        modalRef.componentInstance.confirmButtonText = confirmButtonText;
        modalRef.componentInstance.scrollable = scrollable;
        modalRef.componentInstance.termsHtml = termsHtml;
    }
    openTermsModal(title: string, terms:string ) {
        const modalRef = this.modalService.open(ModalTermsComponent,{scrollable: true, size:'lg',centered: true});
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.terms = terms;
        return modalRef.result;
    }

    public openModalInput(text: string, value: string) {

        const modalRef = this.modalService.open(ModalInputComponent);
        modalRef.componentInstance.text = text;
        modalRef.componentInstance.value = value;
        return modalRef.result;
    }

    public openModalSelect(text: string, value: string) {

        const modalRef = this.modalService.open(ModalSelectComponent);
        modalRef.componentInstance.text = text;
        modalRef.componentInstance.value = value;
        return modalRef.result;
    }
}
