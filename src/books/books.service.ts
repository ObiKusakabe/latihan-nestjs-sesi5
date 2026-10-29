import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './interfaces/books.interfaces.js';

@Injectable()
export class BooksService {
    private books: Book[] = [
        {
            "id": 1,
            "title": "Laskar Pelangi",
            "isbn": "978-979-1019-20-8",
            "author": "Andrea Hirata",
            "publisher": "Bentang Pustaka",
            "publishedYear": 2005,
            "price": 85000,
            "stock": 10,
            "genre": "Adventure"
        },
        {
            "id": 2,
            "title": "Bumi Manusia",
            "isbn": "978-602-424-685-5",
            "author": "Pramoedya Ananta Toer",
            "publisher": "Hasta Mitra",
            "publishedYear": 1980,
            "price": 95000,
            "stock": 20,
            "genre": "Historical Fiction"
        }
    ]
    findAll(): Book[] {
        return this.books;
    }
    findOne(id: number): Book {
        const book = this.books.find(
            book => book.id === id
        );

        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }
    create(data: Omit<Book, 'id'>): Book {
        const nextId = this.books.length 
            ? Math.max(
                ...this.books.map((book) => book.id),
            ) + 1
            : 1;
        const newBook: Book = {
            id: nextId,
            ...data,
        };
        this.books.push(newBook);
        return newBook;
    }
    update(
        id: number, 
        data: Omit<Book, 'id'>,
    ): Book {
        const book = this.findOne(id);

        book.title = data.title;
        book.isbn = data.isbn;
        book.author = data.author;
        book.publisher = data.publisher;
        book.publishedYear = data.publishedYear;
        book.price = data.price;
        book.stock = data.stock;
        book.genre = data.genre;
        
        return book;
    }

    patch(
        id: number,
        data: Partial<Omit<Book, 'id'>>,
    ): Book {
        const book = this.findOne(id);

        Object.assign(book, data);
        return book;
    }

    remove(id: number): Book {
        const index = this.books.findIndex(
            (book) => book.id === id,
        );
        if (index === -1) {
            throw new NotFoundException('Book not found');
        }
        const [removedBook] = this.books.splice(index, 1);
        return removedBook;
    }
}
