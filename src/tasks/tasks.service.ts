import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDTO, CreateTaskDTO } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'first task',
      description: 'some task',
      status: TaskStatus.PENDING,
    },
  ];
  getAll() {
    return this.tasks;
  }
  create({ title, description }: CreateTaskDTO) {
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.IN_PROGRESS,
    };
    this.tasks.push(task);

    return task;
  }
  update(id: string, fields: UpdateTaskDTO): Task {
    const currentTask = this.getById(id);
    const updatedTask = Object.assign(currentTask, fields);
    this.tasks = this.tasks.map((task) =>
      task.id === id ? updatedTask : currentTask,
    );
    return updatedTask;
  }
  getById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
