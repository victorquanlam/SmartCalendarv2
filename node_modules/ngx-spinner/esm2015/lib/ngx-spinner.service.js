/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgxSpinner, PRIMARY_SPINNER } from './ngx-spinner.enum';
import * as i0 from "@angular/core";
export class NgxSpinnerService {
    /**
     * Creates an instance of NgxSpinnerService.
     * \@memberof NgxSpinnerService
     */
    constructor() {
        /**
         * Spinner observable
         *
         * \@memberof NgxSpinnerService
         */
        this.spinnerObservable = new ReplaySubject(1);
    }
    /**
     * Get subscription of desired spinner
     * \@memberof NgxSpinnerService
     *
     * @param {?} name
     * @return {?}
     */
    getSpinner(name) {
        return this.spinnerObservable.asObservable().pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        (x) => x && x.name === name)));
    }
    /**
     * To show spinner
     *
     * \@memberof NgxSpinnerService
     * @param {?=} name
     * @param {?=} spinner
     * @return {?}
     */
    show(name = PRIMARY_SPINNER, spinner) {
        /** @type {?} */
        const showPromise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (spinner && Object.keys(spinner).length) {
                spinner['name'] = name;
                this.spinnerObservable.next(new NgxSpinner(Object.assign({}, spinner, { show: true })));
                resolve(true);
            }
            else {
                this.spinnerObservable.next(new NgxSpinner({ name, show: true }));
                resolve(true);
            }
        }));
        return showPromise;
    }
    /**
     * To hide spinner
     *
     * \@memberof NgxSpinnerService
     * @param {?=} name
     * @return {?}
     */
    hide(name = PRIMARY_SPINNER) {
        /** @type {?} */
        const hidePromise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.spinnerObservable.next(new NgxSpinner({ name, show: false }));
            resolve(true);
        }));
        return hidePromise;
    }
}
NgxSpinnerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxSpinnerService.ctorParameters = () => [];
/** @nocollapse */ NgxSpinnerService.ngInjectableDef = i0.defineInjectable({ factory: function NgxSpinnerService_Factory() { return new NgxSpinnerService(); }, token: NgxSpinnerService, providedIn: "root" });
if (false) {
    /**
     * Spinner observable
     *
     * \@memberof NgxSpinnerService
     * @type {?}
     * @private
     */
    NgxSpinnerService.prototype.spinnerObservable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNwaW5uZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL25neC1zcGlubmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQVcsTUFBTSxvQkFBb0IsQ0FBQzs7QUFLMUUsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFXNUI7Ozs7OztRQUxRLHNCQUFpQixHQUFHLElBQUksYUFBYSxDQUFhLENBQUMsQ0FBQyxDQUFDO0lBSzdDLENBQUM7Ozs7Ozs7O0lBS2pCLFVBQVUsQ0FBQyxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBQyxDQUFDLENBQUM7SUFDckcsQ0FBQzs7Ozs7Ozs7O0lBTUQsSUFBSSxDQUFDLE9BQWUsZUFBZSxFQUFFLE9BQWlCOztjQUM5QyxXQUFXLEdBQUcsSUFBSSxPQUFPOzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2xELElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUMxQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxtQkFBTSxPQUFPLElBQUUsSUFBSSxFQUFFLElBQUksSUFBRyxDQUFDLENBQUM7Z0JBQ3hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLEVBQUM7UUFDRixPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7Ozs7OztJQU1ELElBQUksQ0FBQyxPQUFlLGVBQWU7O2NBQzNCLFdBQVcsR0FBRyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDLEVBQUM7UUFDRixPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7WUFuREYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7Ozs7O0lBT0MsOENBQTZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTmd4U3Bpbm5lciwgUFJJTUFSWV9TUElOTkVSLCBTcGlubmVyIH0gZnJvbSAnLi9uZ3gtc3Bpbm5lci5lbnVtJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4U3Bpbm5lclNlcnZpY2Uge1xuICAvKipcbiAgICogU3Bpbm5lciBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBzcGlubmVyT2JzZXJ2YWJsZSA9IG5ldyBSZXBsYXlTdWJqZWN0PE5neFNwaW5uZXI+KDEpO1xuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBOZ3hTcGlubmVyU2VydmljZS5cbiAgICogQG1lbWJlcm9mIE5neFNwaW5uZXJTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuICAvKipcbiAgKiBHZXQgc3Vic2NyaXB0aW9uIG9mIGRlc2lyZWQgc3Bpbm5lclxuICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyU2VydmljZVxuICAqKi9cbiAgZ2V0U3Bpbm5lcihuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE5neFNwaW5uZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zcGlubmVyT2JzZXJ2YWJsZS5hc09ic2VydmFibGUoKS5waXBlKGZpbHRlcigoeDogTmd4U3Bpbm5lcikgPT4geCAmJiB4Lm5hbWUgPT09IG5hbWUpKTtcbiAgfVxuICAvKipcbiAgICogVG8gc2hvdyBzcGlubmVyXG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyU2VydmljZVxuICAgKi9cbiAgc2hvdyhuYW1lOiBzdHJpbmcgPSBQUklNQVJZX1NQSU5ORVIsIHNwaW5uZXI/OiBTcGlubmVyKSB7XG4gICAgY29uc3Qgc2hvd1Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoc3Bpbm5lciAmJiBPYmplY3Qua2V5cyhzcGlubmVyKS5sZW5ndGgpIHtcbiAgICAgICAgc3Bpbm5lclsnbmFtZSddID0gbmFtZTtcbiAgICAgICAgdGhpcy5zcGlubmVyT2JzZXJ2YWJsZS5uZXh0KG5ldyBOZ3hTcGlubmVyKHsgLi4uc3Bpbm5lciwgc2hvdzogdHJ1ZSB9KSk7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNwaW5uZXJPYnNlcnZhYmxlLm5leHQobmV3IE5neFNwaW5uZXIoeyBuYW1lLCBzaG93OiB0cnVlIH0pKTtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc2hvd1Byb21pc2U7XG4gIH1cbiAgLyoqXG4gICogVG8gaGlkZSBzcGlubmVyXG4gICpcbiAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lclNlcnZpY2VcbiAgKi9cbiAgaGlkZShuYW1lOiBzdHJpbmcgPSBQUklNQVJZX1NQSU5ORVIpIHtcbiAgICBjb25zdCBoaWRlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuc3Bpbm5lck9ic2VydmFibGUubmV4dChuZXcgTmd4U3Bpbm5lcih7IG5hbWUsIHNob3c6IGZhbHNlIH0pKTtcbiAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGhpZGVQcm9taXNlO1xuICB9XG59XG4iXX0=