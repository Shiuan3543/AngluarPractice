import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from './account.service';
import {StateStorageService} from './state-storage.service';
import {environment} from '../../../../environments/environment';
import {RouteHelperService} from './route-helper.service';
import {GlobalDataService} from './global.service';
import {RoutingModel} from '../model/routing.model';
import {BaseModel} from '../base/base.model';

@Injectable({
    providedIn: 'root'
})
export class RouteAccessService implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private gd: GlobalDataService,
        private stateStorageService: StateStorageService,
        private routerHelperService: RouteHelperService
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (!environment.production) {
            return true;
        } else if (this.gd.token) {
            return true;
        } else {
            this.routerHelperService.navigate(['error']);
            return false;
        }
    }

    // canActivate(route: ActivatedRouteSnapshot,
    //             state: RouterStateSnapshot): Observable<boolean> {
    //     return this.accountService.identity().pipe(
    //         map(account => {
    //             if (account) {
    //                 const authorities = route.data['authorities'];
    //
    //                 if (!authorities || authorities.length === 0 || this.accountService.hasAnyAuthority(authorities)) {
    //                     return true;
    //                 }
    //
    //                 if (isDevMode()) {
    //                     console.error('User has not any of required authorities: ', authorities);
    //                 }
    //                 this.router.navigate(['accessdenied']);
    //                 return false;
    //             }
    //
    //             if (environment.disableGuard) {
    //                 return true;
    //             }
    //
    //             //TODO: 看下 STP 用此 method 時機 (LeaveGuard)
    //             if (!this.routerHelperService.canLeave) {
    //                 return false;
    //             }
    //
    //             this.stateStorageService.storeUrl(state.url);
    //             this.router.navigate(['/login']);
    //             return false;
    //         })
    //     );
    // }
}
