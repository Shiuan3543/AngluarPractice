import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-input',
    templateUrl: './modal-input.component.html',
    styleUrls: ['./modal-input.component.scss']
})
export class ModalInputComponent {
    @Input() text: string = '';
    @Input() value: string = '';

    constructor(public activeModal: NgbActiveModal) {
    }

    save(): void {
        this.activeModal.close(this.value);
    }

    cancel(): void {
        this.activeModal.dismiss('cancel');
    }
}
