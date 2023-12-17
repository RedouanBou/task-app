import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';
import { Board } from 'src/app/models/board';
import { BoardService } from '../board/board.service';
import { CategoryService } from '../category/category.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/tasks';
 
  constructor(
    private http: HttpClient,
    private boardService: BoardService,
    private categoryService: CategoryService
  ) { }

  getTasksByBoardId(boardId: number): Observable<Task[]> {
    const url = `${this.apiUrl}/?boardId=${boardId}`;
    return this.http.get<Task[]>(url);
  }

  getTasksByBoardAndTaskId(boardId: number, taskId: number): Observable<Task> {
    const url = `${this.apiUrl}/${taskId}?boardId=${boardId}`;
    return this.http.get<Task>(url);
  }

  addTask(boardId: number, categoryId: number, task: Task): Observable<Task> {
    task.completed = false;
    
    this.boardService.getBoard(boardId).subscribe(board => {
      task.board = board;
    });

    this.categoryService.getCategory(categoryId).subscribe(category => {
      task.category = category;
    })

    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(taskId: number, categoryId: number, task: Task): Observable<Task> {
    this.categoryService.getCategory(categoryId).subscribe(category => {
      task.category = category;
    });

    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, task);
  }

  deleteTask(taskId: number) {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }

}
