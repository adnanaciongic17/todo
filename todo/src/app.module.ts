import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Adnana:adnanaciongic@cluster0-xrpni.mongodb.net/test?retryWrites=true&w=majority'), TodoModule],
 
})

export class AppModule {}
