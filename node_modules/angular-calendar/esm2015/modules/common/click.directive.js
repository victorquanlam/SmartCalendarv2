/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Renderer2, ElementRef, Output, EventEmitter, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class ClickDirective {
    /**
     * @param {?} renderer
     * @param {?} elm
     * @param {?} document
     */
    constructor(renderer, elm, document) {
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
    ngOnInit() {
        if (!this.clickListenerDisabled) {
            this.listen()
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                event.stopPropagation();
                this.click.emit(event);
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
    }
    /**
     * @private
     * @return {?}
     */
    listen() {
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        observer => {
            return this.renderer.listen(this.elm.nativeElement, 'click', (/**
             * @param {?} event
             * @return {?}
             */
            event => {
                observer.next(event);
            }));
        }));
    }
}
ClickDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlClick]'
            },] }
];
/** @nocollapse */
ClickDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
ClickDirective.propDecorators = {
    clickListenerDisabled: [{ type: Input }],
    click: [{ type: Output, args: ['mwlClick',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NsaWNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUdWLE1BQU0sRUFDTixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzNDLE1BQU0sT0FBTyxjQUFjOzs7Ozs7SUFPekIsWUFDVSxRQUFtQixFQUNuQixHQUE0QixFQUNWLFFBQVE7UUFGMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixRQUFHLEdBQUgsR0FBRyxDQUF5QjtRQUNWLGFBQVEsR0FBUixRQUFRLENBQUE7UUFUM0IsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBRW5CLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDLENBQUMsc0JBQXNCOztRQUUxRSxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQU05QixDQUFDOzs7O0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtpQkFDVixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDOUIsU0FBUzs7OztZQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLENBQUMsRUFBQyxDQUFDO1NBQ047SUFDSCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFTyxNQUFNO1FBQ1osT0FBTyxJQUFJLFVBQVU7Ozs7UUFBYSxRQUFRLENBQUMsRUFBRTtZQUMzQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE9BQU87Ozs7WUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbkUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBckNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTthQUN2Qjs7OztZQWhCQyxTQUFTO1lBQ1QsVUFBVTs0Q0EwQlAsTUFBTSxTQUFDLFFBQVE7OztvQ0FUakIsS0FBSztvQkFFTCxNQUFNLFNBQUMsVUFBVTs7OztJQUZsQiwrQ0FBdUM7O0lBRXZDLCtCQUEyRDs7Ozs7SUFFM0Qsa0NBQWlDOzs7OztJQUcvQixrQ0FBMkI7Ozs7O0lBQzNCLDZCQUFvQzs7Ozs7SUFDcEMsa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXdsQ2xpY2tdJ1xufSlcbmV4cG9ydCBjbGFzcyBDbGlja0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgY2xpY2tMaXN0ZW5lckRpc2FibGVkID0gZmFsc2U7XG5cbiAgQE91dHB1dCgnbXdsQ2xpY2snKSBjbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsbTogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudFxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNsaWNrTGlzdGVuZXJEaXNhYmxlZCkge1xuICAgICAgdGhpcy5saXN0ZW4oKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIHRoaXMuY2xpY2suZW1pdChldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW4oKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+KG9ic2VydmVyID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsbS5uYXRpdmVFbGVtZW50LCAnY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgIG9ic2VydmVyLm5leHQoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==