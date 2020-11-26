import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent implements OnInit {

  categoryModel = new Category('', '', [null]);

  constructor(private categoryService: CategoryService, public dialogRef: MatDialogRef<AddCategoryModalComponent>) { }

  ngOnInit(): void {
  }

  addCategory() {
    this.categoryService.addCategory(this.categoryModel).subscribe(res => {
      this.dialogRef.close(true);
    })
  }

}
