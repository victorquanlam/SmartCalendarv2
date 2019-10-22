/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var LOADERS = {
    'ball-8bits': 16,
    'ball-atom': 4,
    'ball-beat': 3,
    'ball-circus': 5,
    'ball-climbing-dot': 4,
    'ball-clip-rotate': 1,
    'ball-clip-rotate-multiple': 2,
    'ball-clip-rotate-pulse': 2,
    'ball-elastic-dots': 5,
    'ball-fall': 3,
    'ball-fussion': 4,
    'ball-grid-beat': 9,
    'ball-grid-pulse': 9,
    'ball-newton-cradle': 4,
    'ball-pulse': 3,
    'ball-pulse-rise': 5,
    'ball-pulse-sync': 3,
    'ball-rotate': 1,
    'ball-running-dots': 5,
    'ball-scale': 1,
    'ball-scale-multiple': 3,
    'ball-scale-pulse': 2,
    'ball-scale-ripple': 1,
    'ball-scale-ripple-multiple': 3,
    'ball-spin': 8,
    'ball-spin-clockwise': 8,
    'ball-spin-clockwise-fade': 8,
    'ball-spin-clockwise-fade-rotating': 8,
    'ball-spin-fade': 8,
    'ball-spin-fade-rotating': 8,
    'ball-spin-rotate': 2,
    'ball-square-clockwise-spin': 8,
    'ball-square-spin': 8,
    'ball-triangle-path': 3,
    'ball-zig-zag': 2,
    'ball-zig-zag-deflect': 2,
    'cog': 1,
    'cube-transition': 2,
    'fire': 3,
    'line-scale': 5,
    'line-scale-party': 5,
    'line-scale-pulse-out': 5,
    'line-scale-pulse-out-rapid': 5,
    'line-spin-clockwise-fade': 8,
    'line-spin-clockwise-fade-rotating': 8,
    'line-spin-fade': 8,
    'line-spin-fade-rotating': 8,
    'pacman': 6,
    'square-jelly-box': 2,
    'square-loader': 1,
    'square-spin': 1,
    'timer': 1,
    'triangle-skew-spin': 1
};
/** @type {?} */
export var DEFAULTS = {
    BD_COLOR: 'rgba(51,51,51,0.8)',
    SPINNER_COLOR: '#fff',
    SPINNER_TYPE: 'ball-scale-multiple',
};
/** @type {?} */
export var PRIMARY_SPINNER = 'primary';
/**
 * @record
 */
export function Spinner() { }
if (false) {
    /** @type {?|undefined} */
    Spinner.prototype.bdColor;
    /** @type {?|undefined} */
    Spinner.prototype.size;
    /** @type {?|undefined} */
    Spinner.prototype.color;
    /** @type {?|undefined} */
    Spinner.prototype.type;
    /** @type {?|undefined} */
    Spinner.prototype.fullScreen;
}
var NgxSpinner = /** @class */ (function () {
    function NgxSpinner(init) {
        Object.assign(this, init);
    }
    return NgxSpinner;
}());
export { NgxSpinner };
if (false) {
    /** @type {?} */
    NgxSpinner.prototype.name;
    /** @type {?} */
    NgxSpinner.prototype.bdColor;
    /** @type {?} */
    NgxSpinner.prototype.size;
    /** @type {?} */
    NgxSpinner.prototype.color;
    /** @type {?} */
    NgxSpinner.prototype.type;
    /** @type {?} */
    NgxSpinner.prototype.class;
    /** @type {?} */
    NgxSpinner.prototype.divCount;
    /** @type {?} */
    NgxSpinner.prototype.divArray;
    /** @type {?} */
    NgxSpinner.prototype.fullScreen;
    /** @type {?} */
    NgxSpinner.prototype.show;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNwaW5uZXIuZW51bS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zcGlubmVyLyIsInNvdXJjZXMiOlsibGliL25neC1zcGlubmVyLmVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxNQUFNLEtBQU8sT0FBTyxHQUFHO0lBQ3JCLFlBQVksRUFBRSxFQUFFO0lBQ2hCLFdBQVcsRUFBRSxDQUFDO0lBQ2QsV0FBVyxFQUFFLENBQUM7SUFDZCxhQUFhLEVBQUUsQ0FBQztJQUNoQixtQkFBbUIsRUFBRSxDQUFDO0lBQ3RCLGtCQUFrQixFQUFFLENBQUM7SUFDckIsMkJBQTJCLEVBQUUsQ0FBQztJQUM5Qix3QkFBd0IsRUFBRSxDQUFDO0lBQzNCLG1CQUFtQixFQUFFLENBQUM7SUFDdEIsV0FBVyxFQUFFLENBQUM7SUFDZCxjQUFjLEVBQUUsQ0FBQztJQUNqQixnQkFBZ0IsRUFBRSxDQUFDO0lBQ25CLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsb0JBQW9CLEVBQUUsQ0FBQztJQUN2QixZQUFZLEVBQUUsQ0FBQztJQUNmLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQixhQUFhLEVBQUUsQ0FBQztJQUNoQixtQkFBbUIsRUFBRSxDQUFDO0lBQ3RCLFlBQVksRUFBRSxDQUFDO0lBQ2YscUJBQXFCLEVBQUUsQ0FBQztJQUN4QixrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLG1CQUFtQixFQUFFLENBQUM7SUFDdEIsNEJBQTRCLEVBQUUsQ0FBQztJQUMvQixXQUFXLEVBQUUsQ0FBQztJQUNkLHFCQUFxQixFQUFFLENBQUM7SUFDeEIsMEJBQTBCLEVBQUUsQ0FBQztJQUM3QixtQ0FBbUMsRUFBRSxDQUFDO0lBQ3RDLGdCQUFnQixFQUFFLENBQUM7SUFDbkIseUJBQXlCLEVBQUUsQ0FBQztJQUM1QixrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLDRCQUE0QixFQUFFLENBQUM7SUFDL0Isa0JBQWtCLEVBQUUsQ0FBQztJQUNyQixvQkFBb0IsRUFBRSxDQUFDO0lBQ3ZCLGNBQWMsRUFBRSxDQUFDO0lBQ2pCLHNCQUFzQixFQUFFLENBQUM7SUFDekIsS0FBSyxFQUFFLENBQUM7SUFDUixpQkFBaUIsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sRUFBRSxDQUFDO0lBQ1QsWUFBWSxFQUFFLENBQUM7SUFDZixrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLHNCQUFzQixFQUFFLENBQUM7SUFDekIsNEJBQTRCLEVBQUUsQ0FBQztJQUMvQiwwQkFBMEIsRUFBRSxDQUFDO0lBQzdCLG1DQUFtQyxFQUFFLENBQUM7SUFDdEMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuQix5QkFBeUIsRUFBRSxDQUFDO0lBQzVCLFFBQVEsRUFBRSxDQUFDO0lBQ1gsa0JBQWtCLEVBQUUsQ0FBQztJQUNyQixlQUFlLEVBQUUsQ0FBQztJQUNsQixhQUFhLEVBQUUsQ0FBQztJQUNoQixPQUFPLEVBQUUsQ0FBQztJQUNWLG9CQUFvQixFQUFFLENBQUM7Q0FDeEI7O0FBRUQsTUFBTSxLQUFPLFFBQVEsR0FBRztJQUN0QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLGFBQWEsRUFBRSxNQUFNO0lBQ3JCLFlBQVksRUFBRSxxQkFBcUI7Q0FDcEM7O0FBRUQsTUFBTSxLQUFPLGVBQWUsR0FBRyxTQUFTOzs7O0FBSXhDLDZCQU1DOzs7SUFMQywwQkFBaUI7O0lBQ2pCLHVCQUFZOztJQUNaLHdCQUFlOztJQUNmLHVCQUFjOztJQUNkLDZCQUFxQjs7QUFHdkI7SUFZRSxvQkFBWSxJQUEwQjtRQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQzs7OztJQWRDLDBCQUFhOztJQUNiLDZCQUFnQjs7SUFDaEIsMEJBQVc7O0lBQ1gsMkJBQWM7O0lBQ2QsMEJBQWE7O0lBQ2IsMkJBQWM7O0lBQ2QsOEJBQWlCOztJQUNqQiw4QkFBd0I7O0lBQ3hCLGdDQUFvQjs7SUFDcEIsMEJBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgTE9BREVSUyA9IHtcbiAgJ2JhbGwtOGJpdHMnOiAxNixcbiAgJ2JhbGwtYXRvbSc6IDQsXG4gICdiYWxsLWJlYXQnOiAzLFxuICAnYmFsbC1jaXJjdXMnOiA1LFxuICAnYmFsbC1jbGltYmluZy1kb3QnOiA0LFxuICAnYmFsbC1jbGlwLXJvdGF0ZSc6IDEsXG4gICdiYWxsLWNsaXAtcm90YXRlLW11bHRpcGxlJzogMixcbiAgJ2JhbGwtY2xpcC1yb3RhdGUtcHVsc2UnOiAyLFxuICAnYmFsbC1lbGFzdGljLWRvdHMnOiA1LFxuICAnYmFsbC1mYWxsJzogMyxcbiAgJ2JhbGwtZnVzc2lvbic6IDQsXG4gICdiYWxsLWdyaWQtYmVhdCc6IDksXG4gICdiYWxsLWdyaWQtcHVsc2UnOiA5LFxuICAnYmFsbC1uZXd0b24tY3JhZGxlJzogNCxcbiAgJ2JhbGwtcHVsc2UnOiAzLFxuICAnYmFsbC1wdWxzZS1yaXNlJzogNSxcbiAgJ2JhbGwtcHVsc2Utc3luYyc6IDMsXG4gICdiYWxsLXJvdGF0ZSc6IDEsXG4gICdiYWxsLXJ1bm5pbmctZG90cyc6IDUsXG4gICdiYWxsLXNjYWxlJzogMSxcbiAgJ2JhbGwtc2NhbGUtbXVsdGlwbGUnOiAzLFxuICAnYmFsbC1zY2FsZS1wdWxzZSc6IDIsXG4gICdiYWxsLXNjYWxlLXJpcHBsZSc6IDEsXG4gICdiYWxsLXNjYWxlLXJpcHBsZS1tdWx0aXBsZSc6IDMsXG4gICdiYWxsLXNwaW4nOiA4LFxuICAnYmFsbC1zcGluLWNsb2Nrd2lzZSc6IDgsXG4gICdiYWxsLXNwaW4tY2xvY2t3aXNlLWZhZGUnOiA4LFxuICAnYmFsbC1zcGluLWNsb2Nrd2lzZS1mYWRlLXJvdGF0aW5nJzogOCxcbiAgJ2JhbGwtc3Bpbi1mYWRlJzogOCxcbiAgJ2JhbGwtc3Bpbi1mYWRlLXJvdGF0aW5nJzogOCxcbiAgJ2JhbGwtc3Bpbi1yb3RhdGUnOiAyLFxuICAnYmFsbC1zcXVhcmUtY2xvY2t3aXNlLXNwaW4nOiA4LFxuICAnYmFsbC1zcXVhcmUtc3Bpbic6IDgsXG4gICdiYWxsLXRyaWFuZ2xlLXBhdGgnOiAzLFxuICAnYmFsbC16aWctemFnJzogMixcbiAgJ2JhbGwtemlnLXphZy1kZWZsZWN0JzogMixcbiAgJ2NvZyc6IDEsXG4gICdjdWJlLXRyYW5zaXRpb24nOiAyLFxuICAnZmlyZSc6IDMsXG4gICdsaW5lLXNjYWxlJzogNSxcbiAgJ2xpbmUtc2NhbGUtcGFydHknOiA1LFxuICAnbGluZS1zY2FsZS1wdWxzZS1vdXQnOiA1LFxuICAnbGluZS1zY2FsZS1wdWxzZS1vdXQtcmFwaWQnOiA1LFxuICAnbGluZS1zcGluLWNsb2Nrd2lzZS1mYWRlJzogOCxcbiAgJ2xpbmUtc3Bpbi1jbG9ja3dpc2UtZmFkZS1yb3RhdGluZyc6IDgsXG4gICdsaW5lLXNwaW4tZmFkZSc6IDgsXG4gICdsaW5lLXNwaW4tZmFkZS1yb3RhdGluZyc6IDgsXG4gICdwYWNtYW4nOiA2LFxuICAnc3F1YXJlLWplbGx5LWJveCc6IDIsXG4gICdzcXVhcmUtbG9hZGVyJzogMSxcbiAgJ3NxdWFyZS1zcGluJzogMSxcbiAgJ3RpbWVyJzogMSxcbiAgJ3RyaWFuZ2xlLXNrZXctc3Bpbic6IDFcbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUUyA9IHtcbiAgQkRfQ09MT1I6ICdyZ2JhKDUxLDUxLDUxLDAuOCknLFxuICBTUElOTkVSX0NPTE9SOiAnI2ZmZicsXG4gIFNQSU5ORVJfVFlQRTogJ2JhbGwtc2NhbGUtbXVsdGlwbGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IFBSSU1BUllfU1BJTk5FUiA9ICdwcmltYXJ5JztcblxuZXhwb3J0IHR5cGUgU2l6ZSA9ICdkZWZhdWx0JyB8ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3Bpbm5lciB7XG4gIGJkQ29sb3I/OiBzdHJpbmc7XG4gIHNpemU/OiBTaXplO1xuICBjb2xvcj86IHN0cmluZztcbiAgdHlwZT86IHN0cmluZztcbiAgZnVsbFNjcmVlbj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBOZ3hTcGlubmVyIHtcbiAgbmFtZTogc3RyaW5nO1xuICBiZENvbG9yOiBzdHJpbmc7XG4gIHNpemU6IFNpemU7XG4gIGNvbG9yOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgY2xhc3M6IHN0cmluZztcbiAgZGl2Q291bnQ6IG51bWJlcjtcbiAgZGl2QXJyYXk6IEFycmF5PG51bWJlcj47XG4gIGZ1bGxTY3JlZW46IGJvb2xlYW47XG4gIHNob3c6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8Tmd4U3Bpbm5lcj4pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xuICB9XG59XG4iXX0=