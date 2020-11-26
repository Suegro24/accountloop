import { Pipe, PipeTransform } from '@angular/core';
import { Category } from 'src/app/models/category';

@Pipe({
  name: 'budgetListPipe'
})
export class BudgetListPipePipe implements PipeTransform {

  transform(items: any[], searchedCategory: Category[], searchedName: string = ''): any[] {
    if (!items) return [];
    if (!searchedName) {
      if (searchedCategory == null) return items;
      if (searchedCategory.length == 0) return items;
    }


    if (searchedName) searchedName = searchedName.toLowerCase();

    let result = [];

    items.filter(item => {
      //console.log(item);
      if (searchedCategory != null) {
        if (searchedCategory.length == 0) {
          if (item.name.toLowerCase().includes(searchedName)) {
            result.push(item);
          }
        }
        else {
          searchedCategory.map(category => {
            if (searchedName.trim()!='') {
              if (category.name == item.category.name && item.name.toLowerCase().includes(searchedName)) {
                result.push(item);
              }
            }
            else {
              if (category.name == item.category.name ) {
                result.push(item);
              }
            }
          })
        }
      }
      else {
          if (item.name.toLowerCase().includes(searchedName)) {
            result.push(item);
          }
      }
      
    })

    result = [...new Set(result)];

    return result;
  }

}
