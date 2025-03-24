import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoStatus } from './entities/todo.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(userId: string, createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create({
      id: uuidv4(),
      userId,
      ...createTodoDto,
      status: TodoStatus.ENABLED,
    });
    return this.todoRepository.save(todo);
  }

  async findAll(userId: string): Promise<Todo[]> {
    return this.todoRepository.find({
      where: {
        userId,
        status: TodoStatus.ENABLED,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(userId: string, id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
        userId,
        status: TodoStatus.ENABLED,
      },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return todo;
  }

  async update(userId: string, id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(userId, id);
    
    const updatedTodo = this.todoRepository.merge(todo, updateTodoDto);
    return this.todoRepository.save(updatedTodo);
  }

  async remove(userId: string, id: string): Promise<void> {
    const todo = await this.findOne(userId, id);
    
    todo.status = TodoStatus.DELETED;
    await this.todoRepository.save(todo);
  }
}