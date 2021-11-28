package com.sairam.scanbuy.controller;

import com.sairam.scanbuy.model.Book;
import com.sairam.scanbuy.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/book")

@CrossOrigin(origins="http://localhost:3000")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/getAll")
    public List<Book> list(){
        return bookService.listAll();
    }

    @PostMapping("/add")
    public Book add(@RequestBody Book book){

        bookService.saveBook(book);
        return book;
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<Book> get(@PathVariable BigInteger isbn){
        try {
            Book book = bookService.get(isbn);

            return new ResponseEntity<Book>(book,HttpStatus.OK);

        }catch(NoSuchElementException e){
            return new ResponseEntity<Book>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{isbn}")
    public  ResponseEntity<Book> update(@RequestBody Book book, @PathVariable BigInteger isbn){
        try{
            Book existingbook = bookService.get(isbn);
            bookService.saveBook(book);
            return new ResponseEntity<>(HttpStatus.OK);

        }catch(NoSuchElementException e){
            return new ResponseEntity<Book>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/{isbn}")
    public String delete(@PathVariable BigInteger isbn){
        bookService.deleteBook(isbn);
        return "Deleted Book with the ISBN: "+ isbn;
    }
}
