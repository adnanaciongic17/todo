import { Controller, Body, Post, Delete, Param, Get, Put, HttpStatus, Res, Query, NotFoundException } from '@nestjs/common';
import { CreateToDoDto } from './dtos/create-toDo.dto';
import { TodoService } from './todo.service';
import { ValidateObjectId } from './shared/pipes/validate-id.pipe';

@Controller('todo')
export class TodoController {
    constructor(private readonly toDoService: TodoService){}

    @Post()
    async createToDoItem(@Res() res, @Body() CreateToDoDto: CreateToDoDto) {

        const newToDo = await this.toDoService.createToDoItem(CreateToDoDto);
        return res.status(HttpStatus.OK).json({
                message: 'The database is updated.',
                text: newToDo,

        })
    }


    @Get()
    async getToDoItems(@Res() res) {
        const todos = await this.toDoService.getToDoItems();

        return res.status(HttpStatus.OK).json(todos);
    }
 


    @Get(':itemID')
    async getToDoItem(@Res() res, @Param('itemID', new ValidateObjectId()) itemID ) {
        const fetchedItem = await this.toDoService.getToDoItem(itemID);
        if (!fetchedItem) {
            throw new NotFoundException('This item does not exist!');
            
        }
        return res.status(HttpStatus.OK).json(fetchedItem);
    }
  

    @Put(':itemID')
    async updateToDoItem (
        @Res() res,
        @Query('itemID', new ValidateObjectId()) itemID,
        @Body() CreateToDoDto: CreateToDoDto) {

            const updateToDoItem = await this.toDoService.updateToDoItem(itemID, CreateToDoDto);
            if (!updateToDoItem) {
                throw new NotFoundException('The item does not exist!');
                
            }

            return res.status(HttpStatus.OK).json({
                    message: 'The item has been updated!',
                    text: updateToDoItem,

            });
        }   

    //update(@Param('id') id: string, @Body() CreateToDoDto: CreateToDoDto) {
      //  console.log(id);
    //return `This action updates the id no. #${id} `;
 // }

    @Delete()
    async deleteToDoItems(@Res() res) {
        const todos = await this.toDoService.deleteToDoItems();

        return res.status(HttpStatus.OK).json(todos);
    }

    @Delete(':itemID')
    async deleteToDoItem(@Res() res, @Query('itemID', new ValidateObjectId() ) itemID ) {
        const deleteToDoItem = await this.toDoService.deleteToDoItem(itemID);
        if (!deleteToDoItem) {
            throw new NotFoundException('The item does not exist!');
            
        }
        return res.status(HttpStatus.OK).json({
            message: 'The item has been deleted!',
            text: deleteToDoItem,
        });
    }


}
