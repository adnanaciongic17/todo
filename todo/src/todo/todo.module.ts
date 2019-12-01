import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { toDoSchema } from './schemas/todo.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'ToDo', schema: toDoSchema}])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
