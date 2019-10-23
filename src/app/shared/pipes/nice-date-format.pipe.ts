import {Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
    name: 'niceDateFormatPipe',
})
export class niceDateFormatPipe implements PipeTransform {
    transform(value: string) {
       
       var _value = Number(value);
       
       var dif = Math.floor( ( (Date.now() - _value) / 1000 ) / 86400 );
       
       if ( dif < 30 ){
            return convertToNiceDate(value);
       }else{
           var datePipe = new DatePipe("en-US");
           value = datePipe.transform(value, 'MMM-dd-yyyy');
           return value;
       }
    }
}

function convertToNiceDate(time: string) {
    var date = new Date(time),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        daydiff = Math.floor(diff / 86400);

    if (isNaN(daydiff) || daydiff <= -31 || daydiff >= 31)
        return '';

    return daydiff == 0 && (
        diff>0 &&(
            diff < 60 && "Just now" ||
        
        diff < 120 && "1 minute ago" ||
       
        diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
        
        diff < 7200 && "1 hour ago" ||
        diff < 86400 && Math.floor(diff / 3600) + " hours ago"
        )|| diff< 0 &&(
        diff > (-86400) && "in "+ -Math.floor(diff / 3600) + " hours" ||
        diff > (-3600) && "in " + -Math.floor(diff / 60) + " minutes" ||
        diff > (-7200) && "in 1 hour" ||
        diff > (-120) && "in 1 minute" ||
        diff > (-60) && "Just now"
         ))||
         daydiff>0 &&(
            daydiff == 1 && "Yesterday"||
            daydiff < 7 && daydiff + " days ago" ||
            daydiff < 31 && Math.ceil(daydiff / 7) + " week(s) ago"
            
         )
         || daydiff<0 &&(
            daydiff == (-1) && "Tomorrow" ||
            daydiff > (-7) && "in " + -daydiff + " days" ||   
            daydiff > (-31) && "in " + -Math.ceil(daydiff / 7) + " week(s)")
        
        
        
        ;
}