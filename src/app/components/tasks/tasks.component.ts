import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  boardId: number;

  tasksArray: any[] = [];
  categoriesArray: any[] = [];
  taskModelObj: any = {};

  showAdd!: boolean;
  showEdit!: boolean;

  formValue!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder, 
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.formValue = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('boardId');

      if (id !== null && id !== undefined) {
        this.boardId = +id;
      }
    });

    this.getTasks(this.boardId);
    this.getCategories();
  }

  getTasks(boardId: number) {
    this.taskService.getTasksByBoardId(boardId)
      .subscribe(response => { 
        this.tasksArray = response; 
        console.log(response); 
      }, error => { 
        console.log(error.message); 
      });
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(response => {
        this.categoriesArray = response;
      }, error => {
        alert(error.message);
      });
  }

  add() {
    this.showAdd = true;
    this.showEdit = false;
  }

  edit(task: any) {
    this.showAdd = false;
    this.showEdit = true;

    this.taskModelObj.id = task.id;

    this.formValue.controls['title'].setValue(task.title);
    this.formValue.controls['description'].setValue(task.description);
    this.formValue.controls['category'].setValue(task.category.id);
  }

  addTask() {
    this.taskModelObj = {
      title: this.formValue.value.title,
      description: this.formValue.value.description
    }

    const catId = this.formValue.value.category;

    this.taskService.addTask(this.boardId, catId, this.taskModelObj)
      .subscribe(response => {
        alert("Successfully added");
        this.getTasks(this.boardId);
      }, error => {
        alert(error.message);
      });
  }

  updateTask() {
    this.taskModelObj = {
      title: this.formValue.value.title,
      description: this.formValue.value.description
    }

    const catId = this.formValue.value.category;

    this.taskService.updateTask(this.boardId, catId, this.taskModelObj)
      .subscribe(response => {
        alert("Successfully added");
        this.getTasks(this.boardId);
      }, error => {
        alert(error.message);
      });
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task')) {
      this.taskService.deleteTask(id)
        .subscribe(res => {
          this.getTasks(this.boardId);
          alert("Task succesvol verwijderd.");
        }, error => {
          alert(error.message);
        });
    }
  }

}
