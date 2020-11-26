import { Component, OnInit, Inject } from '@angular/core';
import { Category } from 'src/app/models/category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss']
})
export class EditCategoryModalComponent implements OnInit {

  categoryEditModel = new Category('', '', [null]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryEditModel = this.data.category;
  }

  editCategory() {
    this.categoryService.updateCategory(this.categoryEditModel).subscribe();
  }

}
