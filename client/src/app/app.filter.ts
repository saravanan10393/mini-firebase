import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'values'
})
export class ValuesPipe implements PipeTransform {

    transform(src: Object, args) {
        let values = []
        if(!src)
            return values;
        for(let key in src){
            values.push(src[key].name);
        }
        return values;
    }

}