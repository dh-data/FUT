import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

export interface Message {
  content: string;
  role: 'user' | 'assistant' | 'system';
  createdAt: Date;
}

export enum ChatStatus {
  DISABLED = 0,
  ENABLED = 1,
  DELETED = 2
}

@Entity()
export class Chat {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column({nullable: true})
  title: string;

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