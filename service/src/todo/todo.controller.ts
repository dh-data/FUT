import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiParam } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@ApiTags('待办事项')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: '创建待办事项' })
  @ApiResponse({ 
    status: 201, 
    description: '待办事项创建成功',
    type: Todo 
  })
  @ApiHeader({
    name: 'authorization',
    description: 'JWT token',
    required: true,
  })
  create(@Body() createTodoDto: CreateTodoDto, @Headers('authorization') authorization: string) {
    const userId = 'current-user-id'; // 实际项目中应该从 JWT token 中获取
    return this.todoService.create(userId, Object.assign({
      title: '',
      content: '',
      tags: []
    }, createTodoDto));
  }

  @Get()
  @ApiOperation({ summary: '获取所有待办事项' })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取待办事项列表',
    type: [Todo] 
  })
  @ApiHeader({
    name: 'authorization',
    description: 'JWT token',
    required: true,
  })
  findAll(@Headers('authorization') authorization: string) {
    const userId = 'current-user-id';
    return this.todoService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定待办事项' })
  @ApiParam({ 
    name: 'id', 
    description: '待办事项ID' 
  })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取待办事项',
    type: Todo 
  })
  @ApiResponse({ 
    status: 404, 
    description: '待办事项不存在' 
  })
  @ApiHeader({
    name: 'authorization',
    description: 'JWT token',
    required: true,
  })
  findOne(@Param('id') id: string, @Headers('authorization') authorization: string) {
    const userId = 'current-user-id';
    return this.todoService.findOne(userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新待办事项' })
  @ApiParam({ 
    name: 'id', 
    description: '待办事项ID' 
  })
  @ApiResponse({ 
    status: 200, 
    description: '待办事项更新成功',
    type: Todo 
  })
  @ApiResponse({ 
    status: 404, 
    description: '待办事项不存在' 
  })
  @ApiHeader({
    name: 'authorization',
    description: 'JWT token',
    required: true,
  })
  update(
    @Param('id') id: string, 
    @Body() updateTodoDto: UpdateTodoDto,
    @Headers('authorization') authorization: string
  ) {
    const userId = 'current-user-id';
    return this.todoService.update(userId, id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除待办事项（软删除）' })
  @ApiParam({ 
    name: 'id', 
    description: '待办事项ID' 
  })
  @ApiResponse({ 
    status: 200, 
    description: '待办事项删除成功' 
  })
  @ApiResponse({ 
    status: 404, 
    description: '待办事项不存在' 
  })
  @ApiHeader({
    name: 'authorization',
    description: 'JWT token',
    required: true,
  })
  remove(@Param('id') id: string, @Headers('authorization') authorization: string) {
    const userId = 'current-user-id';
    return this.todoService.remove(userId, id);
  }
}