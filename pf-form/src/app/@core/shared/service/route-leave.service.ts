import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanDeactivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {RouteHelperService} from './route-helper.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RouteLeaveService implements CanDeactivate<CanComponentDeactivate> {
  constructor(private routerHelperService: RouteHelperService) {}

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (environment.disableGuard) {
      return true;
    } else if (!this.routerHelperService.canLeave) {
      return false;
    } else {
      this.routerHelperService.canLeave = false;
      return true;
    }
  }
}
