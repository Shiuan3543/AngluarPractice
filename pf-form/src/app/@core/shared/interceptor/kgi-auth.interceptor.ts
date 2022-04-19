import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {forwardRef, Inject, Injectable, Injector} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, throwError} from 'rxjs';
import {tap, map, filter, switchMap, catchError, finalize} from 'rxjs/operators';
import {GlobalDataService} from '../service/global.service';

@Injectable({
    providedIn: 'root'
})
export class KgiAuthInterceptor implements HttpInterceptor {

    constructor(public router: Router,
                protected gd: GlobalDataService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        //TODO: 可以改成 multi token support
        //console.log('gd: ', this.gd);
        const token = this.gd.token;

        // console.log('token: ', token);

        const clonedRequest = req.clone({
            headers: req.headers.set("KGI", "KGI")
        });
        // console.log('KgiAuthInterceptor token: ', token );

        if (token) {
            req = clonedRequest.clone({
                setHeaders: {
                    Authorization: 'Bearer' + token
                },
                body: req.body
            });
        }

        return next.handle(req).pipe(tap((event) => {},(err) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                //this.router.navigate(['/pages/login']);
                console.log(err);
            }
        }));

    }
}
