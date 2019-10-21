/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Component, HostListener, Input, Injector, ComponentFactoryResolver, ViewContainerRef, ElementRef, Inject, Renderer2, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { positionElements } from 'positioning';
import { of, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
var CalendarTooltipWindowComponent = /** @class */ (function () {
    function CalendarTooltipWindowComponent() {
    }
    CalendarTooltipWindowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-tooltip-window',
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-contents=\"contents\"\n      let-placement=\"placement\"\n      let-event=\"event\"\n    >\n      <div class=\"cal-tooltip\" [ngClass]=\"'cal-tooltip-' + placement\">\n        <div class=\"cal-tooltip-arrow\"></div>\n        <div class=\"cal-tooltip-inner\" [innerHtml]=\"contents\"></div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        contents: contents,\n        placement: placement,\n        event: event\n      }\"\n    >\n    </ng-template>\n  "
                }] }
    ];
    CalendarTooltipWindowComponent.propDecorators = {
        contents: [{ type: Input }],
        placement: [{ type: Input }],
        event: [{ type: Input }],
        customTemplate: [{ type: Input }]
    };
    return CalendarTooltipWindowComponent;
}());
export { CalendarTooltipWindowComponent };
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
var CalendarTooltipDirective = /** @class */ (function () {
    function CalendarTooltipDirective(elementRef, injector, renderer, componentFactoryResolver, viewContainerRef, document //tslint:disable-line
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
    CalendarTooltipDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.tooltipRef &&
            (changes.contents || changes.customTemplate || changes.event)) {
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.customTemplate = this.customTemplate;
            this.tooltipRef.instance.event = this.event;
            this.tooltipRef.changeDetectorRef.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.hide();
    };
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.onMouseOver = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var delay$ = this.delay === null ? of('now') : timer(this.delay);
        delay$.pipe(takeUntil(this.cancelTooltipDelay$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.show();
        }));
    };
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.onMouseOut = /**
     * @return {?}
     */
    function () {
        this.hide();
    };
    /**
     * @private
     * @return {?}
     */
    CalendarTooltipDirective.prototype.show = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
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
            function () {
                _this.positionTooltip();
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    CalendarTooltipDirective.prototype.hide = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.tooltipRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
            this.tooltipRef = null;
        }
        this.cancelTooltipDelay$.next();
    };
    /**
     * @private
     * @param {?=} previousPositions
     * @return {?}
     */
    CalendarTooltipDirective.prototype.positionTooltip = /**
     * @private
     * @param {?=} previousPositions
     * @return {?}
     */
    function (previousPositions) {
        if (previousPositions === void 0) { previousPositions = []; }
        if (this.tooltipRef) {
            this.tooltipRef.changeDetectorRef.detectChanges();
            this.tooltipRef.instance.placement = positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, this.appendToBody);
            // keep re-positioning the tooltip until the arrow position doesn't make a difference
            if (previousPositions.indexOf(this.tooltipRef.instance.placement) === -1) {
                this.positionTooltip(tslib_1.__spread(previousPositions, [
                    this.tooltipRef.instance.placement
                ]));
            }
        }
    };
    CalendarTooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlCalendarTooltip]'
                },] }
    ];
    /** @nocollapse */
    CalendarTooltipDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector },
        { type: Renderer2 },
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
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
    return CalendarTooltipDirective;
}());
export { CalendarTooltipDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBRVosS0FBSyxFQUVMLFFBQVEsRUFDUix3QkFBd0IsRUFDeEIsZ0JBQWdCLEVBQ2hCLFVBQVUsRUFFVixNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFHWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFrQixnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUvRCxPQUFPLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDO0lBQUE7SUFpQ0EsQ0FBQzs7Z0JBakNBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxRQUFRLEVBQUUsOG1CQXFCVDtpQkFDRjs7OzJCQUVFLEtBQUs7NEJBRUwsS0FBSzt3QkFFTCxLQUFLO2lDQUVMLEtBQUs7O0lBQ1IscUNBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQVJZLDhCQUE4Qjs7O0lBQ3pDLGtEQUEwQjs7SUFFMUIsbURBQTJCOztJQUUzQiwrQ0FBOEI7O0lBRTlCLHdEQUEwQzs7QUFHNUM7SUFvQkUsa0NBQ1UsVUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsUUFBbUIsRUFDM0Isd0JBQWtELEVBQzFDLGdCQUFrQyxFQUNoQixRQUFRLENBQUMscUJBQXFCOztRQUxoRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENB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SyxTQUFDLG9CQUFvQjs0QkFFMUIsS0FBSyxTQUFDLGtCQUFrQjtpQ0FFeEIsS0FBSyxTQUFDLGlCQUFpQjt3QkFFdkIsS0FBSyxTQUFDLGNBQWM7K0JBRXBCLEtBQUssU0FBQyxxQkFBcUI7d0JBRTNCLEtBQUssU0FBQyxjQUFjOzhCQW1DcEIsWUFBWSxTQUFDLFlBQVk7NkJBU3pCLFlBQVksU0FBQyxZQUFZOztJQXVENUIsK0JBQUM7Q0FBQSxBQWpIRCxJQWlIQztTQTlHWSx3QkFBd0I7OztJQUNuQyw0Q0FBOEM7O0lBRTlDLDZDQUE4RDs7SUFFOUQsa0RBQTJEOztJQUUzRCx5Q0FBNEM7O0lBRTVDLGdEQUFvRDs7SUFFcEQseUNBQW1EOzs7OztJQUVuRCxrREFBeUU7Ozs7O0lBQ3pFLDhDQUFpRTs7Ozs7SUFDakUsdURBQTRDOzs7OztJQUcxQyw4Q0FBOEI7Ozs7O0lBQzlCLDRDQUEwQjs7Ozs7SUFDMUIsNENBQTJCOzs7OztJQUUzQixvREFBMEM7Ozs7O0lBQzFDLDRDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgQ29tcG9uZW50LFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0b3IsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgRWxlbWVudFJlZixcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgSW5qZWN0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSwgcG9zaXRpb25FbGVtZW50cyB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLXRvb2x0aXAtd2luZG93JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1jb250ZW50cz1cImNvbnRlbnRzXCJcbiAgICAgIGxldC1wbGFjZW1lbnQ9XCJwbGFjZW1lbnRcIlxuICAgICAgbGV0LWV2ZW50PVwiZXZlbnRcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdG9vbHRpcFwiIFtuZ0NsYXNzXT1cIidjYWwtdG9vbHRpcC0nICsgcGxhY2VtZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdG9vbHRpcC1hcnJvd1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLXRvb2x0aXAtaW5uZXJcIiBbaW5uZXJIdG1sXT1cImNvbnRlbnRzXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGNvbnRlbnRzOiBjb250ZW50cyxcbiAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICAgIGV2ZW50OiBldmVudFxuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50IHtcbiAgQElucHV0KCkgY29udGVudHM6IHN0cmluZztcblxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IHN0cmluZztcblxuICBASW5wdXQoKSBldmVudDogQ2FsZW5kYXJFdmVudDtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pjtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bENhbGVuZGFyVG9vbHRpcF0nXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCdtd2xDYWxlbmRhclRvb2x0aXAnKSBjb250ZW50czogc3RyaW5nOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIEBJbnB1dCgndG9vbHRpcFBsYWNlbWVudCcpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYXV0byc7IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8taW5wdXQtcmVuYW1lXG5cbiAgQElucHV0KCd0b29sdGlwVGVtcGxhdGUnKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcblxuICBASW5wdXQoJ3Rvb2x0aXBFdmVudCcpIGV2ZW50OiBDYWxlbmRhckV2ZW50OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIEBJbnB1dCgndG9vbHRpcEFwcGVuZFRvQm9keScpIGFwcGVuZFRvQm9keTogYm9vbGVhbjsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcblxuICBASW5wdXQoJ3Rvb2x0aXBEZWxheScpIGRlbGF5OiBudW1iZXIgfCBudWxsID0gbnVsbDsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcblxuICBwcml2YXRlIHRvb2x0aXBGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudD47XG4gIHByaXZhdGUgdG9vbHRpcFJlZjogQ29tcG9uZW50UmVmPENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudD47XG4gIHByaXZhdGUgY2FuY2VsVG9vbHRpcERlbGF5JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudCAvL3RzbGludDpkaXNhYmxlLWxpbmVcbiAgKSB7XG4gICAgdGhpcy50b29sdGlwRmFjdG9yeSA9IGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgIENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudFxuICAgICk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50b29sdGlwUmVmICYmXG4gICAgICAoY2hhbmdlcy5jb250ZW50cyB8fCBjaGFuZ2VzLmN1c3RvbVRlbXBsYXRlIHx8IGNoYW5nZXMuZXZlbnQpXG4gICAgKSB7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UuY29udGVudHMgPSB0aGlzLmNvbnRlbnRzO1xuICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLmN1c3RvbVRlbXBsYXRlID0gdGhpcy5jdXN0b21UZW1wbGF0ZTtcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5ldmVudCA9IHRoaXMuZXZlbnQ7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgb25Nb3VzZU92ZXIoKTogdm9pZCB7XG4gICAgY29uc3QgZGVsYXkkOiBPYnNlcnZhYmxlPGFueT4gPVxuICAgICAgdGhpcy5kZWxheSA9PT0gbnVsbCA/IG9mKCdub3cnKSA6IHRpbWVyKHRoaXMuZGVsYXkpO1xuICAgIGRlbGF5JC5waXBlKHRha2VVbnRpbCh0aGlzLmNhbmNlbFRvb2x0aXBEZWxheSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgb25Nb3VzZU91dCgpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudG9vbHRpcFJlZiAmJiB0aGlzLmNvbnRlbnRzKSB7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICB0aGlzLnRvb2x0aXBGYWN0b3J5LFxuICAgICAgICAwLFxuICAgICAgICB0aGlzLmluamVjdG9yLFxuICAgICAgICBbXVxuICAgICAgKTtcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5jb250ZW50cyA9IHRoaXMuY29udGVudHM7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UuY3VzdG9tVGVtcGxhdGUgPSB0aGlzLmN1c3RvbVRlbXBsYXRlO1xuICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLmV2ZW50ID0gdGhpcy5ldmVudDtcbiAgICAgIGlmICh0aGlzLmFwcGVuZFRvQm9keSkge1xuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5wb3NpdGlvblRvb2x0aXAoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sdGlwUmVmKSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYucmVtb3ZlKFxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuaW5kZXhPZih0aGlzLnRvb2x0aXBSZWYuaG9zdFZpZXcpXG4gICAgICApO1xuICAgICAgdGhpcy50b29sdGlwUmVmID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5jYW5jZWxUb29sdGlwRGVsYXkkLm5leHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcG9zaXRpb25Ub29sdGlwKHByZXZpb3VzUG9zaXRpb25zOiBzdHJpbmdbXSA9IFtdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9vbHRpcFJlZikge1xuICAgICAgdGhpcy50b29sdGlwUmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5wbGFjZW1lbnQgPSBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgdGhpcy50b29sdGlwUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sXG4gICAgICAgIHRoaXMucGxhY2VtZW50LFxuICAgICAgICB0aGlzLmFwcGVuZFRvQm9keVxuICAgICAgKTtcbiAgICAgIC8vIGtlZXAgcmUtcG9zaXRpb25pbmcgdGhlIHRvb2x0aXAgdW50aWwgdGhlIGFycm93IHBvc2l0aW9uIGRvZXNuJ3QgbWFrZSBhIGRpZmZlcmVuY2VcbiAgICAgIGlmIChcbiAgICAgICAgcHJldmlvdXNQb3NpdGlvbnMuaW5kZXhPZih0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UucGxhY2VtZW50KSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICB0aGlzLnBvc2l0aW9uVG9vbHRpcChbXG4gICAgICAgICAgLi4ucHJldmlvdXNQb3NpdGlvbnMsXG4gICAgICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLnBsYWNlbWVudFxuICAgICAgICBdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==