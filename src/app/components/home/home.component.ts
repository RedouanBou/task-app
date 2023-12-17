import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from 'src/app/services/board/board.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  boardsArray: any[] = [];
  newTitle: string = '';

  boardModelObj: any = {};

  showAdd!: boolean;
  showEdit!: boolean;

  formValue!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder, 
    private boardService: BoardService
  ) {}

  ngOnInit(): void { 
    this.formValue = this._formBuilder.group({
      title: ['', Validators.required]
    });

    this.getBoards();
  }

  getBoards() {
    this.boardService.getBoards()
      .subscribe(response => { 
        this.boardsArray = response; 
        console.log(response); 
      }, error => { 
        console.log(error.message); 
      });
  }

  add() {
    this.showAdd = true;
    this.showEdit = false;
  }

  edit(board: any) {
    console.log(board);

    this.showAdd = false;
    this.showEdit = true;

    this.boardModelObj.id = board.id;

    this.formValue.controls['title'].setValue(board.title);
  }

  addBoard() {
    this.newTitle = this.formValue.value.title;

    if (this.newTitle.trim() === '') 
      return;
    
    const newBoard = { title: this.newTitle }

    this.boardService.addBoard(newBoard)
      .subscribe(response => { 
        this.getBoards(); 
        alert("Successfull added!");
        this.newTitle = '';
        this.formValue.reset();
      }, error => { 
        alert(error.message); 
      });
  }

  updateBoard() {
    this.boardModelObj.title = this.formValue.value.title;

    if (this.boardModelObj.title.trim() === '') 
      return;

    this.boardService.updateBoard(this.boardModelObj)
      .subscribe(response => {
        this.formValue.reset();

        this.getBoards();
        alert("Board successfull updated");
      })
  }

  deleteBoard(id: number) {
    if (confirm('Are you sure you want to delete this board')) {
      this.boardService.deleteBoard(id)
        .subscribe(res => {
          this.getBoards();
          alert("Board succesvol verwijderd.");
        }, error => {
          alert(error.message);
        });
    }
  }
}
