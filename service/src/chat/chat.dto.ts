import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
    @ApiProperty({ required: false })
    title?: string;
}

export class ChatParamDto {
    @ApiProperty({ required: true })
    prompt: string;
}

export class RecordMsgDto {
    @ApiProperty({ required: false })
    title?: string;

    @ApiProperty({ required: true })
    content: string;
}

