package com.sairam.scanbuy.repository;

import com.sairam.scanbuy.model.Book;
import com.sairam.scanbuy.service.BookService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface BookRepository extends JpaRepository<Book, BigInteger> {



}
