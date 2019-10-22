/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Component, HostListener, Input, Injector, ComponentFactoryResolver, ViewContainerRef, ElementRef, Inject, Renderer2, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { positionElements } from 'positioning';
import { of, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class CalendarTooltipWindowComponent {
}
CalendarTooltipWindowComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-tooltip-window',
                template: `
    <ng-template
      #defaultTemplate
      let-contents="contents"
      let-placement="placement"
      let-event="event"
    >
      <div class="cal-tooltip" [ngClass]="'cal-tooltip-' + placement">
        <div class="cal-tooltip-arrow"></div>
        <div class="cal-tooltip-inner" [innerHtml]="contents"></div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        contents: contents,
        placement: placement,
        event: event
      }"
    >
    </ng-template>
  `
            }] }
];
CalendarTooltipWindowComponent.propDecorators = {
    contents: [{ type: Input }],
    placement: [{ type: Input }],
    event: [{ type: Input }],
    customTemplate: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.contents;
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.placement;
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.event;
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.customTemplate;
}
export class CalendarTooltipDirective {
    /**
     * @param {?} elementRef
     * @param {?} injector
     * @param {?} renderer
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} document
     */
    constructor(elementRef, injector, renderer, componentFactoryResolver, viewContainerRef, document //tslint:disable-line
    ) {
        this.elementRef = elementRef;
        this.injector = injector;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.document = document;
        // tslint:disable-line no-input-rename
        this.placement = 'auto'; // tslint:disable-line no-input-rename
        // tslint:disable-line no-input-rename
        this.delay = null; // tslint:disable-line no-input-rename
        this.cancelTooltipDelay$ = new Subject();
        this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(CalendarTooltipWindowComponent);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.tooltipRef &&
            (changes.contents || changes.customTemplate || changes.event)) {
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.customTemplate = this.customTemplate;
            this.tooltipRef.instance.event = this.event;
            this.tooltipRef.changeDetectorRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.hide();
    }
    /**
     * @return {?}
     */
    onMouseOver() {
        /** @type {?} */
        const delay$ = this.delay === null ? of('now') : timer(this.delay);
        delay$.pipe(takeUntil(this.cancelTooltipDelay$)).subscribe((/**
         * @return {?}
         */
        () => {
            this.show();
        }));
    }
    /**
     * @return {?}
     */
    onMouseOut() {
        this.hide();
    }
    /**
     * @private
     * @return {?}
     */
    show() {
        if (!this.tooltipRef && this.contents) {
            this.tooltipRef = this.viewContainerRef.createComponent(this.tooltipFactory, 0, this.injector, []);
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.customTemplate = this.customTemplate;
            this.tooltipRef.instance.event = this.event;
            if (this.appendToBody) {
                this.document.body.appendChild(this.tooltipRef.location.nativeElement);
            }
            requestAnimationFrame((/**
             * @return {?}
             */
            () => {
                this.positionTooltip();
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    hide() {
        if (this.tooltipRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
            this.tooltipRef = null;
        }
        this.cancelTooltipDelay$.next();
    }
    /**
     * @private
     * @param {?=} previousPositions
     * @return {?}
     */
    positionTooltip(previousPositions = []) {
        if (this.tooltipRef) {
            this.tooltipRef.changeDetectorRef.detectChanges();
            this.tooltipRef.instance.placement = positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, this.appendToBody);
            // keep re-positioning the tooltip until the arrow position doesn't make a difference
            if (previousPositions.indexOf(this.tooltipRef.instance.placement) === -1) {
                this.positionTooltip([
                    ...previousPositions,
                    this.tooltipRef.instance.placement
                ]);
            }
        }
    }
}
CalendarTooltipDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlCalendarTooltip]'
            },] }
];
/** @nocollapse */
CalendarTooltipDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector },
    { type: Renderer2 },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
CalendarTooltipDirective.propDecorators = {
    contents: [{ type: Input, args: ['mwlCalendarTooltip',] }],
    placement: [{ type: Input, args: ['tooltipPlacement',] }],
    customTemplate: [{ type: Input, args: ['tooltipTemplate',] }],
    event: [{ type: Input, args: ['tooltipEvent',] }],
    appendToBody: [{ type: Input, args: ['tooltipAppendToBody',] }],
    delay: [{ type: Input, args: ['tooltipDelay',] }],
    onMouseOver: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseOut: [{ type: HostListener, args: ['mouseleave',] }]
};
if (false) {
    /** @type {?} */
    CalendarTooltipDirective.prototype.contents;
    /** @type {?} */
    CalendarTooltipDirective.prototype.placement;
    /** @type {?} */
    CalendarTooltipDirective.prototype.customTemplate;
    /** @type {?} */
    CalendarTooltipDirective.prototype.event;
    /** @type {?} */
    CalendarTooltipDirective.prototype.appendToBody;
    /** @type {?} */
    CalendarTooltipDirective.prototype.delay;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.tooltipFactory;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.tooltipRef;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.cancelTooltipDelay$;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFFWixLQUFLLEVBRUwsUUFBUSxFQUNSLHdCQUF3QixFQUN4QixnQkFBZ0IsRUFDaEIsVUFBVSxFQUVWLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUdaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQWtCLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRS9ELE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUEyQjNDLE1BQU0sT0FBTyw4QkFBOEI7OztZQXpCMUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJUO2FBQ0Y7Ozt1QkFFRSxLQUFLO3dCQUVMLEtBQUs7b0JBRUwsS0FBSzs2QkFFTCxLQUFLOzs7O0lBTk4sa0RBQTBCOztJQUUxQixtREFBMkI7O0lBRTNCLCtDQUE4Qjs7SUFFOUIsd0RBQTBDOztBQU01QyxNQUFNLE9BQU8sd0JBQXdCOzs7Ozs7Ozs7SUFpQm5DLFlBQ1UsVUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsUUFBbUIsRUFDM0Isd0JBQWtELEVBQzFDLGdCQUFrQyxFQUNoQixRQUFRLENBQUMscUJBQXFCOztRQUxoRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFR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LFNBQUMsY0FBYzsyQkFFcEIsS0FBSyxTQUFDLHFCQUFxQjtvQkFFM0IsS0FBSyxTQUFDLGNBQWM7MEJBbUNwQixZQUFZLFNBQUMsWUFBWTt5QkFTekIsWUFBWSxTQUFDLFlBQVk7Ozs7SUF0RDFCLDRDQUE4Qzs7SUFFOUMsNkNBQThEOztJQUU5RCxrREFBMkQ7O0lBRTNELHlDQUE0Qzs7SUFFNUMsZ0RBQW9EOztJQUVwRCx5Q0FBbUQ7Ozs7O0lBRW5ELGtEQUF5RTs7Ozs7SUFDekUsOENBQWlFOzs7OztJQUNqRSx1REFBNEM7Ozs7O0lBRzFDLDhDQUE4Qjs7Ozs7SUFDOUIsNENBQTBCOzs7OztJQUMxQiw0Q0FBMkI7Ozs7O0lBRTNCLG9EQUEwQzs7Ozs7SUFDMUMsNENBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBDb21wb25lbnQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT25EZXN0cm95LFxuICBJbnB1dCxcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3RvcixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBFbGVtZW50UmVmLFxuICBDb21wb25lbnRGYWN0b3J5LFxuICBJbmplY3QsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBsYWNlbWVudEFycmF5LCBwb3NpdGlvbkVsZW1lbnRzIH0gZnJvbSAncG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJqZWN0LCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItdG9vbHRpcC13aW5kb3cnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWNvbnRlbnRzPVwiY29udGVudHNcIlxuICAgICAgbGV0LXBsYWNlbWVudD1cInBsYWNlbWVudFwiXG4gICAgICBsZXQtZXZlbnQ9XCJldmVudFwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC10b29sdGlwXCIgW25nQ2xhc3NdPVwiJ2NhbC10b29sdGlwLScgKyBwbGFjZW1lbnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC10b29sdGlwLWFycm93XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdG9vbHRpcC1pbm5lclwiIFtpbm5lckh0bWxdPVwiY29udGVudHNcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgY29udGVudHM6IGNvbnRlbnRzLFxuICAgICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgICAgZXZlbnQ6IGV2ZW50XG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnQge1xuICBASW5wdXQoKSBjb250ZW50czogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXdsQ2FsZW5kYXJUb29sdGlwXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoJ213bENhbGVuZGFyVG9vbHRpcCcpIGNvbnRlbnRzOiBzdHJpbmc7IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8taW5wdXQtcmVuYW1lXG5cbiAgQElucHV0KCd0b29sdGlwUGxhY2VtZW50JykgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJzsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcblxuICBASW5wdXQoJ3Rvb2x0aXBUZW1wbGF0ZScpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIEBJbnB1dCgndG9vbHRpcEV2ZW50JykgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8taW5wdXQtcmVuYW1lXG5cbiAgQElucHV0KCd0b29sdGlwQXBwZW5kVG9Cb2R5JykgYXBwZW5kVG9Cb2R5OiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIEBJbnB1dCgndG9vbHRpcERlbGF5JykgZGVsYXk6IG51bWJlciB8IG51bGwgPSBudWxsOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIHByaXZhdGUgdG9vbHRpcEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8Q2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSB0b29sdGlwUmVmOiBDb21wb25lbnRSZWY8Q2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBjYW5jZWxUb29sdGlwRGVsYXkkID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50IC8vdHNsaW50OmRpc2FibGUtbGluZVxuICApIHtcbiAgICB0aGlzLnRvb2x0aXBGYWN0b3J5ID0gY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50XG4gICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnRvb2x0aXBSZWYgJiZcbiAgICAgIChjaGFuZ2VzLmNvbnRlbnRzIHx8IGNoYW5nZXMuY3VzdG9tVGVtcGxhdGUgfHwgY2hhbmdlcy5ldmVudClcbiAgICApIHtcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5jb250ZW50cyA9IHRoaXMuY29udGVudHM7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UuY3VzdG9tVGVtcGxhdGUgPSB0aGlzLmN1c3RvbVRlbXBsYXRlO1xuICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLmV2ZW50ID0gdGhpcy5ldmVudDtcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBvbk1vdXNlT3ZlcigpOiB2b2lkIHtcbiAgICBjb25zdCBkZWxheSQ6IE9ic2VydmFibGU8YW55PiA9XG4gICAgICB0aGlzLmRlbGF5ID09PSBudWxsID8gb2YoJ25vdycpIDogdGltZXIodGhpcy5kZWxheSk7XG4gICAgZGVsYXkkLnBpcGUodGFrZVVudGlsKHRoaXMuY2FuY2VsVG9vbHRpcERlbGF5JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBvbk1vdXNlT3V0KCk6IHZvaWQge1xuICAgIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG93KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy50b29sdGlwUmVmICYmIHRoaXMuY29udGVudHMpIHtcbiAgICAgIHRoaXMudG9vbHRpcFJlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoXG4gICAgICAgIHRoaXMudG9vbHRpcEZhY3RvcnksXG4gICAgICAgIDAsXG4gICAgICAgIHRoaXMuaW5qZWN0b3IsXG4gICAgICAgIFtdXG4gICAgICApO1xuICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLmNvbnRlbnRzID0gdGhpcy5jb250ZW50cztcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5jdXN0b21UZW1wbGF0ZSA9IHRoaXMuY3VzdG9tVGVtcGxhdGU7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UuZXZlbnQgPSB0aGlzLmV2ZW50O1xuICAgICAgaWYgKHRoaXMuYXBwZW5kVG9Cb2R5KSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLnBvc2l0aW9uVG9vbHRpcCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoaWRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2x0aXBSZWYpIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5yZW1vdmUoXG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5pbmRleE9mKHRoaXMudG9vbHRpcFJlZi5ob3N0VmlldylcbiAgICAgICk7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmNhbmNlbFRvb2x0aXBEZWxheSQubmV4dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3NpdGlvblRvb2x0aXAocHJldmlvdXNQb3NpdGlvbnM6IHN0cmluZ1tdID0gW10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sdGlwUmVmKSB7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLnBsYWNlbWVudCA9IHBvc2l0aW9uRWxlbWVudHMoXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICB0aGlzLnRvb2x0aXBSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSxcbiAgICAgICAgdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgIHRoaXMuYXBwZW5kVG9Cb2R5XG4gICAgICApO1xuICAgICAgLy8ga2VlcCByZS1wb3NpdGlvbmluZyB0aGUgdG9vbHRpcCB1bnRpbCB0aGUgYXJyb3cgcG9zaXRpb24gZG9lc24ndCBtYWtlIGEgZGlmZmVyZW5jZVxuICAgICAgaWYgKFxuICAgICAgICBwcmV2aW91c1Bvc2l0aW9ucy5pbmRleE9mKHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5wbGFjZW1lbnQpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25Ub29sdGlwKFtcbiAgICAgICAgICAuLi5wcmV2aW91c1Bvc2l0aW9ucyxcbiAgICAgICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UucGxhY2VtZW50XG4gICAgICAgIF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19