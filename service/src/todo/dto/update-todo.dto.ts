import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { TodoStatus } from '../entities/todo.entity';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    description: '待办事项状态',
    enum: TodoStatus,
    example: TodoStatus.ENABLED,
    required: false,
  })
  status?: TodoStatus;
}