import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'budgetListPipe'
})
export class BudgetListPipePipe implements PipeTransform {

  transform(items: any[], searchedCategory: string = '', searchedName: string = ''): any[] {
    if (!items) return [];
    if (!searchedCategory && !searchedName) return items;

    if (searchedCategory) searchedCategory = searchedCategory.toLowerCase();
    if (searchedName) searchedName = searchedName.toLowerCase();

    return items.filter(item => {
      //console.log(item);
      return (item.typeName.toLowerCase().includes(searchedCategory) && item.name.toLowerCase().includes(searchedName));
    })
  }

}
