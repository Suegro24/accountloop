import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyTransferPipe'
})
export class MoneyTransferPipePipe implements PipeTransform {

  transform(items: any[], searchedText, type): any[] {
    if (!items) return [];
    if (!searchedText) return items;

    searchedText = searchedText.toLowerCase();

    if (type == 'users') {
      return items.filter(item => {
        let fullname = item.name.toLowerCase() + ' ' + item.surname.toLowerCase();
        return fullname.includes(searchedText);
      })
    }
    else {
      return items.filter(item => {
        return item.name.toLowerCase().includes(searchedText);
      })
    }


  }

}
