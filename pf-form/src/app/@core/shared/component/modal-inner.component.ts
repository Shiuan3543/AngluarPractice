import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-inner',
  templateUrl: './modal-inner.component.html',
})
export class ModalInnerComponent implements OnInit {
  @Input() title:string='';
  @Input() cancelButtonText:string = '';
  @Input() confirmButtonText:string = '';
  @Input() termsHtml:string = '';
  

  constructor(
    private modalService:NgbModal,
    private router: Router) { }

  ngOnInit(): void {
  }
  closeModal(){
    this.modalService.dismissAll();
  }
  nextPageModal(){
    this.modalService.dismissAll();
    this.router.navigate(['cc/one']);
  }
  previousPageModal(){
    this.modalService.dismissAll();
    this.router.navigate(['aio/g-otp']);
  }
}
