import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-terms',
  templateUrl: './modal-terms.component.html',
  styleUrls: ['./modal-terms.component.scss']
})
export class ModalTermsComponent implements OnInit {
  @Input() title: string = '';
  @Input() terms: string = '';

  constructor(public activeModal: NgbActiveModal) {
  }
  ngOnInit(): void {
  }


  done(): void {
    this.activeModal.close();
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }
}
