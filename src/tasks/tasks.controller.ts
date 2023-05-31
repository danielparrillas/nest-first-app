import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAll();
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDTO) {
    return this.taskService.create({
      title: newTask.title,
      description: newTask.description,
    });
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.taskService.deleteTask(id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() fields: UpdateTaskDTO) {
    return this.taskService.update(id, fields);
  }
}
