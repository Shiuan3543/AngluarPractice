import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    componentTitle = '貸款';
    @Input() title: string = '';
    @Input() context: string = '';
    @Input() cancelButtonText: string = '';
    @Input() confirmButtonText: string = '';

    constructor(
        private modalService: NgbModal,
        private router: Router,
        protected activatedRoute: ActivatedRoute,
        public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        // this.activatedRoute.queryParams.subscribe((param: any) => {
        //   this.componentTitle = param['componentTitle'];
        //   // console.log(this.componentTitle);
        // });
    }

    closeModal() {
        this.modalService.dismissAll();
    }

    nextPageModal() {
        this.activeModal.close('success');
        // console.log("本次流程的組合代號為：", this.userDataService.routingType);
        // // const componentTitle = "多合一產品";
        // // this.router.navigate(['aio/g-fill-cc-person'], {
        // //     queryParams: {
        // //         componentTitle
        // //     },
        // // });
        // if (this.componentTitle == "多合一產品") {
        //   if (this.userDataService.routingType == "A" ||
        //   this.userDataService.routingType == "D") {
        //     this.router.navigate(['aio/g-fill-d3-application'], {
        //       queryParams: {
        //         componentTitle: this.componentTitle
        //       },
        //     });
        //   }

        //   else if (this.userDataService.routingType == "B" ||
        //   this.userDataService.routingType == "E") {
        //     this.router.navigate(['aio/g-fill-person'], {
        //       queryParams: {
        //         componentTitle: this.componentTitle
        //       },
        //     });
        //   }
        // }
        // if (this.componentTitle == "信用卡") {
        //   this.router.navigate(['cc/g-fill-person'], {
        //     queryParams: {
        //       componentTitle: this.componentTitle
        //     },
        //   });
        // }
        // this.router.navigate(['aio/g-fill-d3-application'])


    }

    previousPageModal() {
        this.modalService.dismissAll();
        this.router.navigate(['aio/g-otp']);
    }
}
