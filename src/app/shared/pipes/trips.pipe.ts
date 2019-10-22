import { Pipe, PipeTransform } from '@angular/core';
import {Trip} from '../../trip.model'

@Pipe({
    name: 'TripFilter',
    pure: false
})

export class TripFilter implements PipeTransform {
    transform(items: Trip[], id: string): any[] {
        return items.filter(item => item.travelItinerary === id);
    }
}