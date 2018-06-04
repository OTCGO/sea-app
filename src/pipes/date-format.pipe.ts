import { Pipe, PipeTransform } from '@angular/core'
// import { DatePipe } from '@angular/common'
import moment from 'moment'

@Pipe({
    name: 'dateFormatPipe',
})
export class DateFormatPipe implements PipeTransform {
    transform(value: any) {

        // const datePipe = new DatePipe('en-US')
        // value = datePipe.transform(value, 'yy')1528073743
        // const time = moment(value).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss')
        const time = moment(value * 1000).format('YYYY-MM-DD HH:mm:ss')
        console.log('DateFormatPipe', time)

        return time
    }
}


