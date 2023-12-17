import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Board } from 'src/app/models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private apiUrl = 'http://localhost:3000/boards';

  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> { 
    return this.http.get<Board[]>(this.apiUrl);
  }

  getBoard(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/${id}`);
  }

  addBoard(board: any): Observable<Board> {
    return this.http.post<Board>(this.apiUrl, board);
  }

  updateBoard(board: any): Observable<Board> {
    return this.http.put<Board>(`${this.apiUrl}/${board.id}`, board);
  }

  deleteBoard(id: number) {
    return this.http.delete<Board>(`${this.apiUrl}/${id}`)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
