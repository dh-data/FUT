import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
    @ApiProperty({
        description: '待办事项标题',
        example: '完成项目文档',
    })
    title: string;

    @ApiProperty({
        description: '待办事项内容（支持markdown格式）',
        example: '# 项目文档\n## 需要完成的内容\n1. 系统架构\n2. API文档',
    })
    content: string;

    @ApiProperty({
        description: '标签列表',
        example: ['文档', '工作'],
        type: [String],
    })
    tags: string[];
}