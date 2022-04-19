import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
    selector: '[targetSelectAll]'
})
export class TargetSelectAllDirective {
    constructor(private elementRef: ElementRef) {
    }

    @HostListener('focus') onFocus() {
        this.elementRef.nativeElement.select();
    }
}
