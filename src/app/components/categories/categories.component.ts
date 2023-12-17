import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoriesArray: any = [];
  categoryModelObj: any = {};

  showAdd!: boolean;
  showEdit!: boolean;

  formValue!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder, 
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.formValue = this._formBuilder.group({
      name: ['', Validators.required]
    });

    this.getCategories();
  }

  add() {
    this.showAdd = true;
    this.showEdit = false;
  }

  edit(category: any) {
    this.showAdd = false;
    this.showEdit = true;

    this.categoryModelObj.id = category.id;

    this.formValue.controls['name'].setValue(category.name);
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(response => { 
        this.categoriesArray = response; 
      }, error => { 
        console.log(error.message); 
      });
  }

  addCategory() {
    if (this.formValue.value.name.trim() === '') {
      return;
    }

    const newCategory = { name: this.formValue.value.name }
    
    this.categoryService.addCategory(newCategory)
      .subscribe(response => { 
        this.getCategories(); 
        alert("Successfull added!");
        this.formValue.reset();
      }, error => { 
        alert(error.message); 
      });
  }

  updateCategory() {
    this.categoryModelObj.name = this.formValue.value.name;

    if (this.categoryModelObj.name.trim() === '') 
      return;

    this.categoryService.updateCategory(this.categoryModelObj)
      .subscribe(response => {
        this.formValue.reset();

        this.getCategories();
        alert("Category successfull updated");
      });
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category')) {
    this.categoryService.deleteCategory(id)
      .subscribe(response => {
        this.getCategories();
        alert("Category successfull deleted.");
      }, error => {
        alert('Cannot delete category, because of the following reason: ' + error.message)
        console.log(error.message);
      });
    }
  }

}
