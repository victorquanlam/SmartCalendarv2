/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgxSpinner, PRIMARY_SPINNER } from './ngx-spinner.enum';
import * as i0 from "@angular/core";
var NgxSpinnerService = /** @class */ (function () {
    /**
     * Creates an instance of NgxSpinnerService.
     * @memberof NgxSpinnerService
     */
    function NgxSpinnerService() {
        /**
         * Spinner observable
         *
         * \@memberof NgxSpinnerService
         */
        this.spinnerObservable = new ReplaySubject(1);
    }
    /**
    * Get subscription of desired spinner
    * @memberof NgxSpinnerService
    **/
    /**
     * Get subscription of desired spinner
     * \@memberof NgxSpinnerService
     *
     * @param {?} name
     * @return {?}
     */
    NgxSpinnerService.prototype.getSpinner = /**
     * Get subscription of desired spinner
     * \@memberof NgxSpinnerService
     *
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.spinnerObservable.asObservable().pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x && x.name === name; })));
    };
    /**
     * To show spinner
     *
     * @memberof NgxSpinnerService
     */
    /**
     * To show spinner
     *
     * \@memberof NgxSpinnerService
     * @param {?=} name
     * @param {?=} spinner
     * @return {?}
     */
    NgxSpinnerService.prototype.show = /**
     * To show spinner
     *
     * \@memberof NgxSpinnerService
     * @param {?=} name
     * @param {?=} spinner
     * @return {?}
     */
    function (name, spinner) {
        var _this = this;
        if (name === void 0) { name = PRIMARY_SPINNER; }
        /** @type {?} */
        var showPromise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (spinner && Object.keys(spinner).length) {
                spinner['name'] = name;
                _this.spinnerObservable.next(new NgxSpinner(tslib_1.__assign({}, spinner, { show: true })));
                resolve(true);
            }
            else {
                _this.spinnerObservable.next(new NgxSpinner({ name: name, show: true }));
                resolve(true);
            }
        }));
        return showPromise;
    };
    /**
    * To hide spinner
    *
    * @memberof NgxSpinnerService
    */
    /**
     * To hide spinner
     *
     * \@memberof NgxSpinnerService
     * @param {?=} name
     * @return {?}
     */
    NgxSpinnerService.prototype.hide = /**
     * To hide spinner
     *
     * \@memberof NgxSpinnerService
     * @param {?=} name
     * @return {?}
     */
    function (name) {
        var _this = this;
        if (name === void 0) { name = PRIMARY_SPINNER; }
        /** @type {?} */
        var hidePromise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.spinnerObservable.next(new NgxSpinner({ name: name, show: false }));
            resolve(true);
        }));
        return hidePromise;
    };
    NgxSpinnerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxSpinnerService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxSpinnerService.ngInjectableDef = i0.defineInjectable({ factory: function NgxSpinnerService_Factory() { return new NgxSpinnerService(); }, token: NgxSpinnerService, providedIn: "root" });
    return NgxSpinnerService;
}());
export { NgxSpinnerService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNwaW5uZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL25neC1zcGlubmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFXLE1BQU0sb0JBQW9CLENBQUM7O0FBRTFFO0lBVUU7OztPQUdHO0lBQ0g7Ozs7OztRQUxRLHNCQUFpQixHQUFHLElBQUksYUFBYSxDQUFhLENBQUMsQ0FBQyxDQUFDO0lBSzdDLENBQUM7SUFDakI7OztPQUdHOzs7Ozs7OztJQUNILHNDQUFVOzs7Ozs7O0lBQVYsVUFBVyxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQyxDQUFhLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQXBCLENBQW9CLEVBQUMsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFDRDs7OztPQUlHOzs7Ozs7Ozs7SUFDSCxnQ0FBSTs7Ozs7Ozs7SUFBSixVQUFLLElBQThCLEVBQUUsT0FBaUI7UUFBdEQsaUJBWUM7UUFaSSxxQkFBQSxFQUFBLHNCQUE4Qjs7WUFDM0IsV0FBVyxHQUFHLElBQUksT0FBTzs7Ozs7UUFBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQzlDLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUMxQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxzQkFBTSxPQUFPLElBQUUsSUFBSSxFQUFFLElBQUksSUFBRyxDQUFDLENBQUM7Z0JBQ3hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsRUFBQztRQUNGLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFDRDs7OztNQUlFOzs7Ozs7OztJQUNGLGdDQUFJOzs7Ozs7O0lBQUosVUFBSyxJQUE4QjtRQUFuQyxpQkFNQztRQU5JLHFCQUFBLEVBQUEsc0JBQThCOztZQUMzQixXQUFXLEdBQUcsSUFBSSxPQUFPOzs7OztRQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDOUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLENBQUMsRUFBQztRQUNGLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7O2dCQW5ERixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Ozs0QkFQRDtDQXlEQyxBQXBERCxJQW9EQztTQWpEWSxpQkFBaUI7Ozs7Ozs7OztJQU01Qiw4Q0FBNkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ3hTcGlubmVyLCBQUklNQVJZX1NQSU5ORVIsIFNwaW5uZXIgfSBmcm9tICcuL25neC1zcGlubmVyLmVudW0nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hTcGlubmVyU2VydmljZSB7XG4gIC8qKlxuICAgKiBTcGlubmVyIG9ic2VydmFibGVcbiAgICpcbiAgICogQG1lbWJlcm9mIE5neFNwaW5uZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIHNwaW5uZXJPYnNlcnZhYmxlID0gbmV3IFJlcGxheVN1YmplY3Q8Tmd4U3Bpbm5lcj4oMSk7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE5neFNwaW5uZXJTZXJ2aWNlLlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIC8qKlxuICAqIEdldCBzdWJzY3JpcHRpb24gb2YgZGVzaXJlZCBzcGlubmVyXG4gICogQG1lbWJlcm9mIE5neFNwaW5uZXJTZXJ2aWNlXG4gICoqL1xuICBnZXRTcGlubmVyKG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8Tmd4U3Bpbm5lcj4ge1xuICAgIHJldHVybiB0aGlzLnNwaW5uZXJPYnNlcnZhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlsdGVyKCh4OiBOZ3hTcGlubmVyKSA9PiB4ICYmIHgubmFtZSA9PT0gbmFtZSkpO1xuICB9XG4gIC8qKlxuICAgKiBUbyBzaG93IHNwaW5uZXJcbiAgICpcbiAgICogQG1lbWJlcm9mIE5neFNwaW5uZXJTZXJ2aWNlXG4gICAqL1xuICBzaG93KG5hbWU6IHN0cmluZyA9IFBSSU1BUllfU1BJTk5FUiwgc3Bpbm5lcj86IFNwaW5uZXIpIHtcbiAgICBjb25zdCBzaG93UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmIChzcGlubmVyICYmIE9iamVjdC5rZXlzKHNwaW5uZXIpLmxlbmd0aCkge1xuICAgICAgICBzcGlubmVyWyduYW1lJ10gPSBuYW1lO1xuICAgICAgICB0aGlzLnNwaW5uZXJPYnNlcnZhYmxlLm5leHQobmV3IE5neFNwaW5uZXIoeyAuLi5zcGlubmVyLCBzaG93OiB0cnVlIH0pKTtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3Bpbm5lck9ic2VydmFibGUubmV4dChuZXcgTmd4U3Bpbm5lcih7IG5hbWUsIHNob3c6IHRydWUgfSkpO1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzaG93UHJvbWlzZTtcbiAgfVxuICAvKipcbiAgKiBUbyBoaWRlIHNwaW5uZXJcbiAgKlxuICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyU2VydmljZVxuICAqL1xuICBoaWRlKG5hbWU6IHN0cmluZyA9IFBSSU1BUllfU1BJTk5FUikge1xuICAgIGNvbnN0IGhpZGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5zcGlubmVyT2JzZXJ2YWJsZS5uZXh0KG5ldyBOZ3hTcGlubmVyKHsgbmFtZSwgc2hvdzogZmFsc2UgfSkpO1xuICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaGlkZVByb21pc2U7XG4gIH1cbn1cbiJdfQ==