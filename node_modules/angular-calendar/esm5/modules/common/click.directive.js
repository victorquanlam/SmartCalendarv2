/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Renderer2, ElementRef, Output, EventEmitter, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
var ClickDirective = /** @class */ (function () {
    function ClickDirective(renderer, elm, document) {
        this.renderer = renderer;
        this.elm = elm;
        this.document = document;
        this.clickListenerDisabled = false;
        this.click = new EventEmitter(); // tslint:disable-line
        // tslint:disable-line
        this.destroy$ = new Subject();
    }
    /**
     * @return {?}
     */
    ClickDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.clickListenerDisabled) {
            this.listen()
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                event.stopPropagation();
                _this.click.emit(event);
            }));
        }
    };
    /**
     * @return {?}
     */
    ClickDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
    };
    /**
     * @private
     * @return {?}
     */
    ClickDirective.prototype.listen = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            return _this.renderer.listen(_this.elm.nativeElement, 'click', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                observer.next(event);
            }));
        }));
    };
    ClickDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlClick]'
                },] }
    ];
    /** @nocollapse */
    ClickDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    ClickDirective.propDecorators = {
        clickListenerDisabled: [{ type: Input }],
        click: [{ type: Output, args: ['mwlClick',] }]
    };
    return ClickDirective;
}());
export { ClickDirective };
if (false) {
    /** @type {?} */
    ClickDirective.prototype.clickListenerDisabled;
    /** @type {?} */
    ClickDirective.prototype.click;
    /**
     * @type {?}
     * @private
     */
    ClickDirective.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    ClickDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ClickDirective.prototype.elm;
    /**
     * @type {?}
     * @private
     */
    ClickDirective.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NsaWNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUdWLE1BQU0sRUFDTixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDO0lBVUUsd0JBQ1UsUUFBbUIsRUFDbkIsR0FBNEIsRUFDVixRQUFRO1FBRjFCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBeUI7UUFDVixhQUFRLEdBQVIsUUFBUSxDQUFBO1FBVDNCLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUVuQixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQyxDQUFDLHNCQUFzQjs7UUFFMUUsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFNOUIsQ0FBQzs7OztJQUVKLGlDQUFROzs7SUFBUjtRQUFBLGlCQVNDO1FBUkMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFO2lCQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM5QixTQUFTOzs7O1lBQUMsVUFBQSxLQUFLO2dCQUNkLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekIsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNILENBQUM7Ozs7SUFFRCxvQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRU8sK0JBQU07Ozs7SUFBZDtRQUFBLGlCQU1DO1FBTEMsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBYSxVQUFBLFFBQVE7WUFDeEMsT0FBTyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxPQUFPOzs7O1lBQUUsVUFBQSxLQUFLO2dCQUNoRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztnQkFyQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjs7OztnQkFoQkMsU0FBUztnQkFDVCxVQUFVO2dEQTBCUCxNQUFNLFNBQUMsUUFBUTs7O3dDQVRqQixLQUFLO3dCQUVMLE1BQU0sU0FBQyxVQUFVOztJQWdDcEIscUJBQUM7Q0FBQSxBQXRDRCxJQXNDQztTQW5DWSxjQUFjOzs7SUFDekIsK0NBQXVDOztJQUV2QywrQkFBMkQ7Ozs7O0lBRTNELGtDQUFpQzs7Ozs7SUFHL0Isa0NBQTJCOzs7OztJQUMzQiw2QkFBb0M7Ozs7O0lBQ3BDLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgUmVuZGVyZXIyLFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bENsaWNrXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGNsaWNrTGlzdGVuZXJEaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoJ213bENsaWNrJykgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbG06IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnRcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jbGlja0xpc3RlbmVyRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMubGlzdGVuKClcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB0aGlzLmNsaWNrLmVtaXQoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuKCkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PihvYnNlcnZlciA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbG0ubmF0aXZlRWxlbWVudCwgJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICBvYnNlcnZlci5uZXh0KGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=