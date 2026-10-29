import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service.js';
import type { Book } from './interfaces/books.interfaces.js';

@Controller('books')
export class BooksController {
    constructor(
        private readonly booksService: BooksService
    ) { }

    @Get()
    findAll(): Book[] {
        return this.booksService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number,
    ): Book {
        return this.booksService.findOne(id)
    }

    @Post()
    create(
        @Body() body: Omit<Book, 'id'>,
    ) {
        return this.booksService.create(body)
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Omit<Book, 'id'>,
    ) {
        return this.booksService.update(id, body)
    }

    @Patch(':id')
    patch(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Omit<Book, 'id'>,
    ) {
        return this.booksService.patch(id, body)
    }


    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number,
    ){
        return this.booksService.remove(id)
    }
}
