package com.sairam.scanbuy.service;

import com.sairam.scanbuy.model.Book;
import com.sairam.scanbuy.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.math.BigInteger;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> listAll(){
        return bookRepository.findAll();
    }

    public void saveBook(Book book){
        bookRepository.save(book);
    }

    public Book get(BigInteger isbn){
        return bookRepository.findById(isbn).get();
    }

    public void deleteBook(BigInteger isbn){
        bookRepository.deleteById(isbn);
    }
}
