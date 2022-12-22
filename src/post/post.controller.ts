import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostDto } from './post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  @Get()
  findAll(): PostDto[] {
    return [
      {
        id: '1234',
        title: 'Post title 3',
        content: 'Post content 3',
        image: './././',
        createdAt: Date(),
        updatedAt: null,
        deletedAt: null,
        userCreated: null,
        isDeleted: false,
      } as PostDto,
    ];
  }

  @Post()
  createPost(@Body() data: PostDto) {
    console.log(data);
  }
}
