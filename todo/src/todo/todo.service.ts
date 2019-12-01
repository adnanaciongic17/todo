import { Injectable, Next } from '@nestjs/common';
import { CreateToDoDto } from './dtos/create-toDo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToDo } from './interfaces/toDo.interface';


@Injectable()
export class TodoService {
    [x: string]: any;

    constructor(@InjectModel('ToDo') private readonly toDoModel: Model<ToDo>) {}

     async createToDoItem( CreateToDoDto: CreateToDoDto): Promise<ToDo> {
        

        const newToDo = await this.toDoModel(CreateToDoDto);
        return newToDo.save();
    }

    async getToDoItems(): Promise<ToDo[]> {
        const todos = await this.toDoModel.find().exec();
        return todos;
    }

    async getToDoItem(itemID): Promise<ToDo> {
        const fetchedItem = await this.toDoModel
        .findById(itemID)
        .exec();
        return fetchedItem;
    }

    async updateToDoItem( itemID, CreateToDoDto: CreateToDoDto ): Promise<ToDo> {
        const updateToDoItem = await this.toDoModel
        .findByIdAndUpdate(itemID, CreateToDoDto, {new: true});

        return updateToDoItem;
    }

    async deleteToDoItems(): Promise<ToDo[]> {
        const todos = await this.toDoModel.find().remove();
        return todos;
    }

    async deleteToDoItem (itemID): Promise<ToDo> {
        const deleteToDoItem = await this.toDoModel
        .findByIdAndRemove(itemID);

        return deleteToDoItem;
    }

}
