import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum TodoStatus {
    ENABLED = 'enabled',
    DISABLED = 'disabled',
    DELETED = 'deleted',
  }
  
  @Entity('todos')
  export class Todo {
    @ApiProperty({
      description: '待办事项ID',
      example: 'uuid-v4',
    })
    @PrimaryColumn()
    id: string;

    @ApiProperty({
      description: '用户ID',
      example: 'user-123',
    })
    @Column()
    userId: string;

    @ApiProperty({
      description: '待办事项标题',
      example: '完成项目文档',
    })
    @Column()
    title: string;

    @ApiProperty({
      description: '待办事项内容（markdown格式）',
      example: '# 项目文档\n## 需要完成的内容\n1. 系统架构\n2. API文档',
    })
    @Column('text')
    content: string;

    @ApiProperty({
      description: '标签列表',
      example: ['文档', '工作'],
      type: [String],
    })
    @Column('simple-array')
    tags: string[];

    @ApiProperty({
      description: '待办事项状态',
      enum: TodoStatus,
      example: TodoStatus.ENABLED,
    })
    @Column({
      type: 'enum',
      enum: TodoStatus,
      default: TodoStatus.ENABLED
    })
    status: TodoStatus;

    @ApiProperty({
      description: '创建时间',
      example: '2024-03-21T10:00:00Z',
    })
    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @ApiProperty({
      description: '更新时间',
      example: '2024-03-21T10:00:00Z',
    })
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
  }