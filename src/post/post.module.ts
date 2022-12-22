import { PostController } from './post.controller';

import { Module } from '@nestjs/common';

@Module({
    controllers: [PostController],
})
export class PostModule {}
