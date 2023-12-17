import { Board } from './board';
import { Category } from './category';

export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    board: Board;
    category: Category;
}
