import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

export interface Message {
  content: string;
  role: 'user' | 'assistant' | 'system';
  createdAt: Date;
}

export enum ChatStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  DELETED = 'deleted'
}

@Entity()
export class Chat {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: ChatStatus,
    default: ChatStatus.ENABLED
  })
  status: ChatStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column('jsonb', { default: [] })
  messages: Message[];
}