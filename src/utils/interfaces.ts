export enum TaskStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Completed = "Completed",
}

export interface ITask {
  id: string;
  title: string;
  status: TaskStatus;
}
