import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-select',
  templateUrl: './modal-select.component.html',
  styleUrls: ['./modal-select.component.scss']
})
export class ModalSelectComponent implements OnInit {
  @Input() text: string = '';
  @Input() value: string = '';

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  save(): void {
    this.activeModal.close(this.value);
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }



}
