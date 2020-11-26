import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryModalComponent } from 'src/app/components/modals/add-category-modal/add-category-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { EditCategoryModalComponent } from 'src/app/components/modals/edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  categories: any = [];

  constructor(private categoryService: CategoryService, private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    })
  }

  addCategory() {
    const ref = this.dialog.open(AddCategoryModalComponent, {
      width: '400px',
      height: '300px'
    })

    ref.afterClosed().subscribe(res => {
      if (res === true) {
        this.userService.playNotificationsSound();
        this.snackBar.open('Pomyślnie dodano kategorie', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        })
        this.refreshList();
      }
    })
  }

  editCategory(category) {
    let dialogRef = this.dialog.open(EditCategoryModalComponent, {
      width: '400px',
      height: '300px',
      data: {
        category: category
      }
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res === true) {
        this.userService.playNotificationsSound();
        this.snackBar.open('Pomyślnie uaktualniono kategorie', 'OK', {
        duration: 5000,
        horizontalPosition: 'right',
        panelClass: ['snackbar-success']
      })
      }
    })
  }

  deleteCategory(category) {
    this.categoryService.deleteCategory(category).subscribe(res => {
      this.userService.playNotificationsSound();
      this.snackBar.open('Pomyślnie usunięto kategorie', 'OK', {
        duration: 5000,
        horizontalPosition: 'right',
        panelClass: ['snackbar-success']
      })
      this.refreshList();
    })
  }

}
