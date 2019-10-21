/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { validateEvents as validateEventsWithoutLog } from 'calendar-utils';
/** @type {?} */
export var validateEvents = (/**
 * @param {?} events
 * @return {?}
 */
function (events) {
    /** @type {?} */
    var warn = (/**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return console.warn.apply(console, tslib_1.__spread(['angular-calendar'], args));
    });
    return validateEventsWithoutLog(events, warn);
});
/**
 * @param {?} outer
 * @param {?} inner
 * @return {?}
 */
export function isInside(outer, inner) {
    return (Math.floor(outer.left) <= Math.ceil(inner.left) &&
        Math.floor(inner.left) <= Math.ceil(outer.right) &&
        Math.floor(outer.left) <= Math.ceil(inner.right) &&
        Math.floor(inner.right) <= Math.ceil(outer.right) &&
        Math.floor(outer.top) <= Math.ceil(inner.top) &&
        Math.floor(inner.top) <= Math.ceil(outer.bottom) &&
        Math.floor(outer.top) <= Math.ceil(inner.bottom) &&
        Math.floor(inner.bottom) <= Math.ceil(outer.bottom));
}
/**
 * @param {?} amount
 * @param {?} precision
 * @return {?}
 */
export function roundToNearest(amount, precision) {
    return Math.round(amount / precision) * precision;
}
/** @type {?} */
export var trackByEventId = (/**
 * @param {?} index
 * @param {?} event
 * @return {?}
 */
function (index, event) {
    return event.id ? event.id : event;
});
/** @type {?} */
export var trackByWeekDayHeaderDate = (/**
 * @param {?} index
 * @param {?} day
 * @return {?}
 */
function (index, day) {
    return day.date.toISOString();
});
/** @type {?} */
export var trackByHourSegment = (/**
 * @param {?} index
 * @param {?} segment
 * @return {?}
 */
function (index, segment) { return segment.date.toISOString(); });
/** @type {?} */
export var trackByHour = (/**
 * @param {?} index
 * @param {?} hour
 * @return {?}
 */
function (index, hour) {
    return hour.segments[0].date.toISOString();
});
/** @type {?} */
export var trackByDayOrWeekEvent = (/**
 * @param {?} index
 * @param {?} weekEvent
 * @return {?}
 */
function (index, weekEvent) { return (weekEvent.event.id ? weekEvent.event.id : weekEvent.event); });
/** @type {?} */
var MINUTES_IN_HOUR = 60;
/**
 * @param {?} movedY
 * @param {?} hourSegments
 * @param {?} hourSegmentHeight
 * @param {?} eventSnapSize
 * @return {?}
 */
export function getMinutesMoved(movedY, hourSegments, hourSegmentHeight, eventSnapSize) {
    /** @type {?} */
    var draggedInPixelsSnapSize = roundToNearest(movedY, eventSnapSize || hourSegmentHeight);
    /** @type {?} */
    var pixelAmountInMinutes = MINUTES_IN_HOUR / (hourSegments * hourSegmentHeight);
    return draggedInPixelsSnapSize * pixelAmountInMinutes;
}
/**
 * @param {?} hourSegments
 * @param {?} hourSegmentHeight
 * @return {?}
 */
export function getMinimumEventHeightInMinutes(hourSegments, hourSegmentHeight) {
    return ((MINUTES_IN_HOUR / (hourSegments * hourSegmentHeight)) * hourSegmentHeight);
}
/**
 * @param {?} dateAdapter
 * @param {?} event
 * @param {?} minimumMinutes
 * @return {?}
 */
export function getDefaultEventEnd(dateAdapter, event, minimumMinutes) {
    if (event.end) {
        return event.end;
    }
    else {
        return dateAdapter.addMinutes(event.start, minimumMinutes);
    }
}
/**
 * @param {?} dateAdapter
 * @param {?} date
 * @param {?} days
 * @param {?} excluded
 * @return {?}
 */
export function addDaysWithExclusions(dateAdapter, date, days, excluded) {
    /** @type {?} */
    var daysCounter = 0;
    /** @type {?} */
    var daysToAdd = 0;
    /** @type {?} */
    var changeDays = days < 0 ? dateAdapter.subDays : dateAdapter.addDays;
    /** @type {?} */
    var result = date;
    while (daysToAdd <= Math.abs(days)) {
        result = changeDays(date, daysCounter);
        /** @type {?} */
        var day = dateAdapter.getDay(result);
        if (excluded.indexOf(day) === -1) {
            daysToAdd++;
        }
        daysCounter++;
    }
    return result;
}
/**
 * @param {?} newStart
 * @param {?} newEnd
 * @param {?} period
 * @return {?}
 */
export function isDraggedWithinPeriod(newStart, newEnd, period) {
    /** @type {?} */
    var end = newEnd || newStart;
    return ((period.start <= newStart && newStart <= period.end) ||
        (period.start <= end && end <= period.end));
}
/**
 * @param {?} dropEvent
 * @param {?} date
 * @param {?} allDay
 * @param {?} calendarId
 * @return {?}
 */
export function shouldFireDroppedEvent(dropEvent, date, allDay, calendarId) {
    return (dropEvent.dropData &&
        dropEvent.dropData.event &&
        (dropEvent.dropData.calendarId !== calendarId ||
            (dropEvent.dropData.event.allDay && !allDay) ||
            (!dropEvent.dropData.event.allDay && allDay)));
}
/**
 * @param {?} dateAdapter
 * @param {?} viewDate
 * @param {?} weekStartsOn
 * @param {?=} excluded
 * @param {?=} daysInWeek
 * @return {?}
 */
export function getWeekViewPeriod(dateAdapter, viewDate, weekStartsOn, excluded, daysInWeek) {
    if (excluded === void 0) { excluded = []; }
    /** @type {?} */
    var viewStart = daysInWeek
        ? dateAdapter.startOfDay(viewDate)
        : dateAdapter.startOfWeek(viewDate, { weekStartsOn: weekStartsOn });
    /** @type {?} */
    var endOfWeek = dateAdapter.endOfWeek(viewDate, { weekStartsOn: weekStartsOn });
    while (excluded.indexOf(dateAdapter.getDay(viewStart)) > -1 &&
        viewStart < endOfWeek) {
        viewStart = dateAdapter.addDays(viewStart, 1);
    }
    if (daysInWeek) {
        /** @type {?} */
        var viewEnd = dateAdapter.endOfDay(addDaysWithExclusions(dateAdapter, viewStart, daysInWeek - 1, excluded));
        return { viewStart: viewStart, viewEnd: viewEnd };
    }
    else {
        /** @type {?} */
        var viewEnd = endOfWeek;
        while (excluded.indexOf(dateAdapter.getDay(viewEnd)) > -1 &&
            viewEnd > viewStart) {
            viewEnd = dateAdapter.subDays(viewEnd, 1);
        }
        return { viewStart: viewStart, viewEnd: viewEnd };
    }
}
/**
 * @param {?} __0
 * @return {?}
 */
export function isWithinThreshold(_a) {
    var x = _a.x, y = _a.y;
    /** @type {?} */
    var DRAG_THRESHOLD = 1;
    return Math.abs(x) > DRAG_THRESHOLD || Math.abs(y) > DRAG_THRESHOLD;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUtMLGNBQWMsSUFBSSx3QkFBd0IsRUFJM0MsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHeEIsTUFBTSxLQUFPLGNBQWM7Ozs7QUFBRyxVQUFDLE1BQXVCOztRQUM5QyxJQUFJOzs7O0lBQUc7UUFBQyxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOztRQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksT0FBWixPQUFPLG9CQUFNLGtCQUFrQixHQUFLLElBQUk7SUFBeEMsQ0FBeUMsQ0FBQTtJQUNuRSxPQUFPLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUE7Ozs7OztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsS0FBaUIsRUFBRSxLQUFpQjtJQUMzRCxPQUFPLENBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdB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Q0QsT0FBTyxHQUFHLFNBQVM7UUFDdkIsT0FDRSxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEQsT0FBTyxHQUFHLFNBQVMsRUFDbkI7WUFDQSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0M7UUFDRCxPQUFPLEVBQUUsU0FBUyxXQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQztLQUMvQjtBQUNILENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEVBQWtDO1FBQWhDLFFBQUMsRUFBRSxRQUFDOztRQUNoQyxjQUFjLEdBQUcsQ0FBQztJQUN4QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDO0FBQ3RFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICBEYXlWaWV3RXZlbnQsXG4gIERheVZpZXdIb3VyLFxuICBEYXlWaWV3SG91clNlZ21lbnQsXG4gIHZhbGlkYXRlRXZlbnRzIGFzIHZhbGlkYXRlRXZlbnRzV2l0aG91dExvZyxcbiAgVmlld1BlcmlvZCxcbiAgV2Vla0RheSxcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudFxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRXZlbnRzID0gKGV2ZW50czogQ2FsZW5kYXJFdmVudFtdKSA9PiB7XG4gIGNvbnN0IHdhcm4gPSAoLi4uYXJncykgPT4gY29uc29sZS53YXJuKCdhbmd1bGFyLWNhbGVuZGFyJywgLi4uYXJncyk7XG4gIHJldHVybiB2YWxpZGF0ZUV2ZW50c1dpdGhvdXRMb2coZXZlbnRzLCB3YXJuKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0luc2lkZShvdXRlcjogQ2xpZW50UmVjdCwgaW5uZXI6IENsaWVudFJlY3QpOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBNYXRoLmZsb29yKG91dGVyLmxlZnQpIDw9IE1hdGguY2VpbChpbm5lci5sZWZ0KSAmJlxuICAgIE1hdGguZmxvb3IoaW5uZXIubGVmdCkgPD0gTWF0aC5jZWlsKG91dGVyLnJpZ2h0KSAmJlxuICAgIE1hdGguZmxvb3Iob3V0ZXIubGVmdCkgPD0gTWF0aC5jZWlsKGlubmVyLnJpZ2h0KSAmJlxuICAgIE1hdGguZmxvb3IoaW5uZXIucmlnaHQpIDw9IE1hdGguY2VpbChvdXRlci5yaWdodCkgJiZcbiAgICBNYXRoLmZsb29yKG91dGVyLnRvcCkgPD0gTWF0aC5jZWlsKGlubmVyLnRvcCkgJiZcbiAgICBNYXRoLmZsb29yKGlubmVyLnRvcCkgPD0gTWF0aC5jZWlsKG91dGVyLmJvdHRvbSkgJiZcbiAgICBNYXRoLmZsb29yKG91dGVyLnRvcCkgPD0gTWF0aC5jZWlsKGlubmVyLmJvdHRvbSkgJiZcbiAgICBNYXRoLmZsb29yKGlubmVyLmJvdHRvbSkgPD0gTWF0aC5jZWlsKG91dGVyLmJvdHRvbSlcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kVG9OZWFyZXN0KGFtb3VudDogbnVtYmVyLCBwcmVjaXNpb246IG51bWJlcikge1xuICByZXR1cm4gTWF0aC5yb3VuZChhbW91bnQgLyBwcmVjaXNpb24pICogcHJlY2lzaW9uO1xufVxuXG5leHBvcnQgY29uc3QgdHJhY2tCeUV2ZW50SWQgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IENhbGVuZGFyRXZlbnQpID0+XG4gIGV2ZW50LmlkID8gZXZlbnQuaWQgOiBldmVudDtcblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSA9IChpbmRleDogbnVtYmVyLCBkYXk6IFdlZWtEYXkpID0+XG4gIGRheS5kYXRlLnRvSVNPU3RyaW5nKCk7XG5cbmV4cG9ydCBjb25zdCB0cmFja0J5SG91clNlZ21lbnQgPSAoXG4gIGluZGV4OiBudW1iZXIsXG4gIHNlZ21lbnQ6IERheVZpZXdIb3VyU2VnbWVudFxuKSA9PiBzZWdtZW50LmRhdGUudG9JU09TdHJpbmcoKTtcblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlIb3VyID0gKGluZGV4OiBudW1iZXIsIGhvdXI6IERheVZpZXdIb3VyKSA9PlxuICBob3VyLnNlZ21lbnRzWzBdLmRhdGUudG9JU09TdHJpbmcoKTtcblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlEYXlPcldlZWtFdmVudCA9IChcbiAgaW5kZXg6IG51bWJlcixcbiAgd2Vla0V2ZW50OiBXZWVrVmlld0FsbERheUV2ZW50IHwgRGF5Vmlld0V2ZW50XG4pID0+ICh3ZWVrRXZlbnQuZXZlbnQuaWQgPyB3ZWVrRXZlbnQuZXZlbnQuaWQgOiB3ZWVrRXZlbnQuZXZlbnQpO1xuXG5jb25zdCBNSU5VVEVTX0lOX0hPVVIgPSA2MDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pbnV0ZXNNb3ZlZChcbiAgbW92ZWRZOiBudW1iZXIsXG4gIGhvdXJTZWdtZW50czogbnVtYmVyLFxuICBob3VyU2VnbWVudEhlaWdodDogbnVtYmVyLFxuICBldmVudFNuYXBTaXplOiBudW1iZXJcbik6IG51bWJlciB7XG4gIGNvbnN0IGRyYWdnZWRJblBpeGVsc1NuYXBTaXplID0gcm91bmRUb05lYXJlc3QoXG4gICAgbW92ZWRZLFxuICAgIGV2ZW50U25hcFNpemUgfHwgaG91clNlZ21lbnRIZWlnaHRcbiAgKTtcbiAgY29uc3QgcGl4ZWxBbW91bnRJbk1pbnV0ZXMgPVxuICAgIE1JTlVURVNfSU5fSE9VUiAvIChob3VyU2VnbWVudHMgKiBob3VyU2VnbWVudEhlaWdodCk7XG4gIHJldHVybiBkcmFnZ2VkSW5QaXhlbHNTbmFwU2l6ZSAqIHBpeGVsQW1vdW50SW5NaW51dGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWluaW11bUV2ZW50SGVpZ2h0SW5NaW51dGVzKFxuICBob3VyU2VnbWVudHM6IG51bWJlcixcbiAgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlclxuKSB7XG4gIHJldHVybiAoXG4gICAgKE1JTlVURVNfSU5fSE9VUiAvIChob3VyU2VnbWVudHMgKiBob3VyU2VnbWVudEhlaWdodCkpICogaG91clNlZ21lbnRIZWlnaHRcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRFdmVudEVuZChcbiAgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyLFxuICBldmVudDogQ2FsZW5kYXJFdmVudCxcbiAgbWluaW11bU1pbnV0ZXM6IG51bWJlclxuKTogRGF0ZSB7XG4gIGlmIChldmVudC5lbmQpIHtcbiAgICByZXR1cm4gZXZlbnQuZW5kO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBkYXRlQWRhcHRlci5hZGRNaW51dGVzKGV2ZW50LnN0YXJ0LCBtaW5pbXVtTWludXRlcyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcbiAgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyLFxuICBkYXRlOiBEYXRlLFxuICBkYXlzOiBudW1iZXIsXG4gIGV4Y2x1ZGVkOiBudW1iZXJbXVxuKTogRGF0ZSB7XG4gIGxldCBkYXlzQ291bnRlciA9IDA7XG4gIGxldCBkYXlzVG9BZGQgPSAwO1xuICBjb25zdCBjaGFuZ2VEYXlzID0gZGF5cyA8IDAgPyBkYXRlQWRhcHRlci5zdWJEYXlzIDogZGF0ZUFkYXB0ZXIuYWRkRGF5cztcbiAgbGV0IHJlc3VsdCA9IGRhdGU7XG4gIHdoaWxlIChkYXlzVG9BZGQgPD0gTWF0aC5hYnMoZGF5cykpIHtcbiAgICByZXN1bHQgPSBjaGFuZ2VEYXlzKGRhdGUsIGRheXNDb3VudGVyKTtcbiAgICBjb25zdCBkYXkgPSBkYXRlQWRhcHRlci5nZXREYXkocmVzdWx0KTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihkYXkpID09PSAtMSkge1xuICAgICAgZGF5c1RvQWRkKys7XG4gICAgfVxuICAgIGRheXNDb3VudGVyKys7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRHJhZ2dlZFdpdGhpblBlcmlvZChcbiAgbmV3U3RhcnQ6IERhdGUsXG4gIG5ld0VuZDogRGF0ZSxcbiAgcGVyaW9kOiBWaWV3UGVyaW9kXG4pOiBib29sZWFuIHtcbiAgY29uc3QgZW5kID0gbmV3RW5kIHx8IG5ld1N0YXJ0O1xuICByZXR1cm4gKFxuICAgIChwZXJpb2Quc3RhcnQgPD0gbmV3U3RhcnQgJiYgbmV3U3RhcnQgPD0gcGVyaW9kLmVuZCkgfHxcbiAgICAocGVyaW9kLnN0YXJ0IDw9IGVuZCAmJiBlbmQgPD0gcGVyaW9kLmVuZClcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZEZpcmVEcm9wcGVkRXZlbnQoXG4gIGRyb3BFdmVudDogeyBkcm9wRGF0YT86IHsgZXZlbnQ/OiBDYWxlbmRhckV2ZW50OyBjYWxlbmRhcklkPzogc3ltYm9sIH0gfSxcbiAgZGF0ZTogRGF0ZSxcbiAgYWxsRGF5OiBib29sZWFuLFxuICBjYWxlbmRhcklkOiBzeW1ib2xcbikge1xuICByZXR1cm4gKFxuICAgIGRyb3BFdmVudC5kcm9wRGF0YSAmJlxuICAgIGRyb3BFdmVudC5kcm9wRGF0YS5ldmVudCAmJlxuICAgIChkcm9wRXZlbnQuZHJvcERhdGEuY2FsZW5kYXJJZCAhPT0gY2FsZW5kYXJJZCB8fFxuICAgICAgKGRyb3BFdmVudC5kcm9wRGF0YS5ldmVudC5hbGxEYXkgJiYgIWFsbERheSkgfHxcbiAgICAgICghZHJvcEV2ZW50LmRyb3BEYXRhLmV2ZW50LmFsbERheSAmJiBhbGxEYXkpKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla1ZpZXdQZXJpb2QoXG4gIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcixcbiAgdmlld0RhdGU6IERhdGUsXG4gIHdlZWtTdGFydHNPbjogbnVtYmVyLFxuICBleGNsdWRlZDogbnVtYmVyW10gPSBbXSxcbiAgZGF5c0luV2Vlaz86IG51bWJlclxuKTogeyB2aWV3U3RhcnQ6IERhdGU7IHZpZXdFbmQ6IERhdGUgfSB7XG4gIGxldCB2aWV3U3RhcnQgPSBkYXlzSW5XZWVrXG4gICAgPyBkYXRlQWRhcHRlci5zdGFydE9mRGF5KHZpZXdEYXRlKVxuICAgIDogZGF0ZUFkYXB0ZXIuc3RhcnRPZldlZWsodmlld0RhdGUsIHsgd2Vla1N0YXJ0c09uIH0pO1xuICBjb25zdCBlbmRPZldlZWsgPSBkYXRlQWRhcHRlci5lbmRPZldlZWsodmlld0RhdGUsIHsgd2Vla1N0YXJ0c09uIH0pO1xuICB3aGlsZSAoXG4gICAgZXhjbHVkZWQuaW5kZXhPZihkYXRlQWRhcHRlci5nZXREYXkodmlld1N0YXJ0KSkgPiAtMSAmJlxuICAgIHZpZXdTdGFydCA8IGVuZE9mV2Vla1xuICApIHtcbiAgICB2aWV3U3RhcnQgPSBkYXRlQWRhcHRlci5hZGREYXlzKHZpZXdTdGFydCwgMSk7XG4gIH1cbiAgaWYgKGRheXNJbldlZWspIHtcbiAgICBjb25zdCB2aWV3RW5kID0gZGF0ZUFkYXB0ZXIuZW5kT2ZEYXkoXG4gICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoZGF0ZUFkYXB0ZXIsIHZpZXdTdGFydCwgZGF5c0luV2VlayAtIDEsIGV4Y2x1ZGVkKVxuICAgICk7XG4gICAgcmV0dXJuIHsgdmlld1N0YXJ0LCB2aWV3RW5kIH07XG4gIH0gZWxzZSB7XG4gICAgbGV0IHZpZXdFbmQgPSBlbmRPZldlZWs7XG4gICAgd2hpbGUgKFxuICAgICAgZXhjbHVkZWQuaW5kZXhPZihkYXRlQWRhcHRlci5nZXREYXkodmlld0VuZCkpID4gLTEgJiZcbiAgICAgIHZpZXdFbmQgPiB2aWV3U3RhcnRcbiAgICApIHtcbiAgICAgIHZpZXdFbmQgPSBkYXRlQWRhcHRlci5zdWJEYXlzKHZpZXdFbmQsIDEpO1xuICAgIH1cbiAgICByZXR1cm4geyB2aWV3U3RhcnQsIHZpZXdFbmQgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNXaXRoaW5UaHJlc2hvbGQoeyB4LCB5IH06IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSkge1xuICBjb25zdCBEUkFHX1RIUkVTSE9MRCA9IDE7XG4gIHJldHVybiBNYXRoLmFicyh4KSA+IERSQUdfVEhSRVNIT0xEIHx8IE1hdGguYWJzKHkpID4gRFJBR19USFJFU0hPTEQ7XG59XG4iXX0=